import { IMovie } from './IMovie';

export interface ITheater {
    id: string
    name: string
    location: string
    movies: IMovie[]
  }
  
  export interface ICreateTheater extends ITheater {
    createdAt?: Date
  }
  
  export interface IUpdateTheater extends ITheater {

  }
  
  export interface IDeleteTheater {
    id: string
  }
  