import { Express, Response } from "express";
import { SystemErrosStatus } from "../interfaces/erros"
import { Client as DbClient } from 'pg'

export class Controller {
    app: Express
    dbClient: DbClient

    constructor(app: Express, client: DbClient){
        this.app = app
        this.dbClient = client
    }

    handleErrors(err: any, res: Response){
        const erros = {
            [SystemErrosStatus.npContent]: () => res.status(204).send(),
            [SystemErrosStatus.badRequest]: () => res.status(400).send(err),
            [SystemErrosStatus.error]: () => res.status(500).send(err),
        }
        const status = err.status as SystemErrosStatus | undefined
        if (status) {
            erros[status]()
        } else {
            res.status(500).send()
        }
    }
}