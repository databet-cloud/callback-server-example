import { CallbackError, SimpleCallback } from '../models';
import { Request, Response } from 'express';
import { createInternalError } from './error-factory';

export interface TypedRequestBody<T> extends Request {
    body: T
}

interface callbackProcessor<T extends SimpleCallback> {
    (req: T): CallbackError | null
}

export const processRequest = function <T extends SimpleCallback>(
    processRequest: callbackProcessor<T>,
    req: TypedRequestBody<T>,
    res: Response,
) {
    try {
        const errResp = processRequest(req.body)
        if (errResp === null) {
            res.status(201).send()

            return
        }

        res.status(400).json({error: errResp})
    } catch (e: any) {
        res.status(500)

        res.json({error: createInternalError()})

        throw e
    }
}