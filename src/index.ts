import 'reflect-metadata'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import application from '@/cores/Application'
import bootstrap from '@/bootstrap'

let env = dotenv.config()
dotenvExpand.expand(env)

application.run(bootstrap)
export default application