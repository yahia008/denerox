const Transaction = require('../models/transaction')
const Account = require('../models/account')


exports.deposit = async(req, res)=>{
 
     const {amount, description} = req.body

     try{
        if (amount < 0 || amount == 0 ) throw new Error('cant deposit less than zero')
            const newTransaction = new Transaction({
            amount:amount,
            description:description,
            transtionType:'deposit',
            status:'completed'
            })

        const newbalance = Account()
        newbalance.balance +=amount
        await newbalance.save() 

        // if (otp == Transaction.otp){
        //     const newTransaction = new Transaction({
                
        //         amount:amount,
        //         description:description,
        //         opt:'',
        //         transactionType:'deposit',
        //         status:'completed'
                
        // })
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
        }
      catch(error){
        res.status(500).json({ message: error.message });
     }


    }



  exports.transfer = async(req, res)=> {
    
  }