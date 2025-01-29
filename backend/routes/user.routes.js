import { Router } from "express";
import * as userControllers from "../controllers/user.controller.js";
import { body } from "express-validator";
import * as authMiddleware from '../middleware/auth.middleware.js'


const route = Router();

// Register route
route.post('/register',
    [
        body('email').isEmail().withMessage('Email must be a valid email address'),
        body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
    ],
    userControllers.createUserControllers
);

// Login route
route.post('/login',
    [
        body('email').isEmail().withMessage('Email must be a valid email address'),
        body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
    ],
    userControllers.loginControllers
);

route.get('/profile',authMiddleware.authUser,userControllers.profileControllers);
route.get('/logout',authMiddleware.authUser,userControllers.logoutControllers);

export default route;
