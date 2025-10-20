
import { Router } from "express";
import { register, login, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js"

const userRoute = Router()

userRoute.post('/register', register)
userRoute.post('/login', login)
userRoute.get('/all', getAllUsers)
userRoute.get('/:id', getUserById)
userRoute.put('/:id', updateUser)
userRoute.delete('/:id', deleteUser)

export default userRoute