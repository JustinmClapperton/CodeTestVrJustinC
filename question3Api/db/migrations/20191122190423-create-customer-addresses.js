'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Customer_Addresses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            STREET_ADDRESS: {
                type: Sequelize.STRING
            },
            POSTAL_CODE: {
                type: Sequelize.STRING
            },
            COUNTRY: {
                type: Sequelize.STRING
            },
            CUSTOMER_ID: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Customers',
                    key: 'id'
                },
                onDelete: 'Cascade'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Customer_Addresses');
    }
};