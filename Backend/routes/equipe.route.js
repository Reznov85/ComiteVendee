
import { Router } from "express";
import { createEquipe, getAllEquipes, getEquipeById, updateEquipe, deleteEquipe } from "../controllers/equipe.controller.js"

const equipeRoute = Router()

equipeRoute.post('/new', createEquipe)
equipeRoute.get('/all', getAllEquipes)
equipeRoute.get('/:id', getEquipeById)
equipeRoute.put('/:id', updateEquipe)
equipeRoute.delete('/:id', deleteEquipe)

export default equipeRoute