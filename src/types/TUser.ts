import { Optional } from 'sequelize'

export type TUser = {
    id: number
    name: string
}

export type TUserCreationAttributes = Optional<TUser, 'id'>