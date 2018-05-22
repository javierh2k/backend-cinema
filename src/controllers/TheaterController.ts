import {
    JsonController, Delete, Param, Post, Patch, Get, Body, UploadedFile, QueryParams, UseBefore, Params
} from 'routing-controllers'
import { celebrate } from 'celebrate'
import * as bodyParser from 'body-parser'
import * as R from 'ramda';
import * as Boom from 'boom';
import { TheaterService } from '../services/TheaterService'
import { ICreateTheater, IUpdateTheater, IDeleteTheater } from '../interfaces/ITheater'
import * as requestSchemas from '../schemas/request/theater'
import { IFile } from '../interfaces/IFile';

const getBoomError = Boom.boomify
const throwBoomError = R.compose(Promise.reject, getBoomError)

const idRegExp = '([0-9a-f]{24})$'

@JsonController('/theaters')
export class TheaterController extends TheaterService{

  constructor () {
    super();
   }

  @Post('/')
  create (
      @UseBefore(bodyParser.json(), celebrate(requestSchemas.create))
      @Body() Theater: ICreateTheater, @UploadedFile('file', { required: false }) file: IFile): Promise<any> {
          return this._create(Theater, file)
                .catch(throwBoomError)
  }

  @Patch('/:id')
  @UseBefore(bodyParser.json(), celebrate(requestSchemas.update))
  update(
      @Params() id: string, @Body() theater: IUpdateTheater,@UploadedFile('file', { required: false }) file: IFile ): Promise<any> {
        console.log(id);
        return this._update(R.merge(theater, id), file)
          .catch(throwBoomError);
  }

  @Delete('/:id')
    @UseBefore(bodyParser.json(), celebrate(requestSchemas.remove))
    delete (@Params() Theater: IDeleteTheater): Promise<any> {
      return this._delete(Theater)
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
      return this.findOneById(id)
            .catch(throwBoomError)
  }

}
