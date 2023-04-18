import { ModelDefined } from 'sequelize'
import SequelizeOrm from './db/SequelizeOrm'
import { TSequelizeOrmProps } from './db/types/TSequelizeOrmProps'
import { TUser, TUserCreationAttributes } from './types/TUser'
import userModel from './models/user'

class CardsOrm extends SequelizeOrm {
    User: ModelDefined<TUser, TUserCreationAttributes>

    constructor(props: TSequelizeOrmProps) {
        super(props)

        this.User = this.sequelize.define('user', userModel)
    }

    _onSync(): void {
        this.User.create({ name: 'glencoden' })
            .then(result => console.log('created admin', result))
            .catch(err => console.log('error creating admin', err))
    }

    getAll() {
        return this.User.findAll()
    }
}

export default CardsOrm