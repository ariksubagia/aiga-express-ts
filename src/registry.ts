import { IApplication } from "./cores/Application";
import cobaProvider from "@/applications/coba/provider"

export default function( application: IApplication ){
    //apply providers
    cobaProvider(application)
}