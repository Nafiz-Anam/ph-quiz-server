const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

let token;

beforeAll(async () => {
    const response = await request.post("/v1/auth/register").send({
        full_name: "Test Admin",
        email: "test@example.com",
        password: "password",
        role: "admin",
    });

    token = response?.body?.data?.token;
    // Create sample users
    const users = [
        {
            full_name: "User One",
            email: "user1@example.com",
            password: "password",
        },
        {
            full_name: "User Two",
            email: "user2@example.com",
            password: "password",
        },
        {
            full_name: "User Three",
            email: "user3@example.com",
            password: "password",
        },
    ];

    for (const user of users) {
        await request.post("/v1/auth/register").send(user);
    }

    // Get users from the database
    const user1 = await request
        .post("/v1/auth/login")
        .send({ email: "user1@example.com", password: "password" });
    const user2 = await request
        .post("/v1/auth/login")
        .send({ email: "user2@example.com", password: "password" });
    const user3 = await request
        .post("/v1/auth/login")
        .send({ email: "user3@example.com", password: "password" });

    // Create sample quizzes
    const quizzes = [
        {
            title: "Math Quiz",
            description: "Test descriptions here.",
            questions: [
                {
                    question: "What is 2+2?",
                    options: ["3", "4", "5"],
                    correct_option: 1,
                },
                {
                    question: "What is 3*3?",
                    options: ["6", "9", "12"],
                    correct_option: 1,
                },
            ],
        },
        {
            title: "Science Quiz",
            description: "Test descriptions here.",
            questions: [
                {
                    question: "What is H2O?",
                    options: ["Water", "Oxygen", "Hydrogen"],
                    correct_option: 0,
                },
                {
                    question: "What is the symbol for Gold?",
                    options: ["Au", "Ag", "Pb"],
                    correct_option: 0,
                },
            ],
        },
    ];

    let quizIds = [];
    for (const quiz of quizzes) {
        const response = await request
            .post("/v1/quiz")
            .set("Authorization", `Bearer ${token}`)
            .send(quiz);
        quizIds.push(response.body.data._id);
    }

    // Add sample quiz results
    const results = [
        { userId: user1.body.data.id, quizId: quizIds[0], answers: [1, 1] },
        { userId: user2.body.data.id, quizId: quizIds[1], answers: [0, 1] },
        { userId: user3.body.data.id, quizId: quizIds[0], answers: [0, 1] },
    ];

    for (const result of results) {
        await request
            .post("/v1/quiz-result")
            .set("Authorization", `Bearer ${user1.body.data.token}`)
            .send(result);
    }
});

describe("LeaderBoard API", () => {
    test("should fetch the leaderBoard", async () => {
        const response = await request
            .get("/v1/leaderboard")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data.length).toBeGreaterThan(0);
        expect(response.body.data[0]).toHaveProperty("totalScore");
        expect(response.body.data[0]).toHaveProperty("user.full_name");
    });
});
