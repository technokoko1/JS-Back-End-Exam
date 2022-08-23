const { Schema, model, Types: { ObjectId } } = require('mongoose')

const Url_PATTERN= /^https?:\/\/(.+)/
const criptoSchema = new Schema({
    name: { type: String, required: true ,minlength:[2,'Name needs to be atleast 2 characters long.']},
    criptoImg: { type: String, required: true ,validate:{
        validator(value) {
            return Url_PATTERN.test(value)
        },
        message: 'Incorect Url!'

    }},
    price: { type: Number, required: true ,min:[0,'Price cant be negative Number!']},

    //TODO FIX PRICE MSG
    description: { type: String, required: true,minlength:[10,'Description needs to be atleast 10 characters long.']} ,
    payment:{ type: String, required: true },
    buyCripto:{type:[ObjectId],ref:'User',default:[]},
    owner:{type:ObjectId,ref:'User',required:true}, 

})


const Cripto=model('Cripto',criptoSchema)

module.exports=Cripto