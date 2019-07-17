import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import routes from './routes';
import models, { connectDb } from './models';

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.context = {
        models,
    };
    next();
});

// Routes

app.use('/todos', routes.todo);

//Start
connectDb().then(async () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT} in ${process.env.NAME} mode`);
    });
});