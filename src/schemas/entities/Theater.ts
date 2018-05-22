import { Joi } from 'celebrate'

export const Theater = {
  id: Joi.string().optional(),
  name: Joi.string().optional(),
  location: Joi.string().optional(),
  movies: Joi.array().optional()
}
