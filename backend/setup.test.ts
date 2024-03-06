import { clientsTests } from './controllers/clients.test';
import { server } from './index'
import { Client } from 'pg'

const supertest = require('supertest');
const requestWithSupertest = supertest(server);

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: (process.env.DB_PORT || 5432) as number,
    database: process.env.DB_DATABASE,
  });

function setupDatabase(){
    return new Promise((resolve, reject) => {
          client.connect()
            .then(async () => {
              console.log('Connected to PostgreSQL database');
              await client.query(`DELETE FROM clients`)
              resolve(true)
            })
    })
}

function resetDatabase(){
  return new Promise(async (resolve, reject) => {
        await client.query(`DELETE FROM clients `)
        resolve(true)
  })
}

beforeAll(() => {
  return setupDatabase()
});

beforeEach(() => {
  return resetDatabase()
});

clientsTests(requestWithSupertest)