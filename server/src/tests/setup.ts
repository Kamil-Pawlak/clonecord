import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongod: MongoMemoryServer;

export const setup = async () => {
    mongod = await MongoMemoryServer.create({
        instance: {
        dbName: 'test',
        },
        binary: {
        version: '6.0.5',
        },
    });
    const uri = mongod.getUri();
    process.env.MONGO_URI = uri;
    console.log(`MongoDB Memory Server started at ${uri}`);
};

export const teardown = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
  await mongod.stop();
};

export const clearDatabase = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI ?? '');
    }
    
    // Clear all collections in the database
  const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}

export const getMongoUri = () =>{
    return mongod.getUri();
}

beforeAll(async () => {
    await setup();
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI ?? '');
    }
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await teardown();
});