import express from "express";
import cors from "cors";
import channelsRouter from './routes/channels';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) =>{
    res.send('API is running');
});

app.use('/channels', channelsRouter);


export default app;
