import { Express, Request, Response } from "express";
import { Client as DbClient } from 'pg'
import { Client } from '../models/client'
import { Controller } from "./controller";
import { setCoordinates } from '../utils/utils'

export class ClientsController extends Controller {
  table = "clients"

  constructor(app: Express, dbClient: DbClient) {
    super(app, dbClient)

    this.getClients()
    this.calculateRoutes()
    this.insertClient()
    this.updateClient()
    this.deleteClient()
    this.getClient()
  }

  getClients() {
    this.app.get(`/${this.table}`, async (req: Request, res: Response) => {
      const query = req.query as { name: string, email: string, page: string, sort: string, orientation: string }
      const page = query.page ? parseInt(query.page) : 1
      const sort = query.sort ? parseInt(query.sort) : 0
      const orientation = query.orientation == "desc" ? true : false
      
      try {
        const clients = await Client.filterClients(
          this.dbClient, query.name, query.email, undefined, page, sort, orientation
          )
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
      const coordinates = setCoordinates(body)
      const client = new Client('', body.name, body.email, coordinates)
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
      const coordinates = setCoordinates(body)
      const client = new Client(id, body.name, body.email, coordinates)
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

  calculateRoutes() {
    this.app.get(`/${this.table}/calculate-routes`, async (req: Request, res: Response) => {
      try {
        const clients = await Client.getClients(this.dbClient)
        const routes = Client.calculateBestRoutes(clients)
        res.json(routes);
      } catch (err: any) {
        this.handleErrors(err, res)
      }
    });
  }
}