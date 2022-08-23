
const {getCriptoById,getCriptoAndUsers} = require('../services/cripto')
function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id
       
     if(populate){
        res.locals.cripto = await getCriptoAndUsers(id)
        
     }else{
        res.locals.cripto = await getCriptoById(id)
   
     }
     next()
    }
   
}
module.exports = preload