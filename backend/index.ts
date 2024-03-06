import express, { Express } from "express";
import { Client } from 'pg'
import dotenv from 'dotenv';
import { ClientsController } from "./controllers/clients.controler";
import * as swaggerUi from 'swagger-ui-express';
var cors = require('cors')
const swaggerDocument = require('./swagger.json');


dotenv.config();

const app: Express = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
const port = process.env.PORT || 3000;
const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT || 5432) as number,
  database: process.env.DB_DATABASE,
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
    new ClientsController(app, client)
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

export const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});