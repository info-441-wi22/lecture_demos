import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';
import msIdExpress from 'microsoft-identity-express'

const appSettings = {
    appCredentials: {
        clientId:  "Client ID HERE",
        tenantId:  "Tenant ID (directory Id) here",
        clientSecret:  "Client secret here"
    },
    authRoutes: {
        redirect: "/redirect",
        error: "/error", // the wrapper will redirect to this route in case of any error.
        unauthorized: "/unauthorized" // the wrapper will redirect to this route in case of unauthorized access attempt.
    }
};


import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { allowedNodeEnvironmentFlags } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "this is some secret key I am making up  vewkhivw44einvwvripouew t5e98n4w",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))

const msid = new msIdExpress.WebAppAuthClientBuilder(appSettings).build();
app.use(msid.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/signin',
    msid.signIn({postLoginRedirect: '/'})
)

app.get('/signout', 
    msid.signOut({postLogoutRedirect: '/'})
)

app.get('/error', (req, res) => res.status(500).send('Server Error'))

app.get('/unauthorized', (req, res) => res.status(401).send('Permission Denied'))


export default app;
