
import { Router } from "express";
import { register, login, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js"
import upload from "../middlewares/upload.js";

const userRoute = Router()



userRoute.post('/register', upload.single("photo"), register)
userRoute.post('/login', login)
userRoute.get('/all', getAllUsers)
userRoute.get('/:id', getUserById)
userRoute.put('/:id',upload.single("photo"), updateUser)
userRoute.delete('/:id', deleteUser)

export default userRoute