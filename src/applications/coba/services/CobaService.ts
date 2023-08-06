import { injectable, inject } from "tsyringe";
import type { ICobaService, ICobaRepository } from "@/applications/coba/types";

/**
 * Services should used to handle application logic,
 * avoid using direct interaction with 3rd party here as much as possible.
 * all service should have an interface.
 * register service in provider.ts then call service using dependency injector in any file
 */

@injectable()
export default class CobaService implements ICobaService{
    constructor(
        @inject("ICobaRepository") private readonly cobaRepo: ICobaRepository
    ){}

    createCoba(data: Record<string, any>){
        return this.cobaRepo.create(data)
    }
}