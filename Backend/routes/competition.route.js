
import { Router } from "express";
import { createCompetition, getAllCompetitions, getCompetitionById, updateCompetition, deleteCompetition } from "../controllers/competition.controller.js"

const competitionRoute = Router()

competitionRoute.post('/new', createCompetition)
competitionRoute.get('/all', getAllCompetitions)
competitionRoute.get('/:id', getCompetitionById)
competitionRoute.put('/:id', updateCompetition)
competitionRoute.delete('/:id', deleteCompetition)

export default competitionRoute