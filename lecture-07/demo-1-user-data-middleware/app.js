import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import db from "./db.js";
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next) {
    console.log("This is middleware 1 running")
    next()
})
app.use(function(req, res, next) {
    console.log("This is middleware 2 running")
    req.testValue = 3
    console.log("  middleware 2 added a testValue to the req")
    next()
})
app.use(function(req, res, next) {
    console.log("This is middlware 3, the testValue is:" + req.testValue)
    next()
})
app.use(express.static(path.join(__dirname, 'public')));
app.use( function (req, res, next) {
    req.db = db;
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
