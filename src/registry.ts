import { IApplication } from "./cores/Application";
import cobaApplication from "@/applications/coba/app"

/**
 * Place to introduce each application that already made in "applications" folder
 * each aplication require "app.ts" file that should accept IApplication as parameter type
 */
export default function( application: IApplication ){
    //apply providers
    cobaApplication(application)
}