const express = require('express');
const router = express.Router();
const { NumbersOfPlaces, validate } = require('../models/numbersOfPlaces');


//POST quantidade de vagas disponiveis
router.post('/', async (req, res) => {
    
    //validação de erro
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const places = new NumbersOfPlaces ({
        name: req.body.name,
        spots: req.body.spots
    });
    await places.save()
    res.send(places);
});

//GET
router.get('/', async (req, res) => {
    const places = await NumbersOfPlaces.find().sort('spots')
    res.send(places);
 });

//PUT
router.put('/:id', async (req,res) => {
    const places = await NumbersOfPlaces.findByIdAndUpdate(req.params.id,{
        spot: req.body.spot
    }, {new: true})

    if(!places) return res.status(404).send(console.log("The Number of Places is not Found..."))
    res.send(places);
});

 
 module.exports = router;

 