const express = require('express')
const AddressController = require('../controllers/AddressController')

const router = express.Router({mergeParams: true});
const controller = new AddressController()
router.get('/', controller.getAddresses.bind(controller));
router.post('/', controller.createAddress.bind(controller));
router.get('/:id', controller.getAddress.bind(controller));
router.put('/:id', controller.updatedAddress.bind(controller));
router.delete('/:id', controller.deleteAddress.bind(controller));

module.exports = router;