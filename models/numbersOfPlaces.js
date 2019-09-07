const mongoose = require('mongoose');
const Joi = require('joi');

//Schema do numero de vagas disponiveis no estacionamento
const numbersOfPlacesSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        min:1,
        max:255,
    },
    spots:{
        type: Number,
        required: true,
        min:0,
        max:255,
    }
});

//Atribuicao da model a uma variavel
const numbersOfPlaces = mongoose.model('NumberOfPlaces', numbersOfPlacesSchema);

//Validacao Joi 
function validatePlaces(places){
    const schema = {
        spots: Joi.number().min(0).max(255).required()
    }
    return Joi.validate(places, schema);
};

exports.NumbersOfPlaces = numbersOfPlaces;
exports.validate = validatePlaces;

