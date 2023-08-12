import env from './utils/env'
import type { ConnectionConfig } from './cores/Database'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

let denv = dotenv.config()
dotenvExpand.expand(denv)

export default Object.freeze({
    siteTitle: 'site title',
    db: {
        default : ({
            client: 'pg',
            host: env('DB_HOST', 'localhost'),
            port: env<number>('DB_PORT', 5432),
            username: env('DB_USERNAME'),
            password: env('DB_PASSWORD'),
            database : env('DB_NAME')
        }) satisfies ConnectionConfig,
        testing: {
            client: '',
            host: '',
            port: '',
            username: '',
            password: '',
            database : ''
        }
    }
})