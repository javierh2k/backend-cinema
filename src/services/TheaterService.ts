import * as R from 'ramda'
import { Theater } from '../models/Theater'
import { ICreateTheater, IUpdateTheater, IDeleteTheater } from '../interfaces/ITheater'
import { TheaterRepository } from '../repositories/TheaterRepository'
import { ObjectID } from 'mongodb'
import { getCustomRepository } from 'typeorm';

export class TheaterService {
  private theaterRepository: TheaterRepository;

  constructor () { 
    this.theaterRepository = getCustomRepository(TheaterRepository);
  }

  async _findAll (query: any): Promise<any> {
      const Theaters = await this.theaterRepository.findAll()
      return { data: Theaters }
  }

  async findOneById (id: string): Promise<any> {
      const Theater = await this.theaterRepository.findById(id)
      const data = R.omit(['createdAt'], Theater);
      return { data }
  }

  async _create (Theater: ICreateTheater, file: any): Promise<any> {
      const data = await this.theaterRepository.save(Theater)
      return { data }
  }

  async _update (TheaterData: IUpdateTheater, file: any): Promise<any> {
      const Theater: Theater = await this.theaterRepository.findById(TheaterData.id)
      if (R.isEmpty(Theater)) {
          throw new Error(`Theater with id '${TheaterData.id}' not found`)
      }

      const updateData = R.compose(R.mergeDeepRight(Theater), R.omit('id'))
      const data = await this.theaterRepository.save(updateData(TheaterData))
      return { data }
  }

  async _delete ({ id }: IDeleteTheater): Promise<any> {
      const Theater: Theater = await this.theaterRepository.findOne(new ObjectID(id));
      if (R.isEmpty(Theater)) {
          throw new Error(`Theater with id '${id}' not found`)
      }
      await this.theaterRepository.remove(Theater);
      return { id };
  }

}
