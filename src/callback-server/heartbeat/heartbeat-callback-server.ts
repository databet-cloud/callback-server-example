export interface HeartbeatRequest {
    foreignParams?: any
}

export interface HeartbeatCallbackServer {
    heartbeat(req: HeartbeatRequest): ErrorCallback | null
}