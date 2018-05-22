import { Theater } from '../entities/Theater'
import { Joi } from 'celebrate'

export const create = {
  body: Joi.object().keys(Theater)
        .requiredKeys([
          'name', 'location'
        ])
}

export const update = {
  params: Joi.object().keys({
      id: Joi.required()
    }),
  body: Joi.object().keys(Theater)
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
      location: Joi
            .string()
            .optional()
            .description('filter by location')
            .example('suba'),
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

export const findByLocation = {
  query: {
    location: Joi
            .string()
            .optional()
            .description('filter by location')
            .example('Suba')
  }
}
