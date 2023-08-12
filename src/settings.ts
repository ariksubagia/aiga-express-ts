import env from '@/utils/env'

export default Object.freeze({
    siteTitle: 'site title',
    db: {
        default: {
            client: 'pg',
            host: env('DB_HOST', 'localhost'),
            port: env('DB_PORT', 5432),
            username: env('DB_USERNAME'),
            password: env('DB_PASSWORD'),
            database : env('DB_NAME')
        },
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