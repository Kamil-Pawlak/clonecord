import request from 'supertest';
import app from '../src/app';

describe("GET /channels", () =>{
    it("should return list of available channels", async () =>{
        const res = await request(app)
        .get("/channels")
        .expect("Content-Type", /json/)
        .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
        res.body.forEach((item: { id:string; name: string }) => {
            expect(typeof item.id).toBe("string");
            expect(typeof item.name).toBe("string");
        });
    });
});