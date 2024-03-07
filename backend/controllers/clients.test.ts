interface Client {
    id?: string
    name: string
    email: string
    coordinates: number[] | undefined
}

const DEFAULT_CLIENT_DATA = { name: "teste", email: "teste@example.com", coordinates: [5, 5] }

export function clientsTests(requestWithSupertest: any) {
    async function insertCLient(data: Client) {
        return await requestWithSupertest.post('/clients').send(data).set('Content-Type', "application/json");
    }

    describe('Client Endpoints', () => {
        it('POST /client should create client', async () => {
            const res = await insertCLient(DEFAULT_CLIENT_DATA)
            expect(res.status).toEqual(201);
            expect(res.type).toEqual(expect.stringContaining('json'));
            const client = res.body as Client
            expect(client.name).toEqual(DEFAULT_CLIENT_DATA.name)
            expect(client.email).toEqual(DEFAULT_CLIENT_DATA.email)
            expect(client.coordinates).toEqual(DEFAULT_CLIENT_DATA.coordinates)
            expect(client).toHaveProperty('id')
        });

        it('POST /client should not create client without name', async () => {
            const data: any = { email: DEFAULT_CLIENT_DATA.email }
            const res = await insertCLient(data)
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({ "message": "Invalid name", "status": "bad-request" });
        });

        it('POST /client should not create client without email', async () => {
            const data: any = { name: DEFAULT_CLIENT_DATA.name }
            const res = await insertCLient(data)
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({ "message": "Invalid email", "status": "bad-request" });
        });

        it('POST /client should not create client with empty name', async () => {
            const data = { ...DEFAULT_CLIENT_DATA }
            data.name = ""
            const res = await insertCLient(data)
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({ "message": "Invalid name", "status": "bad-request" });
        });

        it('POST /client should not create client with empty email', async () => {
            const data = { ...DEFAULT_CLIENT_DATA }
            data.email = ""
            const res = await insertCLient(data)
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({ "message": "Invalid email", "status": "bad-request" });
        });

        it('GET /client should show all clients', async () => {
            await insertCLient(DEFAULT_CLIENT_DATA)
            const res = await requestWithSupertest.get('/clients');
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
            expect(res.body.data.length).toBeGreaterThan(0)
            const client = res.body.data[0]
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
            const newClientData: Client = { name: newName, email: "teste@email.com", coordinates: [3, 3] }
            const res = await requestWithSupertest.patch(`/clients/${insertedClient.id}`)
                .send(newClientData).set('Content-Type', "application/json");
            expect(res.status).toEqual(200);
            const client = res.body as Client
            expect(client.name).toEqual(newClientData.name)
            expect(client.email).toEqual(newClientData.email)
            expect(client.coordinates).toEqual(newClientData.coordinates)
            expect(client.id).toEqual(insertedClient.id)
        });

        it('PATCH /client/:id should receive 400 when try to update invalid client', async () => {
            await insertCLient(DEFAULT_CLIENT_DATA)
            const res = await requestWithSupertest.patch(`/clients/invalid-id`)
                .send({ name: "newName", email: "teste@email.com" }).set('Content-Type', "application/json");
            expect(res.status).toEqual(400);
        });

        it('PATCH /client should not update client without name', async () => {
            const insertedClient: Client = (await insertCLient(DEFAULT_CLIENT_DATA)).body
            const data: any = { email: DEFAULT_CLIENT_DATA.email }
            const res = await requestWithSupertest.patch(`/clients/${insertedClient.id}`)
                .send(data).set('Content-Type', "application/json");
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({ "message": "Invalid name", "status": "bad-request" });
        });

        it('PATCH /client should not update client without email', async () => {
            const insertedClient: Client = (await insertCLient(DEFAULT_CLIENT_DATA)).body
            const data: any = { name: DEFAULT_CLIENT_DATA.name }
            const res = await requestWithSupertest.patch(`/clients/${insertedClient.id}`)
                .send(data).set('Content-Type', "application/json");
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({ "message": "Invalid email", "status": "bad-request" });
        });

        it('PATCH /client should not update client with empty name', async () => {
            const data = { ...DEFAULT_CLIENT_DATA }
            data.name = ""
            const insertedClient: Client = (await insertCLient(DEFAULT_CLIENT_DATA)).body
            const res = await requestWithSupertest.patch(`/clients/${insertedClient.id}`)
                .send(data).set('Content-Type', "application/json");
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({ "message": "Invalid name", "status": "bad-request" });
        });

        it('PATCH /client should not update client with empty email', async () => {
            const data = { ...DEFAULT_CLIENT_DATA }
            data.email = ""
            const insertedClient: Client = (await insertCLient(DEFAULT_CLIENT_DATA)).body
            const res = await requestWithSupertest.patch(`/clients/${insertedClient.id}`)
                .send(data).set('Content-Type', "application/json");
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({ "message": "Invalid email", "status": "bad-request" });
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
            const secondCLient: Client = { name: "second", email: "second@example.com", coordinates: [3, 3] }
            await insertCLient(secondCLient)
            const res = await requestWithSupertest.get(`/clients?name=${secondCLient.name}&email=${secondCLient.name}`);
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
            expect(res.body.data.length).toBe(1)
            const client = res.body.data[0]
            expect(client.name).toBe(secondCLient.name)
        });

        it('GET /client should filter client by email', async () => {
            await insertCLient(DEFAULT_CLIENT_DATA)
            const secondCLient: Client = { name: "second", email: "second@example.com", coordinates: [3, 3] }
            await insertCLient(secondCLient)
            const res = await requestWithSupertest.get(`/clients?email=${secondCLient.email}&name=${secondCLient.email}`);
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
            expect(res.body.data.length).toBe(1)
            const client = res.body.data[0]
            expect(client.email).toBe(secondCLient.email)
        });

        it('PATCH /client should not update client with empty coordinates', async () => {
            const data: any = { ...DEFAULT_CLIENT_DATA }
            data.coordinates = [null, null]
            const insertedClient: Client = (await insertCLient(DEFAULT_CLIENT_DATA)).body
            const res = await requestWithSupertest.patch(`/clients/${insertedClient.id}`)
                .send(data).set('Content-Type', "application/json");
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({ "message": "Invalid coordinates", "status": "bad-request" });
        });

        it('PATCH /client should not update client without coordinates', async () => {
            const insertedClient: Client = (await insertCLient(DEFAULT_CLIENT_DATA)).body
            const data: any = { name: DEFAULT_CLIENT_DATA.name, email: DEFAULT_CLIENT_DATA.email }
            const res = await requestWithSupertest.patch(`/clients/${insertedClient.id}`)
                .send(data).set('Content-Type', "application/json");
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({ "message": "Invalid coordinates", "status": "bad-request" });
        });

        it('POST /client should not create client without coordinates', async () => {
            const data: any = { name: DEFAULT_CLIENT_DATA.name, email: DEFAULT_CLIENT_DATA.email }
            const res = await insertCLient(data)
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({ "message": "Invalid coordinates", "status": "bad-request" });
        });

        it('POST /client should not create client with empty coordinates', async () => {
            const data: any = { ...DEFAULT_CLIENT_DATA }
            data.coordinates = [null, null]
            const res = await insertCLient(data)
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({ "message": "Invalid coordinates", "status": "bad-request" });
        });

        it('GET /client/calculate-routes should calculate the best route over all clients ', async () => {
            const [client1, client2, client3, client4]: Client[] = await Promise.all([
                (await insertCLient({ ...DEFAULT_CLIENT_DATA, coordinates: [1, 1] })).body,
                (await insertCLient({ ...DEFAULT_CLIENT_DATA, coordinates: [-1, -2] })).body,
                (await insertCLient({ ...DEFAULT_CLIENT_DATA, coordinates: [2, 2] })).body,
                (await insertCLient({ ...DEFAULT_CLIENT_DATA, coordinates: [5, 5] })).body
            ])
            const res = await requestWithSupertest.get(`/clients/calculate-routes`)
            const routesIds = res.body.map((client: Client) => client.id)
            const expectRoutesId = [client1.id, client3.id, client4.id, client2.id, '']
            expect(res.status).toEqual(200);
            expect(routesIds).toEqual(expectRoutesId);
        });

        it('GET /client should have metadata', async () => {
            await insertCLient(DEFAULT_CLIENT_DATA)
            const res = await requestWithSupertest.get('/clients');
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
            const metadata = res.body
            expect(metadata).toHaveProperty('page')
            expect(metadata).toHaveProperty('pages')
            expect(metadata).toHaveProperty('data')
        });

        it('GET /client should paginate', async () => {
            await Promise.all(Array.from(Array(11)).map(async () => {
                await insertCLient(DEFAULT_CLIENT_DATA)
            }))
            const res = await requestWithSupertest.get('/clients?page=2');
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
            const metadata = res.body
            expect(metadata.pages).toEqual(2)
            expect(metadata.data.length).toEqual(1)
        });
    });
}