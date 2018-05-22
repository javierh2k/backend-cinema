import { Entity, Column } from 'typeorm'
import { Base } from './Base'

@Entity('Movies')
export class Movie extends Base {
  @Column()
    date: Date

  @Column()
    languaje: string
}
