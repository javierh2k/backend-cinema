import { ObjectIdColumn, Column, CreateDateColumn } from 'typeorm'

export class Base {
  @ObjectIdColumn({ name: '_id' })
    id: string

  @Column()
    name: string

  @CreateDateColumn({ type: 'datetime' })
    createdAt: Date

}
