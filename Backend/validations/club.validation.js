// validations/club.validation.js
import Joi from "joi";

export default function clubValidation(body) {
  // ✅ Schéma de création d’un club
  const clubCreate = Joi.object({
    nom: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        "string.empty": "Le nom du club est obligatoire.",
        "string.min": "Le nom doit comporter au moins 2 caractères.",
        "any.required": "Le nom du club est requis."
      }),

    ville: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        "string.empty": "La ville est obligatoire.",
        "any.required": "La ville est requise."
      }),

    adresse: Joi.string()
      .allow(null, "")
      .max(255)
      .messages({
        "string.max": "L’adresse ne doit pas dépasser 255 caractères."
      }),

    CP: Joi.number()
      .integer()
      .min(1000)
      .max(99999)
      .required()
      .messages({
        "number.base": "Le code postal doit être un nombre.",
        "number.min": "Le code postal doit comporter au moins 4 chiffres.",
        "number.max": "Le code postal ne doit pas dépasser 5 chiffres.",
        "any.required": "Le code postal est requis."
      }),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "L’email doit être valide.",
        "any.required": "L’email du club est requis."
      }),

    dateAffiliation: Joi.date()
      .required()
      .messages({
        "date.base": "La date d’affiliation doit être une date valide.",
        "any.required": "La date d’affiliation est requise."
      })
  });

  // ✅ Schéma de mise à jour (tous les champs optionnels)
  const clubUpdate = Joi.object({
    nom: Joi.string().min(2).max(100),
    ville: Joi.string().min(2).max(100),
    adresse: Joi.string().allow(null, "").max(255),
    CP: Joi.number().integer().min(1000).max(99999),
    email: Joi.string().email({ tlds: { allow: false } }),
    dateAffiliation: Joi.date()
  });

  return {
    clubCreate: clubCreate.validate(body, { abortEarly: false }),
    clubUpdate: clubUpdate.validate(body, { abortEarly: false })
  };
}
