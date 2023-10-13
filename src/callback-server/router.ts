import express, { Router } from 'express'
import { callbackServerBodyMiddleware } from './body-middleware';

export const CallbackRouter = (): Router => {
    const router = express.Router()
    router.use(express.json())
    router.use(callbackServerBodyMiddleware);

    return router
}