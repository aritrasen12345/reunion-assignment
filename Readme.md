<a href="https://documenter.getpostman.com/view/17955962/2s93JzJzbh">POSTMAN DOCUMENTATION</a>

<a href="https://reunion-assignment-ehbg.onrender.com">Render Deploy Link</a>

<a href="https://github.com/aritrasen12345/reunion-assignment">GitHub Repo</a>

```bash
// .env for API

# DEV CRED
DEV_PORT=8000
DEV_DB_NAME=xxxxxx
DEV_DB_URL=xxxxxxxxxxxxxxxxxxxxxxxxxx
DEV_DB_PASSWORD=xxxxxxx
DEV_JWT_ACTIVATE=xxxxxxxxxxx

```

## Start Server

```bash
git clone https://github.com/aritrasen12345/reunion-assignment.git
cd reunion-assignment
npm install
npm run start:dev
```

## Dummy User

- email: test@test.com
- password: Test@12345

## Commands to Run the Docker File

```bash
docker build -t image_name .
docker container run -d -p 3000:8000 image_name

GOTO http://localhost:3000/api/test
```

## OR pull that same image from DockerHub

```bash
docker pull aritrasen12345/reunion-assignment
```
