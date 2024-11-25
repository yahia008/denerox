const User = require('../model/user')
const sendmail = require('../config/utils')

exports.forgotPassword = async(req, res)=> {
    const {email} = req.body
    const user = await User.findOne({email})
    try{
       
        if(!user) throw new Error('user not found')

         const token = user.resetToken();
         await user.save();

         const resetUrl = `${req.protocol}://${req.get('host')}/api/${token}/resetPassword`

         const message = `
        Hi ${user.name},
        
        You requested a password reset. Click the link below to reset your password:
        
        ${resetUrl}
        
        If you did not request this, please ignore this email.
    `;

    await sendmail({
        email: user.email,
        subject: 'Password Reset Request',
        message: message,
    });

    res.status(200).json({
        message:'Password reset email sent'
    })


    }catch(error){
       if(user){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(500).json({
            msg:error.message
        })
       }
       
    }
   

}

const reset