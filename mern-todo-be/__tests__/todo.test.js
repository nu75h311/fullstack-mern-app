import request from 'supertest';
import app from '../src/server';
import { connectDb, disconnectDb } from '../src/models';

describe("GET /todos ", () => {

    beforeEach(async () => {
        connectDb().then(async () => {
            app.server;
        });
    });

    afterEach(async () => {
        await disconnectDb();
        await app.server.close();
    });

    test("It should respond with an array of todos", async () => {
        const response = await request(app).get("/todos");
        expect(response.statusCode).toBe(200);
        // expect(response.body).toEqual([]);
    });
});