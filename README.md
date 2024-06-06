# Real-Time Analytics Platform

This is a real-time analytics platform built using the MERN stack. The platform gathers data from various sources, processes it in real-time, and provides insights through an API. This project includes user authentication, quiz management, leaderboard, and detailed analytics.

## Features

- **User Authentication**: Register and login with JWT authentication.
- **Quiz Management**: Create, update, delete quizzes with multiple-choice questions.
- **Quiz Participation**: Users can participate in quizzes and get their scores.
- **Leaderboard**: Displays top users based on their scores.
- **Real-Time Analytics**: Provides real-time data aggregation and insights.
- **WebSockets**: Real-time updates for active users and analytics.
- **Dockerized Setup**: Easily deployable with Docker and Docker Compose.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Nafiz-Anam/ph-quiz-server.git
    cd ph-quiz-server
    ```

2. Install dependencies:

    ```sh
    yarn install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    NODE_ENV=development
    PORT=8000
    MONGODB_URI=mongodb://localhost:27017/ph-analytics
    ACCESS_TOKEN_SECRET=your-secret-key
    ```

## Setup

### Running Locally

1. Start MongoDB:

    ```sh
    mongod
    ```

2. Start the server:

    ```sh
    yarn start
    ```

3. Access the server at `http://localhost:8000`.

4. Access the WebSocket server at `ws://localhost:8000`

### Running with Docker

1. Build and run the Docker containers:

    ```sh
    docker-compose up --build
    ```

2. Access the server at `http://localhost:8000`, WebSocket server at `ws://localhost:8000` and MongoDB Express at `http://localhost:8081`.

## Core Features

### User Authentication

- **Register**: `/v1/auth/register`
  - Method: `POST`
  - Body: `{ "full_name": "string", "email": "string", "password": "string" }`

- **Login**: `/v1/auth/login`
  - Method: `POST`
  - Body: `{ "email": "string", "password": "string" }`

### Quiz Management

- **Create Quiz**: `/v1/quiz`
  - Method: `POST`
  - Body: `{ "title": "string", "questions": [{ "question": "string", "options": ["string"], "correct_option": "number" }] }`

- **Get Quizzes**: `/v1/quiz`
  - Method: `GET`

### Quiz Participation

- **Submit Quiz Result**: `/v1/quiz-result`
  - Method: `POST`
  - Body: `{ "userId": "string", "quizId": "string", "answers": ["number"] }`

### Leaderboard

- **Get Leaderboard**: `/v1/leaderboard`
  - Method: `GET`

### Real-Time Analytics

- **Get Analytics**: `/v1/analytics`
  - Method: `GET`
  - Query Parameters: `interval=hourly|daily|monthly|yearly`
  - Provides aggregated analytics data based on the specified interval.

### WebSocket Events

- **Active Users**: Real-time updates on the number of active users.
- **Analytics Updates**: Real-time updates on analytics data.

## Running Tests

1. Install Jest and Supertest:

    ```sh
    yarn add --save-dev jest supertest
    ```

2. Run the tests:

    ```sh
    yarn test
    ```

## API Collection 👇

<https://documenter.getpostman.com/view/30501718/2sA3XJjPyC>

## Live API server and websocket server

REST-API server: <https://ph-quiz-server.onrender.com/>

WebSocket server: <ws://ph-quiz-server.onrender.com/>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/fooBar`).
3. Commit your changes (`git commit -m 'Add some fooBar'`).
4. Push to the branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.

## Acknowledgements

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
