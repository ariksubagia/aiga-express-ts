import { IApplication } from "./cores/Application";
import cobaProvider from "@/applications/coba/provider"

/**
 * Place to introduce each application that already made in "applications" folder
 * each aplication require "provider.ts" file that should accept IApplication as parameter type
 */
export default function( application: IApplication ){
    //apply providers
    cobaProvider(application)
}