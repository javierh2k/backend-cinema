import {
    JsonController, Delete, Param, Post, Patch, Get, Body, UploadedFile, QueryParams, UseBefore, Params
} from 'routing-controllers'
import { celebrate, Joi } from 'celebrate'
import * as bodyParser from 'body-parser'
import * as R from 'ramda';
import * as Boom from 'boom';
import { MovieService } from '../services/MovieService'
import { ICreateMovie, IUpdateMovie, IDeleteMovie } from '../interfaces/IMovie'
import * as requestSchemas from '../schemas/request/movie'
import { IFile } from '../interfaces/IFile';

const getBoomError = Boom.boomify
const throwBoomError = R.compose(Promise.reject, getBoomError)

const idRegExp = '([0-9a-f]{24})$'
const isReallyEmpty = R.anyPass([R.isNil, R.isEmpty])

@JsonController('/movies')
export class MovieController extends MovieService {

  constructor () {
    super()
  }

  @Post('/')
  async create (
    @Body() movie: ICreateMovie, @UploadedFile('file', { required: true }) file: IFile): Promise<any> {
    await Joi.validate(movie, requestSchemas.create.body)
    return this._create(movie, file)
      .catch(throwBoomError)
  }

  @Patch('/:id')
  async update (
      @Params() id: string, @Body() movie: IUpdateMovie,@UploadedFile('file', { required: false }) file: IFile): Promise<any> {
    await Joi.validate(movie, requestSchemas.update.body)
    return this._update(R.merge(movie, id), file)
          .catch(throwBoomError)
  }

  @Delete('/:id')
    @UseBefore(bodyParser.json(), celebrate(requestSchemas.remove))
    delete (@Params() Movie: IDeleteMovie): Promise<any> {
    return this._delete(Movie)
            .catch(throwBoomError)
  }

  @Get('/')
    @UseBefore(bodyParser.json(), celebrate(requestSchemas.findAll))
    findAll (@QueryParams() query: any): Promise<any> {
    return this._findAll(query)
            .catch(throwBoomError)
  }

  @Get(`/:id${idRegExp}`)
    @UseBefore(bodyParser.json(), celebrate(requestSchemas.findOneById))
    findOneById (@Param('id') id: string): Promise<any> {
    return this._findOneById(id)
            .catch(throwBoomError)
  }

}
