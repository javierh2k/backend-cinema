import 'reflect-metadata'
import { useExpressServer } from 'routing-controllers'
import * as express from 'express'
import { errors } from 'celebrate'
import { register as registerSwagger } from './swagger'
import * as morgan from 'morgan'
import * as cors from 'cors'
import { initDatabaseConnection } from '../db'

const onError = port => (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') throw error
    /* tslint:disable */
    switch (error.code) {
        case 'EACCES':
            process.exit(1);
            break;
        case 'EADDRINUSE':
            process.exit(1);
            break;
        default:
            throw error;
    }
    /* tslint:enable */
}

export const initServer = async () => {
  await initDatabaseConnection()

  const app = express()

  registerSwagger(app)
  app.use(cors())

  useExpressServer(app, {
    controllers: [`${__dirname}/../controllers/*{.ts,.js}`]
  })
  app.use(express.static('photos'))
  app.use(errors())
  app.use(morgan('common'))
  
  return app
}

const port = process.env.PORT

export const startServer = async () => {
  const server = await initServer()

  server.listen(port)
  server.on('error', onError(port))
}
