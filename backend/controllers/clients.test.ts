interface Client { 
    id?: string
    name: string
    email: string
}

const DEFAULT_CLIENT_DATA = { name: "teste", email: "teste@example.com" }

export function clientsTests(requestWithSupertest: any){
    async function insertCLient(data: Client){
        return await requestWithSupertest.post('/clients').send(data).set('Content-Type', "application/json");
    }

    describe('Client Endpoints', () => {
        it('POST /client should create client', async () => {
            const res = await insertCLient(DEFAULT_CLIENT_DATA)
            expect(res.status).toEqual(201);
            expect(res.type).toEqual(expect.stringContaining('json'));
        });

        it('POST /client should not create client without name', async () => {
            const data: any = {email: DEFAULT_CLIENT_DATA.email}
            const res = await insertCLient(data)
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({"message": "Invalid name", "status": "bad-request"});
        });

        it('POST /client should not create client without email', async () => {
            const data: any = {name: DEFAULT_CLIENT_DATA.name}
            const res = await insertCLient(data)
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({"message": "Invalid email", "status": "bad-request"});
        });

        it('POST /client should not create client with empty name', async () => {
            const data = {...DEFAULT_CLIENT_DATA}
            data.name = ""
            const res = await insertCLient(data)
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({"message": "Invalid name", "status": "bad-request"});
        });

        it('POST /client should not create client with empty email', async () => {
            const data = {...DEFAULT_CLIENT_DATA}
            data.email = ""
            const res = await insertCLient(data)
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({"message": "Invalid email", "status": "bad-request"});
        });

        it('GET /client should show all clients', async () => {
            await insertCLient(DEFAULT_CLIENT_DATA)
            const res = await requestWithSupertest.get('/clients');
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
            expect(res.body.length).toBeGreaterThan(0)
            const client = res.body[0]
            expect(client).toHaveProperty('email')
            expect(client).toHaveProperty('name')
            expect(client).toHaveProperty('id')
        });

        it('GET /client/:id should show client', async () => {
            const insertedClient: Client = (await insertCLient(DEFAULT_CLIENT_DATA)).body
            const res = await requestWithSupertest.get(`/clients/${insertedClient.id}`);
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
            const client = res.body
            expect(client).toHaveProperty('email')
            expect(client).toHaveProperty('name')
            expect(client).toHaveProperty('id')
        });

        it('GET /client/:id should receive 204 when invalid client', async () => {
            await insertCLient(DEFAULT_CLIENT_DATA)
            const res = await requestWithSupertest.get(`/clients/invalid-id`);
            expect(res.status).toEqual(204);
        });

        it('PATCH /client/:id should update client', async () => {
            const insertedClient: Client = (await insertCLient(DEFAULT_CLIENT_DATA)).body
            const newName = "etset"
            const res = await requestWithSupertest.patch(`/clients/${insertedClient.id}`)
            .send({name: newName, email: "teste@email.com"}).set('Content-Type', "application/json");
            expect(res.status).toEqual(200);
            const client = res.body
            expect(client).toHaveProperty('email')
            expect(client).toHaveProperty('name')
            expect(client).toHaveProperty('id')
            expect(client.name).toBe(newName)
        });

        it('PATCH /client/:id should receive 204 when try to update invalid client', async () => {
            await insertCLient(DEFAULT_CLIENT_DATA)
            const res = await requestWithSupertest.patch(`/clients/invalid-id`)
            .send({name: "newName", email: "teste@email.com"}).set('Content-Type', "application/json");
            expect(res.status).toEqual(204);
        });
    
        it('PATCH /client should not update client without name', async () => {
            const insertedClient: Client = (await insertCLient(DEFAULT_CLIENT_DATA)).body
            const data: any = {email: DEFAULT_CLIENT_DATA.email}
            const res = await requestWithSupertest.patch(`/clients/${insertedClient.id}`)
            .send(data).set('Content-Type', "application/json");
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({"message": "Invalid name", "status": "bad-request"});
        });

        it('PATCH /client should not update client without email', async () => {
            const insertedClient: Client = (await insertCLient(DEFAULT_CLIENT_DATA)).body
            const data: any = {name: DEFAULT_CLIENT_DATA.name}
            const res = await requestWithSupertest.patch(`/clients/${insertedClient.id}`)
            .send(data).set('Content-Type', "application/json");
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({"message": "Invalid email", "status": "bad-request"});
        });

        it('PATCH /client should not update client with empty name', async () => {
            const data = {...DEFAULT_CLIENT_DATA}
            data.name = ""
            const insertedClient: Client = (await insertCLient(DEFAULT_CLIENT_DATA)).body
            const res = await requestWithSupertest.patch(`/clients/${insertedClient.id}`)
            .send(data).set('Content-Type', "application/json");
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({"message": "Invalid name", "status": "bad-request"});
        });

        it('PATCH /client should not update client with empty email', async () => {
            const data = {...DEFAULT_CLIENT_DATA}
            data.email = ""
            const insertedClient: Client = (await insertCLient(DEFAULT_CLIENT_DATA)).body
            const res = await requestWithSupertest.patch(`/clients/${insertedClient.id}`)
            .send(data).set('Content-Type', "application/json");
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({"message": "Invalid email", "status": "bad-request"});
        });

        it('DELETE /client should delete client', async () => {
            const insertedClient: Client = (await insertCLient(DEFAULT_CLIENT_DATA)).body
            const res = await requestWithSupertest.delete(`/clients/${insertedClient.id}`)
            expect(res.status).toEqual(200);
        });

        it('DELETE /client should receive 400 when invalid client', async () => {
            await insertCLient(DEFAULT_CLIENT_DATA)
            const res = await requestWithSupertest.delete(`/clients/invalid-id`)
            expect(res.status).toEqual(400);
        });

        it('GET /client should filter client by name', async () => {
            await insertCLient(DEFAULT_CLIENT_DATA)
            const secondCLient = {name: "second", email: "second@example.com"}
            await insertCLient(secondCLient)
            const res = await requestWithSupertest.get(`/clients?name=${secondCLient.name}`);
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
            expect(res.body.length).toBe(1)
            const client = res.body[0]
            expect(client.name).toBe(secondCLient.name)
        });

        it('GET /client should filter client by email', async () => {
            await insertCLient(DEFAULT_CLIENT_DATA)
            const secondCLient = {name: "second", email: "second@example.com"}
            await insertCLient(secondCLient)
            const res = await requestWithSupertest.get(`/clients?email=${secondCLient.email}`);
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
            expect(res.body.length).toBe(1)
            const client = res.body[0]
            expect(client.email).toBe(secondCLient.email)
        });
    });
}