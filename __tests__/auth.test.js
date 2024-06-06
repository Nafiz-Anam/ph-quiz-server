const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

describe("Authentication API", () => {
    describe("POST  /v1/auth/register", () => {
        test("should return 400 if email is empty", async () => {
            const response = await request.post("/v1/auth/register").send({
                full_name: "Test User",
                password: "password",
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Email is required");
        });

        test("should return 400 if password is empty", async () => {
            const response = await request.post("/v1/auth/register").send({
                full_name: "Test User",
                email: "test@example.com",
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Password is required");
        });

        test("should return 400 if email is missing", async () => {
            const response = await request.post("/v1/auth/register").send({
                full_name: "Test User",
                email: "",
                password: "password",
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Email cannot be empty");
        });

        test("should return 400 if password is missing", async () => {
            const response = await request.post("/v1/auth/register").send({
                full_name: "Test User",
                email: "test@example.com",
                password: "",
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Password cannot be empty");
        });

        test("should register a new user successfully", async () => {
            const response = await request.post("/v1/auth/register").send({
                full_name: "Test User",
                email: "testuser@example.com",
                password: "password",
            });
            expect(response.status).toBe(201);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe("User registered successfully.");
            expect(response.body.data).toHaveProperty("id");
            expect(response.body.data).toHaveProperty("token");
        });

        test("should return 500 if email is already registered", async () => {
            const response = await request.post("/v1/auth/register").send({
                full_name: "Test User",
                email: "testuser@example.com",
                password: "password",
            });
            expect(response.statusCode).toBe(500);
            expect(response.body.message).toBe(
                "Email already signed up. Sign in to continue."
            );
        });
    });

    describe("POST  /v1/auth/login", () => {
        test("should return 400 if email is empty", async () => {
            const response = await request.post("/v1/auth/login").send({
                password: "password",
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Email is required");
        });

        test("should return 400 if password is empty", async () => {
            const response = await request.post("/v1/auth/login").send({
                email: "test@example.com",
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Password is required");
        });

        test("should return 400 if email is missing", async () => {
            const response = await request.post("/v1/auth/login").send({
                email: "",
                password: "password",
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Email cannot be empty");
        });

        test("should return 400 if password is missing", async () => {
            const response = await request.post("/v1/auth/login").send({
                email: "test@example.com",
                password: "",
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Password cannot be empty");
        });

        test("should return 500 if wrong email", async () => {
            const userData = {
                email: "wrong@example.com",
                password: "password",
            };
            const response = await request
                .post("/v1/auth/login")
                .send(userData);

            expect(response.status).toBe(500);
            expect(response.body.status).toBe(false);
            expect(response.body.message).toBe("User not found!");
        });

        test("should return 500 if wrong password", async () => {
            const userData = {
                email: "testuser@example.com",
                password: "wrong_password",
            };
            const response = await request
                .post("/v1/auth/login")
                .send(userData);

            expect(response.status).toBe(500);
            expect(response.body.status).toBe(false);
            expect(response.body.message).toBe("Invalid email/password!");
        });

        test("should log in an existing user", async () => {
            const userData = {
                email: "testuser@example.com",
                password: "password",
            };

            const response = await request
                .post("/v1/auth/login")
                .send(userData);

            expect(response.status).toBe(201);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe("User signed in successfully.");
            expect(response.body.data).toHaveProperty("id");
            expect(response.body.data).toHaveProperty("token");
        });
    });
});
