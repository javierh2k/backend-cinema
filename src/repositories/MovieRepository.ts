import { EntityRepository, Repository } from 'typeorm'
import * as R from 'ramda'
import { ObjectID } from 'mongodb'
import { Movie } from '../models/Movie'

const toString = obj => obj.toString()
const objectIdToString = R.evolve({ id: toString })
const objectIdsToString = R.map(objectIdToString)

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {

  getCount (): Promise<number> {
    return this.count();
  }

  findAll (): Promise<Movie[]> {
      return this.find().then(objectIdsToString)
  }

  findOneById (id: string): Promise<Movie> {
      return super.findOneById(new ObjectID(id))
            .then(objectIdToString)
  }

  findById (id: string): Promise<Movie> {
      return this.findOneById(id)
  }

  async save<Movie> (entity: any): Promise<Movie> {
      const Movie = entity
      Movie.id = new ObjectID(Movie.id)
      const MovieCreated = await super.save(Movie)
      return objectIdToString(MovieCreated)
  }

}
