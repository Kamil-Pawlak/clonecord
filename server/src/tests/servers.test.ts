import request from 'supertest';
import app from '../app';
import {Server} from '../types/server'

describe("GET Servers", () =>{
    it("should return list of available servers", async () =>{
        const res = await request(app)
        .get('/servers')
        .expect("Content-Type", /json/)
        .expect(201);

        res.body.forEach((item: Server) => {
            expect(typeof item.id).toBe('string');
            expect(typeof item.name).toBe('string');
            expect(typeof item.ownerId).toBe('string');
            expect(new Date(item.createdAt).toString()).not.toBe('Invalid Date');
        });
    });
});


describe("POST /servers", () =>{
    it("Should create a server when provided good input", async () =>{
        const res = await request(app)
        .post("/servers")
        .send({name: "test", ownerId: "123"})
        .expect("Content-Type", /json/)
        expect(201);
    })
});


describe("POST /servers (bad input)", () =>{
    it("Should fail when input is missing", async () => {
        await request(app)
            .post("/servers")
            .send()
            .expect("Content-Type", /json/)
            .expect(400);
        });
});
