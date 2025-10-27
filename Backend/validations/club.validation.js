import Joi from "joi";

export default function clubValidation(body) {
  const clubCreate = Joi.object({
    nom: Joi.string().min(2).max(100).required(),
    adresse: Joi.string().allow(null, "").max(255),
    codePostal: Joi.alternatives()
      .try(
        Joi.number().integer().min(1000).max(99999),
        Joi.string().pattern(/^\d{4,5}$/)
      )
      .required()
      .messages({
        "any.required": "Le code postal est requis.",
      }),
    ville: Joi.string().min(2).max(100).required(),
    email: Joi.string().email({ tlds: { allow: false } }).allow(null, ""),
    dateAffiliation: Joi.date().allow(null),
  });

  return {
    clubCreate: clubCreate.validate(body, { abortEarly: false }),
  };
}
