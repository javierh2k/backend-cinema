import { EntityRepository, Repository } from 'typeorm'
import * as R from 'ramda'
import { ObjectID } from 'mongodb'
import { Theater } from '../models/Theater'

const toString = obj => obj.toString()
const objectIdToString = R.evolve({ id: toString })
const objectIdsToString = R.map(objectIdToString)

@EntityRepository(Theater)
export class TheaterRepository extends Repository<Theater> {

  getCount (): Promise<number> {
    return this.count();
  }

  findAll (): Promise<Theater[]> {
      return this.find().then(objectIdsToString)
  }

  findOneById (id: string): Promise<Theater> {
      return super.findOneById(new ObjectID(id))
            .then(objectIdToString)
  }

  findById (id: string): Promise<Theater> {
      return this.findOneById(id)
  }

  async save<Theater> (entity: any): Promise<Theater> {
      const Theater = entity
      Theater.id = new ObjectID(Theater.id)
      const TheaterCreated = await super.save(Theater)
      return objectIdToString(TheaterCreated)
  }

}
