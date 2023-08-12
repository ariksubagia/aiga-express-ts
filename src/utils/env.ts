export default function( variableName: string, defaultValue: string | number | undefined = undefined ){
    if( typeof process.env?.[variableName] !== 'undefined' ){
        return process.env[variableName]
    }

    return defaultValue
}