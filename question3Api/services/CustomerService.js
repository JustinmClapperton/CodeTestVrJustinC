
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
                let update = {
                    NAME: updateCustomer.NAME ? updateCustomer.NAME : customerToUpdate.NAME ,
                }
                if (updateCustomer.Address) {
                    update.Address = {
                        STREET_ADDRESS: updateCustomer.Address && updateCustomer.Address.STREET_ADDRESS ? updateCustomer.Address.STREET_ADDRESS : customerToUpdate.Address.STREET_ADDRESS,
                        POSTAL: updateCustomer.Address && updateCustomer.Address.POSTAL ? updateCustomer.Address.POSTAL : customerToUpdate.Address.POSTAL,
                        COUNTRY: updateCustomer.Address && updateCustomer.Address.COUNTRY ? updateCustomer.Address.COUNTRY : customerToUpdate.Address.COUNTRY
                    }
                }
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
            const theCustomer = await db.Customer.findOne({
                where: {
                    id: Number(id),
                },
                include: [
                    {
                        model: db.Customer_Addresses,
                        as: 'Address'
                    },
                ],
            });

            return theCustomer;
        } catch (error) {
            throw error;
        }
    }

    static async deleteCustomer(id) {
        try {
            const CustomerToDelete = await db.Customer.findOne({ where: { id: Number(id) } });

            if (CustomerToDelete) {
                const deletedCustomer = await db.Customer.destroy({
                    where: { id: Number(id) }
                });
                return deletedCustomer;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CustomerService