export interface IMovie {
  id?: string
  name: string
  date: string
  languaje: string
}

export interface ICreateMovie extends IMovie {
  createdAt?: Date
}

export interface IUpdateMovie extends IMovie {

}

export interface IDeleteMovie {
  id: string
}
