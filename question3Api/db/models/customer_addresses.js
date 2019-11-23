'use strict';
module.exports = (sequelize, DataTypes) => {
    const Customer_Addresses = sequelize.define('Customer_Addresses', {
        STREET_ADDRESS: DataTypes.STRING,
        POSTAL_CODE: DataTypes.STRING,
        COUNTRY: DataTypes.STRING,
        CUSTOMER_ID: DataTypes.INTEGER
    }, {});
    Customer_Addresses.associate = function(models) {
        // Customer_Addresses.belongsTo(models.Customer, { foreignKey: 'CUSTOMER_ID', })
            // associations can be defined here
    };
    return Customer_Addresses;
};