function env<T>( variableName: string, defaultValue?: T ): T{
    if( process.env?.[variableName] ){
        return process.env[variableName] as T
    }

    if( defaultValue ) return defaultValue

    throw new Error(`environment variable ${variableName} not found`)
}

export default env