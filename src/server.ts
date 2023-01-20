import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import customerRoutes from './routes/customer-routes';

const router = express();
mongoose.set('strictQuery', false);
//connect mongoose
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('connected to mongo db ');
        startServer();
    })
    .catch((err) => {
        console.log(err);
    });

const startServer = () => {
    router.use((req, res, next) => {
        //log the request
        console.log(`Incoming method -> Method:[${req.method}] - Url - ${req.url} - IP - ${req.socket.remoteAddress}`);

        res.on('finish', () => {
            console.log(
                `Incoming method -> Method:[${req.method}] - Url - ${req.url} - IP - ${req.socket.remoteAddress} -- status: [${res.statusCode}]`
            );
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    //Rules for API
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
            return res.status(200).json({});
        }
        next();
    });

    //Routes

    router.use('/customers', customerRoutes);

    //health check

    // router.get('/ping', (req, res, next) => res.status(200).json({ message: 'Pong' }));
    router.use((req, res, next) => {
        const error = new Error('Route Not Found mp');
        console.log(error);
        return res.status(400).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () =>
        console.log(`server is running on port : ${config.server.port}`)
    );
};
