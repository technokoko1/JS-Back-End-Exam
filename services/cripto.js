const Cripto=require('../models/Cripto')


async function getCriptoById(id){
    return Cripto.findById(id).lean()
}

async function createCripto(cripto){
    const result= new Cripto(cripto)
    await result.save()
}

async function getAllCriptos(){
    return Cripto.find({}).lean()
    //.lean() go slagame zashtoto inache handlebars ne razpoznava obekta
}

async function getCriptoAndUsers(id){
    return Cripto.findById(id).populate('owner').populate('buyCripto').lean()
    
}

async function updateCripto(id,cripto){
    const existing =await Cripto.findById(id)
  
    existing.name=cripto.name
    existing.criptoImg=cripto.criptoImg
    existing.price=cripto.price
    existing.description=cripto.description
    existing.payment=cripto.payment
 
  
    await existing.save()
  }

  async function deleteById(id){
    await Cripto.findByIdAndDelete(id)
}

async function buyCripto(criptoId,userId){
    const cripto = await Cripto.findById(criptoId)
    
    if(cripto.buyCripto.includes(userId)){
        throw new Error('User already got this cripto!')
    }
    cripto.buyCripto.push(userId)
    await cripto.save()
    }

    async function getSomeCoins(search){
   
        return Cripto.find({ name: { $regex: `${search}`, $options: "i" } }).lean()
        
    }
module.exports={
createCripto,
getAllCriptos,
getCriptoAndUsers,
getCriptoById,
updateCripto,
deleteById,
buyCripto,
getSomeCoins,
}
