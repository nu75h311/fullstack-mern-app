import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';

import routes from '../routes';
import models from '../models';

const app = express();

// Application-Level middleware

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// Authorization middleware

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use('/todos', routes.todoRouter);
app.use('/users', routes.userRouter);

app.server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} in ${process.env.NAME} mode`);
});

export default app;
