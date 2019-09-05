const mongoose = require('express');
const Joi = require('joi');

//Parking Schema
const parkingSpaceSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        min:2,
        max:255,
    },
    numbersofparking:{
        type: Number,
        min: 1,
        max: 3,
        required: true,
    },
});

////Atribuicao da model a uma variavel
const ParkingSpace = mongoose.Model('parkingSpaceSchema', parkingSpaceSchema);


//Funcao para validação
function validateParkingSpace(parkingSpace){
    const schema = {
        name: Joi.String().min(2).max(255).required(),
        numbersofparking: Joi.String().min(1).max(3).required(),
    };
    return Joi.validate(parkingSpace, schema);
};

//Exports para o schema parkingSpace
exports.parkingSpace = ParkingSpace;
exports.validate = validateParkingSpace;
exports.parkingSpaceSchema = parkingSpaceSchema;