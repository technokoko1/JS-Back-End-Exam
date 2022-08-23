const router = require('express').Router()
const { isGuest, isUser } = require('../middleware/guards')
const { register } = require('../services/user')
const { login } = require('../services/user')
const mapErrors = require('../util/mappers')



router.get('/register', isGuest(), (req, res) => {
    res.render('register',)
})


//TODO check form action field names
//vuv formata trqbva da sloja na parolata ime password i na vtorata parola ime repass
router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() <4) {
            throw new Error('Password  needs to be atleast 4 characters long!')
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords dont match')
        }
        const user = await register(req.body.username,req.body.email, req.body.password)
        req.session.user = user
        res.redirect('/') //TODO Check redirect requirments moje da ne trqbva kum naklonena
    } catch (err) {
        console.log(err)
        //TODO send error message spored zavisi ot iziskvaniqta
        const errors = mapErrors(err)
        res.render('register', { data: { username: req.body.username }, errors })
    }
})

router.get('/login', isGuest(), (req, res) => {
    res.render('login')
})
//TODO check form action field names
//vuv formata trqbva da sloja na parolata ime password i na vtorata parola ime repass
router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password)
        req.session.user = user




        res.redirect('/') 
    } catch (err) {
        console.log(err)
        //TODO send error message spored zavisi ot iziskvaniqta
        const errors = mapErrors(err)
        res.render('login', { data: { username: req.body.username }, errors })
    }
})

router.get('/logout', isUser(), (req, res) => {
    console.log(req.session.user)
    delete req.session.user
    res.redirect('/')
})




module.exports = router