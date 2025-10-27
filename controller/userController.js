import express from 'express';
import User from './../models/userModel.js';
import asyncHandler from 'express-async-handler';

export const registerUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    const user = await User.findOne({ email });
    if(user){
        res.status(400);
        throw new Error("User already exists");
    }

    res.json({message: "User registered successfully!"});
});

export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    const user = await User.findOne({ email });
    if(!user){
        res.status(401);
        throw new Error("Invalid credentials. No user found with this email");
    }

    res.json({message: "User logged in successfully!"});
});


