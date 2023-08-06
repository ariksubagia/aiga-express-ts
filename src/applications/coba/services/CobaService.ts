import { injectable, inject } from "tsyringe";
import type { ICobaService, ICobaRepository } from "@/applications/coba/types";

@injectable()
export default class CobaService implements ICobaService{
    constructor(
        @inject("ICobaRepository") private readonly cobaRepo: ICobaRepository
    ){}

    createCoba(data: Record<string, any>){
        return this.cobaRepo.create(data)
    }
}