import joi from "joi";

export default function userValidation(body){
    const userCreate = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
      nom: joi.string(),
      prenom: joi.string().required(),
      role: joi.string().required(),
      fonctionId: joi.string().allow(null, ''),
      fonction: joi.string().allow(null, ''),
      club: joi.string().allow(null, ''), // Permet null ou chaîne vide
      reportsTo: joi.string().allow(null, ''), // Permet null ou chaîne vide
      photo: joi.any(),

    })

    const userUpdate = joi.object({
      email: joi.string().email(),
      password: joi.string(),
      nom: joi.string(),
      prenom: joi.string(),
      role: joi.string(),
      fonctionId: joi.string().allow(null, ''),
      fonction: joi.string().allow(null, ''),
      club: joi.string().allow(null, ''), // Permet null ou chaîne vide
      reportsTo: joi.string().allow(null, ''), // Permet null ou chaîne vide

    })

    const userLogin = joi.object({
      email: joi.string().email(),
      password: joi.string(),
    })

    return {
        userCreate: userCreate.validate(body),
        userUpdate: userUpdate.validate(body),
        userLogin: userLogin.validate(body),
    }
}
