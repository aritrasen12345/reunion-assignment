<a href="https://documenter.getpostman.com/view/17955962/2s93JzJzbh">POSTMAN DOCUMENTATION</a>

<a href="https://reunion-assignment-ehbg.onrender.com">Render Deploy Link</a>

<a href="https://github.com/aritrasen12345/reunion-assignment">GitHub Repo</a>

## API LIST
- GET /api/test will return {
"status": true,
"message": "Hello from test server"
}
- POST /api/authenticate should perform user authentication and return a JWT token.
  - INPUT: Email, Password
  - RETURN: JWT token
- POST /api/follow/{id} authenticated user would follow user with {id}
- POST /api/unfollow/{id} authenticated user would unfollow a user with {id}
- GET /api/user should authenticate the request and return the respective user profile.
  - RETURN: User Name, number of followers & followings.
- POST api/posts/ would add a new post created by the authenticated user.
  - Input: Title, Description
  - RETURN: Post-ID, Title, Description, Created Time(UTC).
- DELETE api/posts/{id} would delete post with {id} created by the authenticated user.
- POST /api/like/{id} would like the post with {id} by the authenticated user.
- POST /api/unlike/{id} would unlike the post with {id} by the authenticated user.
- POST /api/comment/{id} add comment for post with {id} by the authenticated user.
  - Input: Comment 
  - Return: Comment-ID
- GET api/posts/{id} would return a single post with {id} populated with its number of likes and comments
- GET /api/all_posts would return all posts created by authenticated user sorted by post time.
  - RETURN: For each post return the following values
    - id: ID of the post
    - title: Title of the post
    - desc: Description of the post
    - created_at: Date and time when the post was created
    - comments: Array of comments, for the particular post
    - likes: Number of likes for the particular post



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
