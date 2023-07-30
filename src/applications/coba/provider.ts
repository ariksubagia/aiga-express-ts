import { container } from "tsyringe"
import { IApplication } from "@/cores/Application"
import CobaService from "@/applications/coba/services/CobaService"
import AnotherCoolService from "@/applications/coba/services/AnotherCoolService"
import HomeController from '@/applications/coba/controllers/HomeController'

export default function( application: IApplication ){
    // container.register("ICobaService", { useClass: CobaService })
    container.register("ICobaService", { useClass: AnotherCoolService })

    //register controllers
    application.registerController(HomeController)
}