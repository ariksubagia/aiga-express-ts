import CobaRepository from "@/applications/repositories/CobaRepository";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export default class CobaService{
    constructor(private readonly cobaRepo: CobaRepository){}

    createCoba(data: Record<string, any>){
        return this.cobaRepo.create(data)
    }
}