
import { Router } from "express";
import { createClub, getAllClubs, getClubById, updateClub, deleteClub } from "../controllers/club.controller.js"

const clubRoute = Router()

clubRoute.post('/new', createClub)
clubRoute.get('/all', getAllClubs)
clubRoute.get('/:id', getClubById)
clubRoute.put('/:id', updateClub)
clubRoute.delete('/:id', deleteClub)

export default clubRoute