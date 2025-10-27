import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.js';
import connectDb from "./config/dbConnection.js";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.json({message: "Root Server is running"});
})

// Middleware
app.use(express.json());

// Routing 
app.use('/api/users', authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



