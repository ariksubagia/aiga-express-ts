// import { 
//     container,
//     isValueProvider,
//     isClassProvider,
//     isFactoryProvider,
//     isTokenProvider
// } from "tsyringe"

// import type { 
//     InjectionToken, 
//     TokenProvider, 
//     ClassProvider, 
//     ValueProvider, 
//     FactoryProvider, 
//     RegistrationOptions 
// } from "tsyringe"


// class DependencyInjector{
//     static register<T>(token: InjectionToken<T>, provider: ValueProvider<T>, options?: RegistrationOptions): void
//     static register<T>(token: InjectionToken<T>, provider: FactoryProvider<T>, options?: RegistrationOptions): void
//     static register<T>(token: InjectionToken<T>, provider: ClassProvider<T>, options?: RegistrationOptions): void
//     static register<T>(token: InjectionToken<T>, provider: TokenProvider<T>, options?: RegistrationOptions): void{
//         if( isValueProvider(provider) )
//             container.register<T>(token, provider)
//     }

//     static registerSingleton<T>(from: InjectionToken<T>, to: InjectionToken<T>){
//         container.registerSingleton<T>(from, to)
//     }

//     static resolve<T>(token: InjectionToken<T>){
//         return container.resolve<T>(token)
//     }
// }