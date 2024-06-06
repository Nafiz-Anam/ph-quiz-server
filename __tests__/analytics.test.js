const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

describe("Analytics API", () => {
    let token;

    // Log in before tests
    beforeAll(async () => {
        const response = await request.post("/v1/auth/register").send({
            full_name: "Test Admin",
            email: "test@example.com",
            password: "password",
            role: "admin",
        });

        token = response?.body?.data?.token;
    });

    describe("GET /v1/analytics", () => {
        test("should fetch all-time analytics data if no interval is specified", async () => {
            const response = await request
                .get("/v1/analytics")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.data).toHaveProperty("totalUsers");
            expect(response.body.data).toHaveProperty("totalQuizzes");
            expect(response.body.data).toHaveProperty(
                "totalAnswerAverageScore"
            );
            expect(response.body.data).toHaveProperty("totalParticipants");
            expect(response.body.data).toHaveProperty("quizDetails");
        });

        test("should fetch hourly analytics data", async () => {
            const response = await request
                .get("/v1/analytics?interval=hourly")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.data).toHaveProperty("totalUsers");
            expect(response.body.data).toHaveProperty("totalQuizzes");
            expect(response.body.data).toHaveProperty(
                "totalAnswerAverageScore"
            );
            expect(response.body.data).toHaveProperty("totalParticipants");
            expect(response.body.data).toHaveProperty("quizDetails");
        });

        test("should fetch daily analytics data", async () => {
            const response = await request
                .get("/v1/analytics?interval=daily")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.data).toHaveProperty("totalUsers");
            expect(response.body.data).toHaveProperty("totalQuizzes");
            expect(response.body.data).toHaveProperty(
                "totalAnswerAverageScore"
            );
            expect(response.body.data).toHaveProperty("totalParticipants");
            expect(response.body.data).toHaveProperty("quizDetails");
        });

        test("should fetch monthly analytics data", async () => {
            const response = await request
                .get("/v1/analytics?interval=monthly")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.data).toHaveProperty("totalUsers");
            expect(response.body.data).toHaveProperty("totalQuizzes");
            expect(response.body.data).toHaveProperty(
                "totalAnswerAverageScore"
            );
            expect(response.body.data).toHaveProperty("totalParticipants");
            expect(response.body.data).toHaveProperty("quizDetails");
        });

        test("should fetch yearly analytics data", async () => {
            const response = await request
                .get("/v1/analytics?interval=yearly")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.data).toHaveProperty("totalUsers");
            expect(response.body.data).toHaveProperty("totalQuizzes");
            expect(response.body.data).toHaveProperty(
                "totalAnswerAverageScore"
            );
            expect(response.body.data).toHaveProperty("totalParticipants");
            expect(response.body.data).toHaveProperty("quizDetails");
        });
    });
});
