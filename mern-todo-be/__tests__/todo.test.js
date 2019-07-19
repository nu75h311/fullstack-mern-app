import request from 'supertest';
import server from '../src/server';
import { connectDb, disconnectDb } from '../src/models';

describe("GET /todos ", () => {

    beforeEach(async () => {
        connectDb().then(async () => {
            server.listen(process.env.PORT, () => {
                console.log(`Server is running on port ${process.env.PORT} in ${process.env.NAME} mode`);
            });
        });
    });

    afterEach(async () => {
        await disconnectDb();
    });

    test("It should respond with an array of todos", async () => {
        const response = await request(server).get("/todos");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });
});