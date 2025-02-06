import jwt from "jsonwebtoken";
import redisClient from "../services/radis.service.js";

export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).send({ error: 'Unauthorized user' });
        }

        const isBlackListed = await redisClient.get(token);
        if (isBlackListed) {
            res.cookie('token', '');
            return res.status(400).send({ error: 'Unauthorized user' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT payload:", decoded); // Add this to debug
        req.user = decoded;

        next();
    } catch (error) {
        console.error("Auth error:", error.message); // Add this for debugging
        res.status(401).send({ error: 'Unauthorized error' });
    }
};
