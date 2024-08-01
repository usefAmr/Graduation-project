import { Router } from 'express'
import { validation } from '../../middleware/validation.js'
import { forgetPasswordSchema, loginSchema, signUpSchema } from './auth.validation.js'
import { auth } from '../../middleware/authMiddleware.js'
import {isAdmin} from '../../middleware/isAdmin.js'
import * as authController from './controller/auth.js'
const router = Router()


router.post("/adduser",validation(signUpSchema),authController.signUp)

router.post("/login",validation(loginSchema),authController.login)

router.post("/logout",authController.logout)

router.post("/forgetpassword",validation(forgetPasswordSchema),authController.forgetPassword);




export default router