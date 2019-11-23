const request = require('supertest')
const app = require('../index')
const db = require('../db/models/index')
describe('Customer Endpoints', () => {
    it('should create a new customer', async () => {
        const res = await request(app)
            .post('/api/v1/customers')
            .send({
                NAME: "Test",
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body.message).toEqual("Customer Created")
        const customer = await db.Customer.findOne({where:{id: res.body.data.id}})
        expect(customer).not.toBeNull()
        expect(customer.NAME).toEqual("Test")
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
            let customer = await db.Customer.findOne({where:{ id: customerRes.body.data.id}})
            expect(customer.NAME).toEqual("Test2")
        })

        it('should delete customer', async () => {
            const res = await request(app)
                .delete(`/api/v1/customers/${customerRes.body.data.id}`)
                .send({
                    NAME: "Test",
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body.message).toEqual("Customer deleted")
            expect(res.body).toHaveProperty('data')
            let customer = await db.Customer.findOne({where:{ id: customerRes.body.data.id}})
            expect(customer).toBeNull()
        })
    })

    describe('Customer doesnt exists', () => {
        it('should not get a customer', async () => {
            const res = await request(app)
                .get('/api/v1/customers/999')
                .send()
            expect(res.statusCode).toEqual(404)
            expect(res.body.message).toEqual("Customer not found")
        })

        it('should update a customer', async () => {
            const res = await request(app)
                .put(`/api/v1/customers/999`)
                .send({
                    NAME: "Test2",
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body.message).toEqual("Customer not found")
        })

        it('should delete customer', async () => {
            const res = await request(app)
                .delete('/api/v1/customers/999')
                .send({
                    NAME: "Test",
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body.message).toEqual("Customer not found")
        })
    })
})

describe('Address Endpoints', () => {
    let customerRes = null
    beforeEach(async () => {
        customerRes = null
        customerRes = await request(app)
            .post('/api/v1/customers')
            .send({
                NAME: "Test",
            })
    })
    it('should create a new address', async () => {
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
        const address = await db.Customer_Addresses.findOne({where:{id: res.body.data.id}})
        expect(address).not.toBeNull()
        expect(address.STREET_ADDRESS).toEqual("Test")
    })

    describe('address exists', () => {
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
            console.log(JSON.stringify(customerRes.body))
            console.log(JSON.stringify(addressesRes.body))
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
            const address = await db.Customer_Addresses.findOne({where:{id: addressesRes.body.data.id}})
            expect(address.STREET_ADDRESS).toEqual("Test2")
        })

        it('should delete address', async () => {
            const res = await request(app)
                .delete(`/api/v1/customers/${customerRes.body.data.id}/addresses/${addressesRes.body.data.id}`)
                .send()
            expect(res.statusCode).toEqual(200)
            expect(res.body.message).toEqual("Address deleted")
            expect(res.body).toHaveProperty('data')
            const address = await db.Customer_Addresses.findOne({where:{id: addressesRes.body.data.id}})
            expect(address).toBeNull()
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

        it('should not get an address', async () => {
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