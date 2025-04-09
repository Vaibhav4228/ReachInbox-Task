import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from 'body-parser';
import emailRoutes from "./routes/emailRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/emails', emailRoutes);


export default app;