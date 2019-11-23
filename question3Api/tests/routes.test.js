const request = require('supertest')
const app = require('../index')
describe('Customer Endpoints', () => {
    it('should create a new customer', async () => {
        const res = await request(app)
            .post('/api/v1/customers')
            .send({
                NAME: "Test",
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body.message).toEqual("Customer Created")
    })

    it('should get all customer', async () => {
        const res = await request(app)
            .get('/api/v1/customers')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual("Customers")
    })

    describe('Customer exists', () => {
        let customerRes = null
        beforeEach(async () => {
            customerRes = null
           customerRes = await request(app)
                .post('/api/v1/customers')
                .send({
                    NAME: "Test",
                })
        })
        it('should get a customer', async () => {
            const res = await request(app)
                .get('/api/v1/customers/1')
                .send()
            expect(res.statusCode).toEqual(200)
            expect(res.body.message).toEqual("Customer found")
            expect(res.body.data.NAME).toEqual('Test')
        })

        it('should update a customer', async () => {
            const res = await request(app)
                .put(`/api/v1/customers/${customerRes.body.data.id}`)
                .send({
                    NAME: "Test2",
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body.message).toEqual("Customer updated")
            expect(res.body.data.NAME).toEqual('Test2')
        })

        it('should delete customer', async () => {
            const res = await request(app)
                .delete('/api/v1/customers/1')
                .send({
                    NAME: "Test",
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body.message).toEqual("Customer deleted")
            expect(res.body).toHaveProperty('data')
        })
    })

    describe('Customer doesnt exists', () => {
        it('should not get a customer', async () => {
            const res = await request(app)
                .get('/api/v1/customers/1')
                .send()
            expect(res.statusCode).toEqual(404)
            expect(res.body.message).toEqual("Customer not found")
        })

        it('should update a customer', async () => {
            const res = await request(app)
                .put(`/api/v1/customers/99`)
                .send({
                    NAME: "Test2",
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body.message).toEqual("Customer not found")
        })

        it('should delete customer', async () => {
            const res = await request(app)
                .delete('/api/v1/customers/1')
                .send({
                    NAME: "Test",
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body.message).toEqual("Customer not found")
        })
    })
})

describe('Addresses Endpoints', () => {
    let customerRes = null
    beforeEach(async () => {
        customerRes = null
        customerRes = await request(app)
            .post('/api/v1/customers')
            .send({
                NAME: "Test",
            })
    })
    it('should create a new addresses', async () => {
        console.log(JSON.stringify(customerRes.body))
        const res = await request(app)
            .post(`/api/v1/customers/${customerRes.body.data.id}/addresses`)
            .send({
                STREET_ADDRESS: "Test",
                COUNTRY: "US",
                POSTAL_CODE: "12345",
            })
        console.log(JSON.stringify(res))
        expect(res.statusCode).toEqual(201)
        expect(res.body.message).toEqual("Address Created")
    })

    describe('addresses exists', () => {
        let addressesRes = null
        beforeEach(async () => {
            addressesRes = null
            addressesRes = await request(app)
                .post(`/api/v1/customers/${customerRes.body.data.id}/addresses`)
                .send({
                    STREET_ADDRESS: "Test",
                    COUNTRY: "US",
                    POSTAL_CODE: "12345",
                })
        })

        it('should get all addresses', async () => {
            const res = await request(app)
                .get(`/api/v1/customers/${customerRes.body.data.id}/addresses`)
                .send()
            expect(res.statusCode).toEqual(200)
            expect(res.body.message).toEqual("Addresses")
        })

        it('should get an address', async () => {
            const res = await request(app)
                .get(`/api/v1/customers/${customerRes.body.data.id}/addresses/${addressesRes.body.data.id}`)
                .send()
            expect(res.statusCode).toEqual(200)
            expect(res.body.message).toEqual("Address found")
            expect(res.body.data.STREET_ADDRESS).toEqual('Test')
        })

        it('should update an address', async () => {
            const res = await request(app)
                .put(`/api/v1/customers/${customerRes.body.data.id}/addresses/${addressesRes.body.data.id}`)
                .send({
                    STREET_ADDRESS: "Test2",
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body.message).toEqual("Address updated")
            expect(res.body.data.STREET_ADDRESS).toEqual('Test2')
        })

        it('should delete addresses', async () => {
            const res = await request(app)
                .delete(`/api/v1/customers/${customerRes.body.data.id}/addresses/${addressesRes.body.data.id}`)
                .send()
            expect(res.statusCode).toEqual(200)
            expect(res.body.message).toEqual("Address deleted")
            expect(res.body).toHaveProperty('data')
        })
    })

    describe('Address doesnt exists', () => {

        it('should get no addresses', async () => {
            const res = await request(app)
                .get(`/api/v1/customers/${customerRes.body.data.id}/addresses`)
                .send()
            expect(res.statusCode).toEqual(200)
            expect(res.body.message).toEqual("No Addresses")
        })

        it('should not get an addresses', async () => {
            const res = await request(app)
                .get(`/api/v1/customers/${customerRes.body.data.id}/addresses/99`)
                .send()
            expect(res.statusCode).toEqual(404)
            expect(res.body.message).toEqual("Address not found")
        })

        it('should update an address', async () => {
            const res = await request(app)
                .put(`/api/v1/customers/${customerRes.body.data.id}/addresses/99`)
                .send({
                    STREET_ADDRESS: "Test2",
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body.message).toEqual("Address not found")
        })

        it('should delete addresses', async () => {
            const res = await request(app)
                .delete(`/api/v1/customers/${customerRes.body.data.id}/addresses/99`)
                .send()
            expect(res.statusCode).toEqual(404)
            expect(res.body.message).toEqual("Address not found")
        })
    })
})