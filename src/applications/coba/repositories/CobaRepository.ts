import type { ICobaRepository } from '../types'

export default class CobaRepository implements ICobaRepository{
    create( data : Record<string, any> ){
        return { ...data }
    }
}