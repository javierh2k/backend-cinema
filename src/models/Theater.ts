import { Entity, Column } from 'typeorm'
import { Movie } from './Movie'
import { Base } from './Base'

@Entity('Theaters')
export class Theater extends Base {
  @Column()
  location: string

  @Column()
  movies: Movie[]
}
