/* eslint no-unused-vars: 0 */  // --> OFF

export interface SystemError{
    status: SystemErrosStatus
    message: string
}

export enum SystemErrosStatus {
    npContent = "np-content", 
    error = "error",
    badRequest = 'bad-request'
}