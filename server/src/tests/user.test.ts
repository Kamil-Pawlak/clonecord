import request from 'supertest';
import app from '../app';

describe('POST /user', () => {
    it("should create user", async () =>{
        const res = await request(app)
        .post('/user')
        .send({username: "Test", email: "test@test.com"})
        .expect("Content-Type", /json/)
        .expect(201);

        expect(typeof res.body.id).toBe('string');
        expect(typeof res.body.username).toBe('string');
        expect(typeof res.body.email).toBe('string');
        expect(new Date(res.body.createdAt)).not.toBe('Invalid date');
    });
});

