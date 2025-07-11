import request from 'supertest';
import app from '../app';

describe('POST /user/register', () => {
    it("should create user", async () =>{
        const res = await request(app)
        .post('/user/register')
        .send({username: "Test", email: "test@test.com", password: "YouShallNotPass"})
        .expect("Content-Type", /json/)
        .expect(201);

        expect(typeof res.body.id).toBe('string');
        expect(typeof res.body.username).toBe('string');
        expect(typeof res.body.email).toBe('string');
        expect(new Date(res.body.createdAt)).not.toBe('Invalid date');
    });
});

describe('POST /user/register', () => {
    it("should fail because of wrong body", async () =>{
        await request(app)
        .post('/user/register')
        .send({})
        .expect("Content-Type", /json/)
        .expect(400);
    });
});


describe('POST /user/register', () => {
    it("should fail because of duplicate email", async () =>{
        await request(app)
        .post('/user/register')
        .send({username: "Test", email: "test@test.com", password: "YouShallNotPass"})

        await request(app)
        .post('/user/register')
        .send({username: "Test", email: "test@test.com", password: "YouShallNotPass"})
        .expect("Content-Type", /json/)
        .expect(409);
    });
});