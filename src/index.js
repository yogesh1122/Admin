import express from 'express';
import http from 'http';

import { connectMongo, Routes, startServer  } from './startupfiles';

const app = express();
const server = http.createServer(app);

// start the server.
startServer(server);

// connect to mongo.
connectMongo();

// routing
Routes(app);
