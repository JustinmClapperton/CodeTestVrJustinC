const express = require('express')
const CustomerController = require('../controllers/CustomerController')

const router = express.Router();
const controller = new CustomerController()
console.log(controller)
router.get('/', controller.getCustomers.bind(controller));
router.post('/', controller.createCustomer.bind(controller));
router.get('/:id', controller.getCustomer.bind(controller));
router.put('/:id', controller.updatedCustomer.bind(controller));
router.delete('/:id', controller.deleteCustomer.bind(controller));

module.exports = router;