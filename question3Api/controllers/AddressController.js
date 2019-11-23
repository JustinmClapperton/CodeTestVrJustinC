let AddressService = require('../services/AddressService')
let ControllerBase = require('./ControllerBase')

class AddressController extends ControllerBase{

    async getAddresses(req, res) {
        const { customerId } = req.params
        try {
            const allAddresses = await AddressService.getAddresses(customerId);
            if (allAddresses.length > 0) {
                return this.sendSuccess(200, 'Addresses', res, allAddresses)
            } else {
                return this.sendSuccess(200, 'No Addresses', res)
            }
        } catch (error) {
            return this.sendError(400, error.message, res)
        }
    }

    async createAddress(req, res) {
        const { customerId } = req.params
        if (!req.body.STREET_ADDRESS || !req.body.COUNTRY || !req.body.POSTAL_CODE) {
            return this.sendError(400, 'Please provide all address fields', res);
        }
        const newAddress = req.body;
        newAddress.CUSTOMER_ID = customerId
        try {
            const createdAddress = await AddressService.createAddress(newAddress);
            return this.sendSuccess(201, 'Address Created', res, createdAddress);
        } catch (error) {
            return this.sendError(400, error.message, res)
        }
    }

    async updatedAddress(req, res) {
        const alteredAddress = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            return this.sendError(400, 'Invalid ID', res)
        }
        try {
            const updateAddress = await AddressService.updateAddress(id, alteredAddress);
            if (!updateAddress) {
                return this.sendError(404, 'Address not found', res)
            } else {
                return this.sendSuccess(200, 'Address updated', res, updateAddress)
            }
        } catch (error) {
            return this.sendError(400, error.message, res)
        }
    }

    async getAddress(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            return this.sendError(400, 'Invalid ID', res)
        }

        try {
            const theAddress = await AddressService.getAddress(id);

            if (!theAddress) {
                return this.sendError(404, 'Address not found', res)
            } else {
                return this.sendSuccess(200, 'Address found', res, theAddress)
            }
        } catch (error) {
            return this.sendError(400, error.message, res)
        }
    }

    async deleteAddress(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            return this.sendError(400, 'Invalid ID', res)
        }

        try {
            const AddressToDelete = await AddressService.deleteAddress(id);

            if (AddressToDelete) {
                return this.sendSuccess(200, 'Address deleted', res)
            } else {
                return this.sendError(404, 'Address not found', res)
            }
        } catch (error) {
            return this.sendError(400, error.message, res)
        }
    }
}

module.exports = AddressController