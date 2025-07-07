import dotenv from 'dotenv'
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();


const uri = `mongodb+srv://${process.env.DbUserName}:${process.env.DbPassword}@cluster0.97bkyx9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const clientOptions: ConnectOptions = { serverApi: { version: mongoose.mongo.ServerApiVersion.v1, strict: true, deprecationErrors: true } };

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db!.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export { run };