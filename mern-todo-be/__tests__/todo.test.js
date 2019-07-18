import request from 'supertest';
import app from '../src/server';

describe("GET /todos ", () => {

    test("It should respond with an array of todos", async () => {
        const response = await request(app).get("/todos/what");
        // expect(response.statusCode).toBe(200);
        expect(response.body).toEqual("what");
    });
});