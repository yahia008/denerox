const User = require('../model/user')
const {generatejwt} = require('../config/utils');
const EventEmitter = require('events')
const Account = require('../model/account')
const event = new EventEmitter()
const bcrypt = require('bcrypt')

exports.signUp =  async(req, res) => {
    const {firstName, lastName, phoneNumber, email, password} = req.body

    try{
        const userExists = await User.findOne({ email });
        if(userExists){
            throw new Error('user already exist')
        }
        //const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            phoneNumber,
            email,
            password,

          });
          
          await user.save()
          
            const accName =  `${firstName} ${lastName}`
          const account = new Account({
            user:user._id,
            accountNumber:phoneNumber,
            accountName:accName,
          })
      
          await account.save()

        
          if(user) {
            
            res.staus(201).json({
                msg:'user created succesfully',
                id:user._id,
                name:user.name,
                email:user.email,
                balance:account ? account.balance : 0,
                accountId:account.user, 
                token: generatejwt(user),
                accId:account._id
                
            })
            
          }else {
            res.status(400);
            throw new Error("Invalid user data");
          }
    }catch(error){
   res.status(400).json({msg: error.message || 'An error occurred during sign-up'})
    }
}



exports.signIn = async (req, res) => {
    const {phoneNumber, password} = req.body
    try{
      if (!phoneNumber | !password) throw new Error("Please add all fields")
        const authUser = await User.findOne({phoneNumber})
      const userAccount = await Account.findOne({ accountNumber:phoneNumber});
      if(!userAccount) throw new Error("no such account")

    if(authUser && bcrypt.compare(password, authUser.password)){
     const user = {id:authUser._id}
     console.log(userAccount)
    
     
     console.log(user)
        res.json({
          msg:"login successfull",
            id: authUser._id,
            name: authUser.firstName,
            email: authUser.email,
            balance:userAccount.balance,
            accountName:userAccount.accountName,
            accountNumber:userAccount.accountNumber,
            accountId:userAccount.user,
            password:authUser.password,
           token: generatejwt(user),
          });
    }else{
      throw new Error('invalid username and passward')
    }
    }catch(error)
    {
      res.status(400).json({msg:error.message})
    }
   
}