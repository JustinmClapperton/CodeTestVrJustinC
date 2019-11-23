'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
        "CustomerAddresses",
        [
          {
            STREET_NAME: "Test1",
            COUNTRY: "Test2",
            POSTAL_CODE: "12345",
            CUSTOMER_ID: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            STREET_NAME: "Test3",
            COUNTRY: "Test4",
            POSTAL_CODE: "12345",
            CUSTOMER_ID: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ],

        {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customer_Addresses', null, {});
  }
};
