import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoute from './routes/authRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true,
}));

const Port = process.env.PORT || 8080;

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("You are on DevTrade");
});

app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
