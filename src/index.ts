import 'dotenv/config'
import CardsOrm from './CardsOrm'
import { InitType } from './db/enums/InitType'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

/**
 *
 * Once it is possible to bundle this project inside a Wrangler project, remove the node server and export the orm directly.
 *
 * export const cardsOrm = new CardsOrm({ databaseUrl })
 *
 */

const databaseUrl = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`

export const cardsOrm = new CardsOrm({ databaseUrl })

cardsOrm.sync(InitType.RESET).then(() => {
    const PORT = 5555

    const app = express()

    app.use(cors())

    app.use(bodyParser.json({ limit: '1mb' }))
    app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))

    app.get('/users', async (_req, res) => {
        const users = await cardsOrm.getAll()

        res.json({
            users
        })
    })

    app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))
})