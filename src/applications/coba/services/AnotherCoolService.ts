import CobaRepository from "@/applications/coba/repositories/CobaRepository";
import { injectable } from "tsyringe";
import { ICobaService } from "../coba";

@injectable()
export default class AnotherCoolService implements ICobaService{
    constructor(private readonly cobaRepo: CobaRepository){}

    createCoba(data: Record<string, any>){
        return this.cobaRepo.create(data)
    }
}