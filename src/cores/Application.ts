import { autoInjectable, container } from 'tsyringe'
import express from 'express'
import type { Express, Request, Response, NextFunction, Handler, Router } from 'express'

export interface IApplication{
    run: () => void
    registerController: (controller: any ) => void
    getInstance : () => Express
    getInfoRoutes: () => Array<{ route: string, handler: string }>
}

export interface IController{}

export interface IService{}

export interface IRepository{}

export interface IMiddleware{
    ( req: Request, res: Response, next: NextFunction ) : void
}

export interface IRouteBase{
    baseRoute: string | symbol,
    middlewares: IMiddleware[]
}

export interface IRoute{
    method: string
    handler: string | symbol
    route: string
    middlewares: IMiddleware[]
}

enum metakeys{
    ROUTERS = "__routers",
    BASE_ROUTE = "__base_route"
}

export enum RouteMethods{
    GET = "get",
    POST = "post",
    PUT = "put",
    PATCH = "patch",
    DELETE = "delete"
}

@autoInjectable()
class Application implements IApplication{
    private controllers: Array<any> = []
    private instance: Express
    private infoRoutes: Array<{ method: string, route: string, handler: string }> = []
    private server: any

    private exec(){        
        this.instance = express()
        this.instance.use(express.urlencoded({ extended: true }))
        this.instance.use(express.json())
    }

    private applyControllers(){
        const vm = this
        
        if( this.controllers.length <= 0 ) return

        for( let controller of vm.controllers ){
            let base: IRouteBase = Reflect.getMetadata(metakeys.BASE_ROUTE, controller)
            let routes: IRoute[] = []

            if( !Reflect.hasMetadata(metakeys.ROUTERS, controller) ) continue

            routes = Reflect.getMetadata(metakeys.ROUTERS, controller)

            if( routes.length <= 0 ) continue

            const router: { [handlerName: string] : any } = express.Router()
            base.middlewares.forEach((middleware: IMiddleware) => {
                router.use(middleware)
            })
            
            const controllerInstance: { [handleName: string]: Handler } = container.resolve(controller)
            for( let route of routes ){
                router[route.method](
                    route.route, 
                    route.middlewares, 
                    controllerInstance[String(route.handler)].bind(controllerInstance)
                )

                vm.infoRoutes.push({
                    method: route.method,
                    route: `${String(base.baseRoute)}${route.route == "/" ? "" : route.route}`,
                    handler: `${controller.name}.${String(route.handler)}`
                })
            }

            vm.instance.use(String(base.baseRoute), base.middlewares , router as Router)
        }
    }

    public registerController(controller: any): void{
        const vm = this
        vm.controllers.push(controller)
    }

    public run(beforeRun: Function | undefined = undefined){
        const vm = this
        vm.exec()

        let bootstrapAfter: Function | undefined = undefined

        if(beforeRun){
            bootstrapAfter = beforeRun(vm)
        }

        vm.applyControllers()

        if( bootstrapAfter ){
            bootstrapAfter()
        }

        const PORT = 3000
        vm.server = vm.instance.listen(PORT, function(){
            console.log(`server started on port ${PORT}`)
        })

        return vm
    }

    public close(){
        this.server.close()
    }

    public getInstance() : Express{
        return this.instance
    }

    public getInfoRoutes(){
        return this.infoRoutes
    }
}

function Controller(baseRoute: string, middlewares: Array<IMiddleware> = []): ClassDecorator{
    return function(target: any){
        const base: IRouteBase = {
            baseRoute,
            middlewares
        }

        Reflect.defineMetadata(metakeys.BASE_ROUTE, base , target)
    }
}

function ControllerRouteFactory( routeMethod : RouteMethods ){
    return function(route: string, middlewares: Array<IMiddleware> = []) : MethodDecorator{
        return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
            const controller = target.constructor
            let routes : IRoute[] = []

            if( Reflect.hasMetadata(metakeys.ROUTERS, controller) ){
                routes = Reflect.getMetadata(metakeys.ROUTERS, controller)
            }

            routes.push({
                method: routeMethod,
                handler: propertyKey,
                middlewares,
                route,
            })

            Reflect.defineMetadata(metakeys.ROUTERS, routes, controller)
        }
    }
}

Controller.GET = ControllerRouteFactory(RouteMethods.GET)
Controller.POST = ControllerRouteFactory(RouteMethods.POST)
Controller.PUT = ControllerRouteFactory(RouteMethods.PUT)
Controller.DELETE = ControllerRouteFactory(RouteMethods.DELETE)
Controller.PATCH = ControllerRouteFactory(RouteMethods.PATCH)

export default container.resolve(Application)

export {
    Controller
}