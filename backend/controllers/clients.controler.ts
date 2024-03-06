import { Express, Request, Response } from "express";
import { Client as DbClient } from 'pg'
import { Client } from '../models/client'
import { Controller } from "./controller";

export class ClientsController extends Controller {
    table = "clients"

    constructor(app: Express, dbClient: DbClient) {
        super(app, dbClient)
        
        this.getClients()
        this.insertClient()
        this.updateClient()
        this.deleteClient()
        this.getClient()
    }

    getClients() {
        this.app.get(`/${this.table}`, async (req: Request, res: Response) => {
            const query = req.query as { name: string, email: string }
            try {
                const clients = await Client.getClients(this.dbClient, query.name, query.email)
                res.json(clients);
            } catch (err: any) {
                this.handleErrors(err, res)
            }
        });
    }

    getClient() {
        this.app.get(`/${this.table}/:id`, async (req: Request, res: Response) => {
            const id = req.params.id
            const client = new Client(id)
            try {
                const clientResult = await client.find(this.dbClient)
                res.json(clientResult);
            } catch (err: any) {
                this.handleErrors(err, res)
            }
        });
    }

    insertClient() {
        this.app.post(`/${this.table}`, async (req: Request, res: Response) => {
            const body = req.body
            const client = new Client('', body.name, body.email)
            try {
                const clientResult = await client.create(this.dbClient)
                res.status(201).json(clientResult);
            } catch (err: any) {
                this.handleErrors(err, res)
            }
        });
    }

    updateClient() {
        this.app.patch(`/${this.table}/:id`, async (req: Request, res: Response) => {
            const body = req.body
            const id = req.params.id
            const client = new Client(id, body.name, body.email)
            try {
                const clientResult = await client.update(this.dbClient)
                res.json(clientResult);
            } catch (err) {
                this.handleErrors(err, res)
            }
        });
    }

    deleteClient() {
        this.app.delete(`/${this.table}/:id`, async (req: Request, res: Response) => {
            const id = req.params.id
            const client = new Client(id)
            try {
                await client.delete(this.dbClient)
                res.send();
            } catch (err) {
                this.handleErrors(err, res)
            }
        });
    }

    
}