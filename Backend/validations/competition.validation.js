import joi from "joi";

export default function competitionValidation(body){
    const competitionCreate = joi.object({
      nom: joi.string()
    })

    const competitionUpdate = joi.object({
      nom: joi.string()
    })

    return {
        competitionCreate: competitionCreate.validate(body),
        competitionUpdate: competitionUpdate.validate(body),
    }
}
