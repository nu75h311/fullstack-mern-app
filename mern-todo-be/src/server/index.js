import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
// import cookieSession from 'cookie-session';

import routes from '../routes';
import models from '../models';

const app = express();

// Application-Level middleware

app.use(cors({
  origin: 'http://127.0.0.1:3000', // allow to server to accept request from different origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // allow session cookie from browser to pass through
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// app.use(
//   cookieSession({
//     name: 'session',
//     keys: 'COOKIE_KEY',
//     maxAge: 24 * 60 * 60 * 100,
//   }),
// );

// Authorization middleware

app.use(cookieParser());

app.use(session({
  secret: 'todos',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use('/auth', routes.authRouter);
app.use('/todos', routes.todoRouter);
app.use('/users', routes.userRouter);

app.server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} in ${process.env.NAME} mode`);
});

export default app;
