import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';

const camelCaseKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(item => camelCaseKeys(item))
    }

    if (typeof obj === 'object' && obj !== null) {
        const convertedObj: { [key: string]: any } = {};

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const camelKey = _.camelCase(key)
                convertedObj[camelKey] = camelCaseKeys(obj[key])
            }
        }

        return convertedObj
    }

    return obj
}

export const callbackServerBodyMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    req.body = camelCaseKeys(req.body)

    const foreignParams = req.header('Foreign-Params')
    req.body.foreignParams = foreignParams ? JSON.parse(foreignParams) : null

    next()
};