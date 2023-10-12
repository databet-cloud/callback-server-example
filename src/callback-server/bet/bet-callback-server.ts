import { BetDeclineData, BetSettleData, BetUnsettleData, CallbackBetData, CallbackError } from '../../models';

export interface BetRequest extends CallbackBetData {
    foreignParams?: any
}

export interface BetDeclineRequest extends BetDeclineData {
    foreignParams?: any
}

export interface BetSettleRequest extends BetSettleData {
    foreignParams?: any
}

export interface BetUnsettleRequest extends BetUnsettleData {
    foreignParams?: any
}

export interface BetCallbackServer {
    betPlace(req: BetRequest): CallbackError | null
    betAccept(req: BetRequest): CallbackError | null
    betDecline(req: BetDeclineRequest): CallbackError | null
    betSettle(req: BetSettleRequest): CallbackError | null
    betUnsettle(req: BetUnsettleRequest): CallbackError | null
}