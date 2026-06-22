import { Router } from "express"
import { generateToken } from "../../utils/generate_token.js"
import { loginUser, registerUser } from "./userServices.js"

const userRouter = Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

export default userRouter
