import { injectable, inject } from 'tsyringe'
import knex from 'knex'

interface IDatabase{
    instance(): void
}

export type ConnectionConfig = {
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

    constructor(@inject('ConnectionConfig') private readonly config: ConnectionConfig){
        this.db = knex(this.config)
    }

    instance(){
        return this.db
    }
}