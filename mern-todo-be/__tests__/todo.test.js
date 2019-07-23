import request from 'supertest';
import app from '../src/server';
import { connectDb, disconnectDb } from '../src/models';

describe("GET /todos ", () => {

    beforeEach(async () => {
        connectDb().then(async () => {
            app.server;
        })
        .catch(async (err) => {
            console.log('App starting error:', err.stack);
            await app.server.close();
            await disconnectDb();
            // process.exit(1);
        });;
    });

    afterEach(async () => {
        await app.server.close();
        await disconnectDb();
    });

    test("It should respond with an array of todos", async () => {
        const response = await request(app).get("/todos");
        expect(response.statusCode).toBe(200);
        // expect(response.body).toEqual([]);
    });
});