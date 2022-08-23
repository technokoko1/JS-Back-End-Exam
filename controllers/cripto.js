const router = require('express').Router()
const { isGuest, isUser, isOwner } = require('../middleware/guards')
const preload = require('../middleware/preload')
const { createCripto ,updateCripto ,deleteById,buyCripto} = require('../services/cripto')
const mapErrors = require('../util/mappers')


router.get('/create', isUser(), (req, res) => {

    res.render('create', { title: 'Create Page', data: {} })
})


router.post('/create', isUser(), async (req, res) => {
    const cripto = {
        name:req.body.name,
        criptoImg:req.body.criptoImg,
        price:req.body.price,
        description:req.body.description,
        payment:req.body.payment,
        owner:res.locals.user._id
        //probvam dali raboti s res.locals ako ne da go smenq na req.session
    }

    try{
         await createCripto(cripto)
        res.redirect('/catalog')
    }catch(err){
        console.log(err)

        const errors = mapErrors(err)
        res.render('create', { title: 'Create Page',errors, data:cripto})
    }
    

})

router.get('/edit/:id', preload() ,isOwner(), (req, res) => {

    res.render('edit', { title: 'Edit Page'})
})

router.post('/edit/:id', preload() ,isOwner(),async (req, res) => {
    const id = req.params.id
    const cripto = {
        name:req.body.name,
        criptoImg:req.body.criptoImg,
        price:req.body.price,
        description:req.body.description,
        payment:req.body.payment,
        owner:res.locals.user._id
        
    }
       try{
           await updateCripto(id,cripto)
           res.redirect('/details/'+id)
       }catch(err){
        console.log(err)
         cripto._id=id
        const errors = mapErrors(err)
        res.render('edit', { title: 'Edit Page', data: cripto,errors })
       }   

})

router.get('/delete/:id', preload() ,isOwner(),async (req, res) => {
    const id = req.params.id
     await deleteById(id)
    res.redirect('/catalog')
})

router.get('/buy/:id' ,isUser(),async (req, res) => {
    const id = req.params.id

    try{
       await  buyCripto(id,req.session.user._id)
        res.redirect('/details/'+id)
    }catch(err){
        console.log(err)
        res.redirect('/details/'+id)
    }

})
module.exports = router