import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/agentModel.js";


export const createAgentUser = asyncHandler(async (req, res) => {
    const {name,email,mobile,password} = req.body;
    if(!name || !email || !mobile || !password){
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    const agentAvailable = await User.findOne({ email });
    if(agentAvailable){
        res.status(400);
        throw new Error("Agent already exists");
    }

    // Hashed Password 
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    const agent = await User.create({
        name,
        email,
        mobile,
        password: hashedPassword,
    });
    console.log(`agent created ${agent}`);
    if(agent){
        res.status(201).json({ _id: agent.id, email: agent.email });
    } else {
        res.status(400);
        throw new Error("Agent data is not valid");
    }

    res.json({message: "Agent registered successfully!"});
});


export const listAgentUser  = asyncHandler(async (req, res) => {
    const agents = await User.find().select('-password');
    res.status(200).json(agents);
});