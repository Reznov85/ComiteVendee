import joi from "joi";

export default function equipeValidation(body){
    const equipeCreate = joi.object({
      nom: joi.string()
    })

    const equipeUpdate = joi.object({
      nom: joi.string()
    })

    return {
        equipeCreate: equipeCreate.validate(body),
        equipeUpdate: equipeUpdate.validate(body),
    }
}
