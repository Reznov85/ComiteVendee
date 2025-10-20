import Competition from "../models/competition.model.js"
import competitionValidation from "../validations/competition.validation.js"

const createCompetition = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "no data in the request"})
        }
        const {error} = competitionValidation(body).competitionCreate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const competition = new Competition(body)
        const newCompetition = await competition.save()
        return res.status(201).json(newCompetition)        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllCompetitions = async(req, res) => {
    try {
        const competitions = await Competition.find()
        return res.status(200).json(competitions)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error", error: error})
    }
}

const getCompetitionById = async(req,res) => {
    try {
        const competition = await Competition.findById(req.params.id)
        if(!competition){
            return res.status(404).json({message: "competition doesn't exist"})
        }
        return res.status(200).json(competition)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const updateCompetition = async(req,res) => {
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }

        const {error} = competitionValidation(body).competitionUpdate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const updatedCompetition = await Competition.findByIdAndUpdate(req.params.id, body, {new: true})
        if(!updatedCompetition){
            res.status(404).json({message: "competition doesn't exist"})
        }
        return res.status(200).json(updatedCompetition)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const deleteCompetition = async(req, res) => {
    try {
        const competition = await Competition.findByIdAndDelete(req.params.id)
        if(!competition){
            return res.status(404).json({message: "competition doesn't exist"})
        }
        return res.status(200).json({message: "competition has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

export { createCompetition, getAllCompetitions, getCompetitionById, updateCompetition, deleteCompetition }