import { rejects } from 'assert';
import server from '../index';
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

// import '../index'

function setupDatabase(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, 1000)
    })
}

beforeAll(() => {
    return setupDatabase()
});

describe('User Endpoints', () => {


    it('GET /user should show all users', async () => {
        const res = await requestWithSupertest.get('/clients');
        // console.log(res)
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        // expect(res.body).toHaveProperty('users')
        // expect(true).toBe(true)
    });

    it('GET /user should show all users', async () => {
        const res = await requestWithSupertest.get('/clients');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        // expect(res.body).toHaveProperty('users')
        // expect(true).toBe(true)
    });

});