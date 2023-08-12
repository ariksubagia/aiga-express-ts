import { injectable } from 'tsyringe'
import knex from 'knex'

interface IDatabase{
    instance(): void
}

type ConnectionConfig = {
    client: string,
    host: string,
    port: string | number,
    username: string,
    password: string,
    database: string
}

@injectable()
export default class Database implements IDatabase{
    private readonly db: any

    constructor(config: ConnectionConfig){
        this.db = knex(config)
    }

    instance(){
        return this.db
    }
}