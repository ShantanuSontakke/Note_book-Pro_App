import express from 'express';
import cors from "cors"
import dotenv from 'dotenv';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from "./config/db.js"; 

import rateLimiter from './middleware/rateLimiter.js';



dotenv.config()

console.log(process.env.MONGO_URL);

const app = express();
const PORT = process.env.PORT || 5001;



// Middleware to parse JSON request bodies
app.use(
    cors({
    origin: "http://localhost:5173",
    }
))
app.use(express.json());
app.use(rateLimiter) ; // Apply rate limiting middleware


// our simple custom middleware
app.use((req,res,next) => {
    console.log(`Req method is ${req.method} & request URL is ${req.url}`);
    next();
});


app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server started on PORT: ",PORT);
});
});