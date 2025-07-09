import express from "express";
import cors from "cors";
import channelsRouter from './routes/channels';
import serversRouter from './routes/servers';
import usersRouter from './routes/user';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) =>{
    res.send('API is running');
});

app.use('/channels', channelsRouter);
app.use('/servers', serversRouter);
app.use('/user', usersRouter);


export default app;
