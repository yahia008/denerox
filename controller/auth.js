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
          event.on("usercreated", async(firstName, lastName, phoneNumber, user)=>{
            const accName =  `${firstName} ${lastName}`
            const userAccount = new Account(
              {accountNumber: phoneNumber,
              accountName: accName,
              user: user._id,
              accountType: 'savings', // Default value or as needed
              balance: 0,  })
            await userAccount.save()
          })

          event.emit('usercreated');
          const userAccount = await Account.findOne({ accountNumber});

        
          if(user) {
            
            res.staus(201).json({
                msg:'user created succesfully',
                id:user._id,
                name:user.name,
                email:user.email,
                balance:userAccount ? userAccount.balance : 0,
                accountId:userAccount.user, 
                token: generatejwt(user),
                accId:userAccount._id
                
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
    const userAccount = Account()
    try{
      if (!phoneNumber | !password) throw new Error("Please add all fields")
        const authUser = await User.findOne({phoneNumber})

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