import userModal from '../models/user.model.js'
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from '../services/radis.service.js';

export const createUserControllers = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { user, token } = await userService.createUser(req.body);
        res.status(201).json({ user, token }); // Send both the user and the token
        delete user._doc.password;
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const loginControllers = async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {email,password} = req.body;
    try {
        const user = await userModal.findOne({email}).select("+password");

        if(!user){
            return res.status(401).json({
                errors : 'Invalid Credantials'
            })
        }

        const isMatch = await user.isValidPassword(password);

        if(!isMatch){
            return res.status(401).json({
                errors : 'Invalid Credantials'
            })
        }

        const token = await user.generateJWT();

        res.status(200).json({user,token});
        delete user._doc.password;

    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const profileControllers = async (req,res) => {
    console.log(req.user);
    res.status(200).json({
        user : req.user,
    })
}

export const logoutControllers = async (req, res) => {
    try {
        let token;

        // Check for token in cookies or Authorization header
        if (req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            return res.status(400).json({
                message: "Token not provided",
            });
        }

        // Save the token in Redis with an expiry
        redisClient.set(token, 'logout', 'EX', 60 * 60 * 24); // 86400 seconds (1 day)

        // Respond with success
        res.status(200).json({
            message: "Logout successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};
