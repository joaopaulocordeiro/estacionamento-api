const mongoose = require('mongoose');
const Joi = require('joi');

//Parking Schema
const parkingSpaceSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        min:1,
        max:255,
    }
});

////Atribuicao da model a uma variavel
const ParkingSpace = mongoose.model('parkingSpace', parkingSpaceSchema);

//Funcao para validação
function validateParkingSpace(parkingSpace){
    const schema = {
        name: Joi.string().min(1).max(255).required(),
    };
    return Joi.validate(parkingSpace, schema);
};

//Exports para o schema parkingSpace
exports.ParkingSpace = ParkingSpace;
exports.validate = validateParkingSpace;
exports.parkingSpaceSchema = parkingSpaceSchema;