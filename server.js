import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.js';
import connectDb from "./config/dbConnection.js";
import agentRoutes from './routes/agent.js';
import uploadRoutes from './routes/upload.js';
import cors from 'cors';

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.json({message: "Root Server is running"});
})

// Middleware
app.use(express.json());
app.use(cors());

// Routing 
app.use('/api/users', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/uploads', uploadRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



