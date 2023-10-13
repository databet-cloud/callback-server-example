import { Response, Router } from 'express'
import { TypedRequestBody } from '../process-request';
import { HeartbeatCallbackServer, HeartbeatRequest } from './heartbeat-callback-server';
import { createInternalError } from '../error-factory';

export const registerHeartbeatEndpoints = (router: Router, server: HeartbeatCallbackServer) => {
    router.post('/heartbeat', (req: TypedRequestBody<HeartbeatRequest>, res: Response) => {
        try {
            const errResp = server.heartbeat(req.body)
            if (errResp === null) {
                res.status(204).send()

                return
            }

            res.status(400).json({error: errResp})
        } catch (e: any) {
            res.status(500)

            res.json({error: createInternalError()})

            throw e
        }
    })
}