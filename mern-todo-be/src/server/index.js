import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import routes from '../routes';
import models from '../models';

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// Routes

app.use('/todos', routes.todo);

app.server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} in ${process.env.NAME} mode`);
});

export default app;
