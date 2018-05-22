import * as swaggerUi from 'swagger-ui-express'
import * as fs from 'fs'

const getJson = path => JSON.parse(fs.readFileSync(path, 'utf8'))

export const register = (server) => {
  const swaggerFile: any = getJson(`${process.cwd()}/swagger.json`)
  const packageFile: any = getJson(`${process.cwd()}/package.json`)

  swaggerFile.info = {
      title: packageFile.name,
      description: packageFile.description,
      version: packageFile.version
    }
  swaggerFile.host = `${process.env.HOST}:${process.env.SWAGGER_PORT}`
  swaggerFile.basePath = '/'

  server.use(
        '/documentation',
        swaggerUi.serve,
        swaggerUi.setup(swaggerFile)
    )

  return server
}
