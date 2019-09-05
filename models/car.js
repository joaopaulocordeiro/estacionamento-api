const mongoose = require('mongoose');
const Joi = require('joi');

//car Schema
const carSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 5, 
        maxlength: 50,
    },
    year:{
        type: Number,
        required:true,
        minlength: 8,
        maxlength: 30,
    },
    licensePlate:{
        type: String,
        required: true,
        minlength: 0,
        maxlength: 255,
    }
});

//Atribuicao da model a uma variavel
const Car = mongoose.model('Car', carSchema);

//Validacao Joi    
function carValidate(car){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        year: Joi.number().min(8).required(),
        licensePlate: Joi.string().min(0).max(255).required(),
    }
        return Joi.validate(car, schema);
};

//Export CarrSchema
exports.Car = Car;
exports.carSchema = carSchema;
exports.validate = carValidate;

