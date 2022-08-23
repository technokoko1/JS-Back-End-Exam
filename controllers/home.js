const router = require('express').Router()
const { isGuest, isUser } = require('../middleware/guards')
const { register } = require('../services/user')
const { login } = require('../services/user')
const mapErrors = require('../util/mappers')
const { getAllCriptos,getSomeCoins} = require('../services/cripto')
const preload = require('../middleware/preload')

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' })
})


router.get('/catalog', async (req, res) => {
    const cripto = await getAllCriptos()
    res.render('catalog', { title: 'Catalog Page', cripto})
})


router.get('/details/:id', preload(true), (req, res) => {
    res.locals.cripto.gotCripto=res.locals.cripto.buyCripto.map(b=>b.email)

 
    if (req.session.user) {
        res.locals.cripto.hasUser2=true
       if(req.session.user._id==res.locals.cripto.owner._id){
        res.locals.cripto.isOwner=req.session.user._id
       }
      
       if(res.locals.cripto.buyCripto.some(b=>b._id==req.session.user._id)){
        res.locals.cripto.isJoined=true
       }

    }
    res.render('details', { title: 'Detail Page' })
})

router.get('/search',async (req, res) => {
   
 
   res.render('search', { title: 'Search Page' })
})

router.post('/search',async (req, res) => {
    console.log(req.body.search)
   const coins = await getSomeCoins(req.body.search)
   res.render('search', { title: 'Search Page' ,coins})
})

module.exports = router