const authController=require('../controllers/auths')
const homeController=require('../controllers/home')
const criptoController=require('../controllers/cripto')
module.exports=(app)=>{
    app.use(authController)
    app.use(homeController)
    app.use(criptoController)

    app.get('*', (req, res) => {
        res.render('404', { title: 'Error' })
    })
}