import express from "express";
import compression from "compression";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import logger from "morgan";
import cors from "cors";
import xss from "xss-clean";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import { fileURLToPath } from "url";
import path, { dirname } from "node:path";

import { globalErrorHandler } from "./utils/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import testApis from "./apis/testApis.js";
import authApis from "./apis/authApis.js";
import followApis from "./apis/followApis.js";
import userApis from "./apis/userApis.js";
import postApis from "./apis/postApis.js";
import likeApis from "./apis/likeApis.js";
import commentApis from "./apis/commentApis.js";

//app  and middleware
const app = express();
app.use(cors());

app.use(helmet());
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: function (res, path, stat) {
      res.set("x-timestamp", Date.now().toString());
    },
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data sanitization against NoSQL query injection
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.warn(`This request[${key}] is sanitized`, req);
    },
  })
);

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

app.use(compression());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use(limiter);

app.use("/api/test", testApis);
app.use("/api/user", userApis);
app.use("/api/comment", commentApis);
app.use("/api", postApis);
app.use("/api", authApis);
app.use("/api", followApis);
app.use("/api", likeApis);

// ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

// 404 MIDDLEWARE
app.use((req, res, next) => {
  res.status(404).json({
    message: "resource not found",
  });
});

export default app;
