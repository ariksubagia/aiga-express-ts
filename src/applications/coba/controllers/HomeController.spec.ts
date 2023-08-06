import request from 'supertest'
// import application from "../../../index"

describe("HomeController test sequence", function(){
    const app = request("http://localhost:3000")

    it("GET '/'", async function(){
        const response = await app.get("/")
        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("hello world")
    })

    it("POST '/'", async function(){
        const person: Record<string,string> = {
            name : "john doe",
            gender : "MALE"
        }

        const response = await app
            .post("/")
            .field("name", person.name)
            .field("gender", person.gender)

        expect(response.statusCode).toEqual(200)

        for( let key of Object.keys(person) ){
            expect(response.body.detail[key]).toEqual(person[key])
        }
    })

    it("POST '/' should return validation error when has invalid input", async function(){
        const person: Record<string,string> = {
            name : "john doe",
            gender : "MALE"
        }

        const response = await app
            .post("/")
            .field("asd", person.name)
            .field("gender", person.gender)

        expect(response.statusCode).toEqual(400)
    })

    it("PUT '/:id'", async function(){
        const id = 2
        const person: Record<string,string> = {
            name : "john doe",
            gender : "MALE"
        }

        const response = await app
            .put(`/${id}`)
            .field("name", person.name)
            .field("gender", person.gender)

        expect(response.statusCode).toEqual(200)

        for( let key of Object.keys(person) ){
            expect(response.body.detail[key]).toEqual(person[key])
        }

        expect(response.body.message).toEqual(`data berhasil diubah id(${id})`)
    })

    it("DELETE '/:id'", async function(){
        const id = 2

        const response = await app
            .delete(`/${id}`)

        expect(response.statusCode).toEqual(200)

        expect(response.body.message).toEqual(`data berhasil dihapus id(${id})`)
    })
})

afterAll(( done ) => {
    // application.close()
    done()
})
