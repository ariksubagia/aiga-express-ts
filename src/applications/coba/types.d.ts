export interface ICobaRepository{
    create: (data: Record<string, any>) => Record<string, any>
}

export interface ICobaService{
    createCoba : (data: Record<string, any>) => Record<string,any>
}