import request from 'supertest';
import app from '../app';


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

describe("POST /channels", () =>{
    it("should create a channel when provided a name", async () =>{
        //test good input
        await request(app)
        .post("/channels")
        .send({name: "test channel"})
        .expect("Content-Type", /json/)
        .expect(201);
    })
});

describe("POST /channels", () =>{
    it("testing empty body", async () =>{
        //test empty input
        await request(app)
        .post("/channels")
        .send()
        .expect("Content-Type", /json/)
        .expect(400);
    })
});


describe("POST /channels", () =>{
    it("testing empty name field", async () =>{
        //test empty name field
        await request(app)
        .post("/channels")
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
        .send({name: 1})
        .expect("Content-Type", /json/)
        .expect(400);
    })
});

