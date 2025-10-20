import joi from "joi";

export default function actualiteValidation(body){
    const actualiteCreate = joi.object({
      titre: joi.string()
    })

    const actualiteUpdate = joi.object({
      titre: joi.string()
    })

    return {
        actualiteCreate: actualiteCreate.validate(body),
        actualiteUpdate: actualiteUpdate.validate(body),
    }
}
