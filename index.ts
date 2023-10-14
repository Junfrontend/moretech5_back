import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index';
import { createServer } from "http";
import { generateData } from './data/dataGenerator';

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
    cors({
        origin: true
    }),
);

app.use('/api', router);

const start = async () => {
    try {
        generateData();
        server.listen(PORT, () => {
            console.log(`Server has been started at ${PORT} port.`);
        });
    } catch (error) {
        console.log(error)
    }
};

start();
