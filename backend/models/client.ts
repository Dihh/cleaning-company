import { Client as DbClients } from 'pg'
import { SystemError, SystemErrosStatus } from '../interfaces/erros'

export class Client{
    static tableName = "clients"

    id: string
    name: string
    email: string

    constructor(id = "", name = "", email = ""){
        this.name = name
        this.email = email
        this.id = id
    }

    static getClients(dbClient: DbClients, name: string, email: string){
        return new Promise(async (resolve, reject) => {
            try {
                const result = await dbClient.query(
                    `SELECT * FROM ${this.tableName} WHERE NAME LIKE $1 AND EMAIL LIKE $2 ORDER BY name ASC`,
                    [`%${name || ""}%`, `%${email || ""}%`]
                    )
                resolve(result.rows.map((client) => new Client(client.id, client.name, client.email)));
            } catch (err) {
                console.error('Error executing query', err);
                const error: SystemError = { status: SystemErrosStatus.error, message: "something went wrong" }
                reject(error)
            }
        })
    }

    find(dbClient: DbClients){
        return new Promise(async (resolve, reject) => {
            try {
                const result = await dbClient.query('SELECT * FROM clients WHERE id = $1', [this.id])
                if (result.rows.length) {
                    resolve(result.rows[0]);
                } else {
                    const error: SystemError = { status: SystemErrosStatus.npContent, message: "" }
                    reject(error)
                }
            } catch (err) {
                console.error('Error executing query', err);
                const error: SystemError = { status: SystemErrosStatus.error, message: "something went wrong" }
                reject(error)
            }
        })
    }

    create(dbClient: DbClients){
        return new Promise(async (resolve, reject) => {
            const query = 'INSERT INTO clients(id, name, email) VALUES (gen_random_uuid(), $1, $2) RETURNING *';
            const values = [this.name, this.email];
            const fieldError = this.validateField(['name', 'email'])
            if(fieldError){
                reject(fieldError)
            }
            try {
                const result = await dbClient.query(query, values)
                resolve(result.rows[0]);
            } catch (err) {
                console.error('Error executing query', err);
                const error: SystemError = { status: SystemErrosStatus.error, message: "something went wrong" }
                reject(error)
            }
        })
    }

    update(dbClient: DbClients){
        return new Promise(async (resolve, reject) => {
            const query = 'UPDATE clients SET name=$2, email=$3 WHERE id=$1 RETURNING *';
            const values = [this.id, this.name, this.email];
            const fieldError = this.validateField(['name', 'email'])
            if(fieldError){
                reject(fieldError)
                return
            }
            try {
                const result = await dbClient.query(query, values)
                if (result.rows.length) {
                    resolve(result.rows[0]);
                } else {
                    const error: SystemError = { status: SystemErrosStatus.npContent, message: "" }
                    reject(error)
                }
            } catch (err) {
                console.error('Error executing query', err);
                const error: SystemError = { status: SystemErrosStatus.error, message: "something went wrong" }
                reject(error)
            }
        })
    }

    delete(dbClient: DbClients){
        return new Promise(async (resolve, reject) => {
            const query = 'DELETE FROM clients WHERE ID=$1 RETURNING *';
            const values = [this.id];
            try {
                const result = await dbClient.query(query, values)
                if (result.rows.length) {
                    resolve(result.rows[0]);
                } else {
                    const error: SystemError = { status: SystemErrosStatus.badRequest, message: "" }
                    reject(error)
                }
            } catch (err) {
                console.error('Error executing query', err);
                const error: SystemError = { status: SystemErrosStatus.error, message: "something went wrong" }
                reject(error)
            }
        })
    }

    validateField(fields: (keyof Client)[]){
        const fieldError = fields.find(field => !this[field] || this[field] == "")
        if(fieldError){
            const error: SystemError = { status: SystemErrosStatus.badRequest, message: `Invalid ${fieldError}` }
            return error
        }
    }
}