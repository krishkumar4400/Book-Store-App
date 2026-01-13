import express from "express";
import 'dotenv/config';
import connectDB from "./database/db.js";

const app = express();

// connect to the database
await connectDB();

// middleware
app.use(express.json());

app.get('/', (req,res) => {
  res.send("Hello express");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
