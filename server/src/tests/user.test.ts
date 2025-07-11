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

//login tests
describe('POST /user/login', () =>{
    it("Should return token and code 200", async () =>{
        //first create a user
        await request(app)
        .post('/user/register')
        .send({username: "Test", email: "test@test.com", password: "YouShallNotPass"});

        //test login
        const res = await request(app)
        .post('/user/login')
        .send({email: "test@test.com", password: "YouShallNotPass"})
        .expect("Content-Type", /json/)
        .expect(200);

        expect(res.body.token).not.toBeNull();
    });
});

describe('POST /user/login', () =>{
    it("Should return 400 (empty body)", async () =>{
        await request(app)
        .post('/user/login')
        .send()
        .expect("Content-Type", /json/)
        .expect(400);
    });
});

describe('POST /user/login', () =>{
    it("Should return 400 (missing email)", async () =>{
        const res = await request(app)
        .post('/user/login')
        .send({password: "YouShallNotPass"})
        .expect("Content-Type", /json/)
        .expect(400);
    });
});

describe('POST /user/login', () =>{
    it("Should return 400 Invalid credentials (bad password)", async () =>{
        //first create a user
        await request(app)
        .post('/user/register')
        .send({username: "Test", email: "test@test.com", password: "YouShallNotPass"});

        //test login
        await request(app)
        .post('/user/login')
        .send({email: "test@test.com", password: "YouShallPass"})
        .expect("Content-Type", /json/)
        .expect(400);
    });
});

describe('POST /user/login', () =>{
    it("Should return 400 Invalid credentials (bad email)", async () =>{
        //first create a user
        await request(app)
        .post('/user/register')
        .send({username: "Test", email: "test@test.com", password: "YouShallNotPass"});

        //test login
        await request(app)
        .post('/user/login')
        .send({email: "bad@test.com", password: "YouShallNotPass"})
        .expect("Content-Type", /json/)
        .expect(400);
    });
});

