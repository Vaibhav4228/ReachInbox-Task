import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


export default app;