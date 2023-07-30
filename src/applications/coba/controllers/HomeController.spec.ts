import request from 'supertest'
import application from "../../../index"

describe("HomeController test sequence", function(){
    it("GET '/'", async function(){
        const response = await request(application.getInstance()).get("/")
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("hello world")
    })

    it("POST '/'", async function(){
        const person: Record<string,string> = {
            name : "john doe",
            gender : "MALE"
        }

        const response = await request(application.getInstance())
            .post("/")
            .field("name", person.name)
            .field("gender", person.gender)

        for( let key of Object.keys(person) ){
            expect(response.body.detail[key]).toEqual(person[key])
        }
    })

    it("PUT '/:id'", async function(){
        const id = 2
        const person: Record<string,string> = {
            name : "john doe",
            gender : "MALE"
        }

        const response = await request(application.getInstance())
            .put(`/${id}`)
            .field("name", person.name)
            .field("gender", person.gender)

        for( let key of Object.keys(person) ){
            expect(response.body.detail[key]).toEqual(person[key])
        }

        expect(response.body.message).toEqual(`data berhasil diubah id(${id})`)
    })

    it("DELETE '/:id'", async function(){
        const id = 2

        const response = await request(application.getInstance())
            .delete(`/${id}`)

        expect(response.body.message).toEqual(`data berhasil dihapus id(${id})`)
    })
})

afterAll(( done ) => {
    application.close()
    done()
})
