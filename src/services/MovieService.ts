import * as R from 'ramda'
import { Movie } from '../models/Movie'
import { ICreateMovie, IUpdateMovie, IDeleteMovie } from '../interfaces/IMovie'
import { MovieRepository } from '../repositories/MovieRepository'
import { ObjectID } from 'mongodb'
import { getCustomRepository } from 'typeorm';

import * as fs from 'fs'

export class MovieService {
  private movieRepository: MovieRepository;

  constructor () { 
    this.movieRepository = getCustomRepository(MovieRepository);
  }

  async _findAll (query: any): Promise<any> {
      const Movies = await this.movieRepository.findAll()
      return { data: Movies }
  }

  async _findOneById (id: string): Promise<any> {
      const Movie = await this.movieRepository.findById(id)
      const data = R.omit(['createdAt'], Movie);
      return { data }
  }

  async _create (movie: ICreateMovie, file: any): Promise<any> {
    const data = await this.movieRepository.save(movie)

    fs.writeFile(`${process.cwd()}/photos/${movie.id.toString()}.jpg`,file.buffer,'binary', (err) => {
      if (err) {
        console.log(err)
        throw new Error('Fail to upload file')
      }
      console.log('The file was saved!')
    })
    return { data }
  }

  async _update (MovieData: IUpdateMovie, file: any): Promise<any> {
    const Movie: Movie = await this.movieRepository.findById(MovieData.id)
    if (R.isEmpty(Movie)) {
      throw new Error(`Movie with id '${MovieData.id}' not found`)
    }

    const updateData = R.compose(R.mergeDeepRight(Movie), R.omit('id'))
    const data = await this.movieRepository.save(updateData(MovieData))
    if (file) {
      fs.writeFile(`${process.cwd()}/photos/${MovieData.id.toString()}.jpg`,file.buffer,'binary', (err) => {
        if (err) {
          console.log(err)
          throw new Error('Fail to upload file')
        }
        console.log('The file was saved!')
      })

    }

    return { data }
  }

  async _delete ({ id }: IDeleteMovie): Promise<any> {
    const Movie: Movie = await this.movieRepository.findOne(new ObjectID(id));
    if (R.isEmpty(Movie)) {
      throw new Error(`Movie with id '${id}' not found`)
    }
    await this.movieRepository.remove(Movie);
    return { id }
  }

}
