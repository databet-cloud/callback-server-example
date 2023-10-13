import express, { Application } from 'express';

import dotenv from 'dotenv';
import { CallbackError } from './models';
import {
    BetDeclineRequest,
    BetRequest,
    BetSettleRequest,
    BetUnsettleRequest,
    registerBetEndpoints
} from './callback-server/bet';
import { CallbackRouter } from './callback-server';

dotenv.config();

// Create an instance of Express
const app: Application = express();

// Configurable endpoint prefix (default is '/databet')
const callbackServerPrefix: string = process.env.CALLBACK_SERVER_PREFIX || '/databet';

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.originalUrl}`);
    next();
});

const databetRouter = CallbackRouter()

registerBetEndpoints(databetRouter, {
    betPlace: (req: BetRequest): CallbackError | null => {
        console.log(req)

        return null
    },
    betAccept: (req: BetRequest): CallbackError | null => {
        console.log(req)

        return null
    },
    betDecline: (req: BetDeclineRequest): CallbackError | null => {
        console.log(req)

        return null
    },
    betSettle: (req: BetSettleRequest): CallbackError | null => {
        console.log(req)

        return null
    },
    betUnsettle: (req: BetUnsettleRequest): CallbackError | null => {
        console.log(req)

        return null
    }
})

app.use(callbackServerPrefix, databetRouter)

// Start the server
const PORT: number = parseInt(process.env.LISTEN || '3000', 10) || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    console.log(`Callback server prefix: ${callbackServerPrefix}`);
});
