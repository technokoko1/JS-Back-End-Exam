const User=require('../models/User')
const {hash,compare}=require('bcrypt')


//TODO add all field required for the exam



  async function register(username,email, password){

    const existing = await getUserByEmail(email)
      if(existing){
        throw new Error('Email is taken')
      }
    
      const hashedPassword = await hash(password,10)
      const user=new User({
        
        username,
        email,
        hashedPassword,
     
      })
      await user.save()
    
      return user
    }

    async function login(email,password){
      const user = await getUserByEmail(email)
    
      if(!user){
         throw new Error('Incorect Email or Password')
      }
      const hasMatch=await compare(password, user.hashedPassword)
    
      if(!hasMatch){
        throw new Error('Incorect Email or Password')
      }
      await user.save()
    
      return user
      
    }

//TODO identify user by given indentifier
// moje da e email ili username
//zavisi ot zadachata
async function getUserByEmail(email){
  const user=await User.findOne({email: new RegExp(`^${email}$`,'i')})
  return user
}

module.exports={
  login,
  register
}