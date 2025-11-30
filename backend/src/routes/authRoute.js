import express from 'express'
import { getme, loginUser, logoutUser, refreshAccessToken, registerUser } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/register', registerUser)

authRouter.post('/login', loginUser)

authRouter.post('/logout', logoutUser)

authRouter.post('/refresh-token', refreshAccessToken)

authRouter.get('/getme', getme)

export default authRouter