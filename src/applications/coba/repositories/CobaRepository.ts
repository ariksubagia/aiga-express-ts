import type { ICobaRepository } from '../types'

/**
 * Repository should be used to handle 3rd party interaction,
 * a repository often called between service and repository.
 * avoid putting application login in repository as possible.
 * avoid calling service in repository.
 * however, repository allowed to call other repository.
 * all repository should have an interface.
 * register repository in provider.ts then call repository using dependency injector in any file.
 */

export default class CobaRepository implements ICobaRepository{
    create( data : Record<string, any> ){
        return { ...data }
    }
}