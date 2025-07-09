import request from 'supertest';
import app from '../app';
import {Server} from '../types/server'
import mongoose from 'mongoose';
import ServerModel from '../models/server';

let testServerId: string;

beforeEach(async () =>{
    const testServer = new ServerModel({name: 'TestServer', ownerId: mongoose.Types.ObjectId.createFromTime(0)});
    await testServer.save();
    testServerId = testServer._id.toString();
});

describe("GET Servers", () =>{
    it("should return list of available servers", async () =>{
        const res = await request(app)
        .get('/servers')
        .expect("Content-Type", /json/)
        .expect(200);

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
        await request(app)
        .post("/servers")
        .send({name: "test", ownerId: testServerId})
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

describe('get /servers/:id/members', () => { 
    it("should return list of members on given server", async () =>{
        const res = await request(app)
        .get(`/servers/${testServerId}/members`)
        .send()
        .expect("Content-Type", /json/)
        .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('get /servers/:id/members', () => {
    const invalidId = "123";
    it("should return 400 (invalid id)", async () =>{
        await request(app)
        .get(`/servers/${invalidId}/members`)
        .send()
        .expect("Content-Type", /json/)
        .expect(400);
    });
});

describe('get /servers/:id/members', () => {
    const invalidId = mongoose.Types.ObjectId.createFromTime(5);
    it("should return 404 (non existent server)", async () =>{
        await request(app)
        .get(`/servers/${invalidId}/members`)
        .send()
        .expect("Content-Type", /json/)
        .expect(404);
    });
});

describe('servers/:id/join', () => {
    it("should return list of members on given server", async () =>{
        await request(app)
        .post(`/servers/${testServerId}/join`)
        .send({userId: mongoose.Types.ObjectId.createFromTime(1)})
        .expect(204);
    });
});


describe('servers/:id/join', () => {
    const invalidId = "123";
    it("should return 400 (invalid id)", async () =>{
        await request(app)
        .post(`/servers/${invalidId}/join`)
        .send({userId: mongoose.Types.ObjectId.createFromTime(1)})
        .expect("Content-Type", /json/)
        .expect(400);
    });
});


describe('servers/:id/join', () => {
    const invalidId = mongoose.Types.ObjectId.createFromTime(5);
    it("should return 404 (non existent server)", async () =>{
        await request(app)
        .post(`/servers/${invalidId}/join`)
        .send({userId: mongoose.Types.ObjectId.createFromTime(1)})
        .expect("Content-Type", /json/)
        .expect(404);
    });
});
