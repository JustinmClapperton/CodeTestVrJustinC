let CustomerService = require('../services/CustomerService')
let ControllerBase = require('./ControllerBase')

class CustomerController extends ControllerBase{
    async getCustomers(req, res) {
        console.log(this)
        try {
            const allCustomers = await CustomerService.getCustomers();
            if (allCustomers.length > 0) {
                return this.sendSuccess(200, 'Customers', res, allCustomers)
            } else {
                return this.sendSuccess(200, 'No Customers', res)
            }
        } catch (error) {
            return this.sendError(400, error.message, res)
        }
    }

    async createCustomer(req, res) {
        if (!req.body.NAME) {
            return this.sendError(400, 'Please provide customers name', res);
        }
        const newCustomer = req.body;
        try {
            const createdCustomer = await CustomerService.addCustomer(newCustomer);
            return this.sendSuccess(201, 'Customer Created', res, createdCustomer);
        } catch (error) {
            return this.sendError(400, error.message, res)
        }
    }

    async updatedCustomer(req, res) {
        const alteredCustomer = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            return this.sendError(400, 'Invalid ID', res)
        }
        try {
            const updateCustomer = await CustomerService.updateCustomer(id, alteredCustomer);
            if (!updateCustomer) {
                return this.sendError(404, 'Customer not found', res)
            } else {
                return this.sendSuccess(200, 'Customer updated', res, updateCustomer)
            }
        } catch (error) {
            return this.sendError(400, error.message, res)
        }
    }

    async getCustomer(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            return this.sendError(400, 'Invalid ID', res)
        }

        try {
            const customer = await CustomerService.getACustomer(id);

            if (!customer) {
                return this.sendError(404, 'Customer not found', res)
            } else {
                return this.sendSuccess(200, 'Customer found', res, customer)
            }
        } catch (error) {
            return this.sendError(400, error.message, res)
        }
    }

    async deleteCustomer(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            return this.sendError(400, 'Invalid ID', res)
        }

        try {
            const CustomerToDelete = await CustomerService.deleteCustomer(id);

            if (CustomerToDelete) {
                return this.sendSuccess(200, 'Customer deleted', res)
            } else {
                return this.sendError(404, 'Customer not found', res)
            }
        } catch (error) {
            return this.sendError(400, error.message, res)
        }
    }
}

module.exports = CustomerController