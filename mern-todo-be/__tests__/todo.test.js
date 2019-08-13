import request from 'supertest';
import app from '../src/server';
import models, { connectDb, disconnectDb } from '../src/models';

process.env.NAME = 'integration-test';
process.env.PORT = 4001;
process.env.DB_URL = 'mongodb://127.0.0.1:27017/it-todos';

describe('GET /todos ', () => {
  beforeEach(async () => {
    connectDb().then(async () => {
      await app.server;
    })
      .catch(async (err) => {
        console.log('App starting error:', err.stack);
        await app.server.close();
        await disconnectDb();
        // process.exit(1);
      });
  });

  afterEach(async () => {
    await app.server.close();
    await disconnectDb();

    //try this after post test:
    models.Todo.deleteMany({}).exec();
  });

  test('It should respond with an array of todos', async () => {
    const response = await request(app).get('/todos');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});
