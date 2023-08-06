import { container } from "tsyringe"
import type { IApplication } from "@/cores/Application"

import CobaRepository from "@/applications/coba/repositories/CobaRepository"
import CobaService from "@/applications/coba/services/CobaService"
import AnotherCoolService from "@/applications/coba/services/AnotherCoolService"

export default function( application?: IApplication ){
    /**
     * REGISTER REPOSITORIES
     */
    container.register("ICobaRepository", { useClass: CobaRepository })

    /**
     * REGISTER SERVICES
     */
    // container.register("ICobaService", { useClass: CobaService })
    container.register("ICobaService", { useClass: AnotherCoolService })
}