const { Schema, model } = require('mongoose')

//TODO change user model for difrent exam
const EMAIL_PATTERN= /^([a-zA-Z-1-9]+)@([a-zA-Z]+)\.([a-zA-Z]+)+$/
const userSchema = new Schema({
    username: { type: String, required: true,minlength:[5,'Username needs to be atleast 5 charcaters long!'] },
    email: { type: String,  required:[true,'Email is required!'], validate:{
        validator(value) {
            return EMAIL_PATTERN.test(value)
        },
        message: 'Incorect Email!'

    },minlength:[10,'Email needs to be atleast 10 charcaters long!']},
    hashedPassword: { type: String, required: true }
})
userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }

})

const User=model('User',userSchema)

module.exports=User