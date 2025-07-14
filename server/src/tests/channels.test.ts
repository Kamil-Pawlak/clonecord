import request from 'supertest';
import app from '../app';
import ServerModel from '../models/server';
import mongoose from 'mongoose';

let testServerId: string;
let authToken: string;

beforeEach(async () =>{
    const testServer = new ServerModel({name: 'TestServer', ownerId: mongoose.Types.ObjectId.createFromTime(0)});
    await testServer.save();
    testServerId = testServer._id.toString();

    //create user
    let res = await request(app)
    .post('/user/register')
    .send({ username: "TestUser", email: "test@example.com", password: "password" });

    authToken = res.body.token;

    await request(app)
    .post(`/servers/${testServerId}/join`)
    .set('Authorization', `Bearer ${authToken}`)
    .send()
});


describe('GET /channels', () =>{
    it("should return list of available channels", async () =>{
        const res = await request(app)
        .get(`/channels?serverId=${testServerId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect("Content-Type", /json/)
        .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
        res.body.forEach((item: { id:string; name: string }) => {
            expect(typeof item).toBe('Channel');
        });
    });
});

describe("GET /channels", () =>{
    it("get channels without serverId", async () =>{
        await request(app)
        .get("/channels")
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400);
    });
});

describe("POST /channels", () =>{
    it("should create a channel when provided a name", async () =>{
        //test good input
        await request(app)
        .post("/channels")
        .set('Authorization', `Bearer ${authToken}`)
        .send({name: "test channel", serverId: testServerId})
        .expect("Content-Type", /json/)
        .expect(201);
    })
});

describe("POST /channels", () =>{
    it("testing empty body", async () =>{
        //test empty input
        await request(app)
        .post("/channels")
        .set('Authorization', `Bearer ${authToken}`)
        .send()
        .expect(400);
    })
});


describe("POST /channels", () =>{
    it("testing empty name field", async () =>{
        //test empty name field
        await request(app)
        .post("/channels")
        .set('Authorization', `Bearer ${authToken}`)
        .send({name: ""})
        .expect("Content-Type", /json/)
        .expect(400);
    })
});


describe("POST /channels", () =>{
    it("testing wrong data type", async () =>{
        //test wrong data type
        await request(app)
        .post("/channels")
        .set('Authorization', `Bearer ${authToken}`)
        .send({name: 1})
        .expect("Content-Type", /json/)
        .expect(400);
    })
});

