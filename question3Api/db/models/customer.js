'use strict';
module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        NAME: DataTypes.STRING
    }, {});
    Customer.associate = function(models) {
        Customer.hasMany(models.Customer_Addresses, { foreignKey: 'CUSTOMER_ID', as: 'Address' })
            // associations can be defined here
    };
    return Customer;
};