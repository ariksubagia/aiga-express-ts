import 'reflect-metadata'
import { container } from 'tsyringe'
import provider from '../provider'
import type { ICobaService } from '../types'

describe("AnotherCoolService test sequence", function(){
    beforeAll(function(){
        provider()
    })

    it("'create' should @return object based on @params 'data'", function(){
        const service: ICobaService = container.resolve("ICobaService")
        const result = service.createCoba({
            'test_field' : 'test_value'
        })

        expect(result).toHaveProperty('test_field')
        expect(result?.test_field).toBe('test_value')
    })
})