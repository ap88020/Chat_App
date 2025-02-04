import {Router} from 'express'
import {body} from 'express-validator'
import * as projectController from '../controllers/project.controller.js'
import * as autMiddleWare from '../middleware/auth.middleware.js'

const router = Router();

router.post('/create',
    autMiddleWare.authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProject,
) 
export default router;