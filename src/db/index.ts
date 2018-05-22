import { createConnection } from 'typeorm'

let db
export const initDatabaseConnection = async (): Promise<any> => {
  if (!db) {

      db = await createConnection({
          type: 'mongodb',
          url: process.env.CINEMA_URI,
          entities: [`${__dirname}/../models/*{.js,.ts}`],
          synchronize: false,
          logging: ['error']
        })
    }

  return db
}
