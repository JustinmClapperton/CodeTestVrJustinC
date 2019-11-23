
let db = require('../db/models/index')

class AddressService {
    static async getAddresses(customerId) {
        try {
            return await db.Customer_Addresses.findAll({
                where: {
                    CUSTOMER_ID: customerId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    static async createAddress(newAddress) {
        try {
            return await db.Customer_Addresses.create(newAddress);
        } catch (error) {
            throw error;
        }
    }

    static async updateAddress(id, updateAddress) {
        try {
            const AddressToUpdate = await db.Customer_Addresses.findOne({
                where: { id: Number(id) }
            });

            if (AddressToUpdate) {
                await db.Customer_Addresses.update(updateAddress, { where: { id: Number(id) } });

                return updateAddress;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getAddress(id) {
        try {
            return await db.Customer_Addresses.findOne({
                where: {
                    id: Number(id),
                }
            });
        } catch (error) {
            throw error;
        }
    }

    static async deleteAddress(id) {
        try {
            const AddressToDelete = await db.Customer_Addresses.findOne({ where: { id: Number(id) } });

            if (AddressToDelete) {
                return await db.Customer_Addresses.destroy({
                    where: { id: Number(id) }
                });
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AddressService