const express = require('express');
const router = express.Router();
const {Customers, validate} = require('../models/customer');

//POST
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customers({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
    });
    await customer.save();
    res.send(customer);
});

//GET BY ID
router.get('/:id', async (req, res) => {
    const customer = await Customers.findById(req.params.id);
    if(!customer) return res.status(404).send('Customer ID is not found...')
});

//GET ALL
router.get('/', async (req, res) => {
    const customer = await Customers.find().sort('name');
    res.send(customer);
})

//DELETE
router.delete('/:id', async (req, res) => {
    const customer = await Customers.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send('Customer ID is not Found...')
})

//export to index
module.exports = router;