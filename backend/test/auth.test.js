const request = require('supertest');
const app = require("../server")

describe('Login test ', ()=>{
    it('Check if email exist or not',async() =>{
        const res = await request(app).post('/api/auth/login').send({
            email: "test@gmail.com",
            password: "test",
            
        })
        expect(res.statusCode).toBe(403)
    })

    it('Check if password incorect',async() =>{
        const res = await request(app).post('/api/auth/login').send({
            email: "f.c.b.mohamed@live.fr",
            password: '12&é"&é"3123',
            
        })
        expect(res.statusCode).toBe(401)
    })

    it('Check if email is valideted or not ',async() =>{
        const res = await request(app).post('/api/auth/login').send({
            email: "dardarkom@live.fr",
            password: '123123',
            
        })
        expect(res.statusCode).toBe(405)
    })

    it('Check if jwt token got generate  ',async() =>{
        const res = await request(app).post('/api/auth/login').send({
            email: "f.c.b.mohamed@live.fr",
            password: '123123',
            
        })
        expect(res.statusCode).toBe(201)
    })
    
})
 