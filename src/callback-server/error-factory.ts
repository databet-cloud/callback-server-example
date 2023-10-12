import { CallbackError } from '../models';

export enum CallbackErrorCode {
    NotEnoughBalance = 'not_enough_balance',
    PlayerLimitCrossed = 'player_limit_crossed',
    AuthSessionUnknown = 'auth_session_unknown',
    AuthCredentialsExpired = 'auth_credentials_expired',
    InternalError = 'internal_error'
}

export const createNotEnoughBalanceError = (actualBalance: string | number): CallbackError => {
    return {
        code: CallbackErrorCode.NotEnoughBalance,
        data: {
            actual_balance: `${actualBalance}`
        }
    }
}

export const createPlayerLimitCrossedError = ({ betBlocked, playerBlocked }: {
    betBlocked?: boolean,
    playerBlocked?: boolean
}): CallbackError => {
    const types: Array<string> = []
    if (betBlocked) {
        types.push('bet-blocked')
    }

    if (playerBlocked) {
        types.push('player-blocked')
    }

    return {
        code: CallbackErrorCode.PlayerLimitCrossed,
        data: {
            types: types
        }
    }
}

export const createAuthSessionUnknownError = (): CallbackError => {
    return { code: CallbackErrorCode.AuthSessionUnknown }
}

export const createCredentialsExpiredError = (): CallbackError => {
    return { code: CallbackErrorCode.AuthCredentialsExpired }
}

export const createInternalError = (data?: any): CallbackError => {
    return { code: CallbackErrorCode.InternalError, data: data }
}
