import { Movie } from '../entities/Movie'
import { Joi } from 'celebrate'

export const create = {
  body: Joi.object().keys(Movie)
        .requiredKeys([
          'name', 'date', 'languaje'
        ])
}

export const update = {
  params: Joi.object().keys({
      id: Joi.required()
    }),
  body: Joi.object().keys(Movie)
}

export const remove = {
  params: Joi.object().keys({
      id: Joi.required()
    })
}

export const findAll = {
  query: Joi.object().keys({
      page: Joi.number(),
      sort: Joi.string().regex(/^(?:asc|desc)$/),
      sortBy: Joi.string().optional(),
      limit: Joi
            .number()
            .optional()
            .description('limit results, by default 50 ')
            .example('50')
    })
}

export const findOneById = {
  params: Joi.object().keys({
      id: Joi.required()
    })
}
