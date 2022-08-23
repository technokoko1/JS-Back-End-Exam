const express= require('express')
const {create:handlebars}=require('express-handlebars')
const session=require('express-session')
const userSession = require('../middleware/userSession')

module.exports=(app )=>{
    app.engine('.hbs',handlebars({

        extname: '.hbs',

    }).engine)

    app.set('view engine','hbs')
    //za da ne pishem razshirenieto kogato vikame render

    app.use('/static',express.static('static'))
    //vzimame statichnite failove s express

    app.use(session({
        secret:'secret',
        resave:'false',
        saveUninitialized:true,
        cookie:{
            secure:'auto'
        }
        //podavame sesiqta tuk nqmam ideq kakvo sum pisal tuk vsichko e na izust
    }))

    app.use(express.urlencoded({extended:true}))
    app.use(userSession())
}