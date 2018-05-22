import { Joi } from 'celebrate'

export const Movie = {
  id: Joi.string().optional(),
  name: Joi.string().optional(),
  date: Joi.date().optional(),
  languaje: Joi.string().optional()
}
