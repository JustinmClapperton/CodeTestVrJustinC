
let db = require('../db/models/index')

class CustomerService {
    static async getCustomers() {
        try {
            return await db.Customer.findAll({
                include: [
                    {
                        model: db.Customer_Addresses,
                        as: 'Address'
                    },
                ]
            });
        } catch (error) {
            throw error;
        }
    }

    static async addCustomer(newCustomer) {
        try {
            return await db.Customer.create(newCustomer, {
                include: [
                    {
                        model: db.Customer_Addresses,
                        as: 'Address'
                    },
                ]
            });
        } catch (error) {
            throw error;
        }
    }

    static async updateCustomer(id, updateCustomer) {
        try {
            const customerToUpdate = await db.Customer.findOne({
                where: { id: Number(id) },
                include: [
                    {
                        model: db.Customer_Addresses,
                        as: 'Address'
                    },
                ]
            });

            if (customerToUpdate) {
                await db.Customer.update(updateCustomer, { where: { id: Number(id) } });

                return updateCustomer;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getACustomer(id) {
        try {
            return await db.Customer.findOne({
                where: {
                    id: Number(id),
                },
            });
        } catch (error) {
            throw error;
        }
    }

    static async deleteCustomer(id) {
        try {
            const CustomerToDelete = await db.Customer.findOne({ where: { id: Number(id) } });

            if (CustomerToDelete) {
                return await db.Customer.destroy({
                    where: { id: Number(id) }
                });
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CustomerService