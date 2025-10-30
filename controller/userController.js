import express from 'express';
import User from './../models/userModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc Register a new user
// @route POST /api/users/register
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    const userAvailable = await User.findOne({ email });
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }

    // Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
    const user = await User.create({
        email,
        password: hashedPassword,
    });
    console.log(`user craeted ${user}`);
    if(user){
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    

    res.json({message: "User registered successfully!"});
});

// @desc Login a user
// @route POST /api/users/login
// @access Public

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

    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
        res.status(401);
        throw new Error("Invalid credentials. Password does not match");
    }

    const accessToken = jwt.sign(
        {
            user: {id: user.id, email: user.email}
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1h"}
    );

    res.status(200).json({ accessToken });
});


