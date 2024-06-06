const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

describe("Analytics API", () => {
    describe("GET /api/v1/analytics", () => {
        test("should fetch all-time analytics data if no interval is specified", async () => {
            const response = await request.get("/api/v1/analytics");
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
            const response = await request.get(
                "/api/v1/analytics?interval=hourly"
            );
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
            const response = await request.get(
                "/api/v1/analytics?interval=daily"
            );
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
            const response = await request.get(
                "/api/v1/analytics?interval=monthly"
            );
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
            const response = await request.get(
                "/api/v1/analytics?interval=yearly"
            );
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

        test("should return 400 for an invalid interval", async () => {
            const response = await request.get(
                "/api/v1/analytics?interval=invalid"
            );
            expect(response.status).toBe(400);
            expect(response.body.status).toBe(false);
            expect(response.body.message).toBe("Invalid interval specified");
        });
    });
});
