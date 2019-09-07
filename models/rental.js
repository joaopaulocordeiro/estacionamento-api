const mongoose = require('mongoose');
const Joi = require('joi');
const carSchema = require('../models/car');
const parkingSpaceSchema = require('../models/parkingSpace');
const numbersOfPlacesSchema = require('../models/numbersOfPlaces')

//A vaga de estacionamento ocupada esta escrita como Rental
//pois tratei como um "aluguel de vaga"

//Schema da vaga ocupada
const rentalSchema = new mongoose.Schema({
    car:{
        type: carSchema,
        required: true,
    },
    parkingSpace:{
        type: parkingSpaceSchema,
        required: true,
    },
    numbersOfPlaces:{
        type: numbersOfPlacesSchema,
        required:true,
    },
    entryDate:{
        type: Date,
        default: Date.now,
        required: true,
    },
    
});


//Data de saida 
rentalSchema.methods.return = function() {
    this.dateOut = new Date();
}

//Atribuicao da model a uma variavel
const Rental = mongoose.model('Rental', rentalSchema);

//validação do aluguel da vaga com o id do carro e da vaga
function validateRental(rental) {
    const schema = {
        carId: Joi.string().required(),
        parkingNameId: Joi.string().required(),
        numbersOfPlacesid: Joi.string().required(),
    }
    return Joi.validate(rental, schema);
};

exports.Rental = Rental;
exports.validate = validateRental;




