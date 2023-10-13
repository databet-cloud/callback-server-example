import express, { Response, Router } from 'express'
import {
    BetCallbackServer,
    BetDeclineRequest,
    BetRequest,
    BetSettleRequest,
    BetUnsettleRequest
} from './bet-callback-server';
import { processRequest, TypedRequestBody } from '../process-request';

export const registerBetEndpoints = (router: Router, server: BetCallbackServer) => {
    router.post('/bet/place', (req: TypedRequestBody<BetRequest>, res: Response) => {
        processRequest(server.betPlace, req, res)
    })

    router.post('/bet/accept', (req: TypedRequestBody<BetRequest>, res: Response) => {
        processRequest(server.betAccept, req, res)
    })

    router.post('/bet/decline', (req: TypedRequestBody<BetDeclineRequest>, res: Response) => {
        processRequest(server.betDecline, req, res)
    })

    router.post('/bet/settle', (req: TypedRequestBody<BetSettleRequest>, res: Response) => {
        processRequest(server.betSettle, req, res)
    })

    router.post('/bet/unsettle', (req: TypedRequestBody<BetUnsettleRequest>, res: Response) => {
        processRequest(server.betUnsettle, req, res)
    })
}