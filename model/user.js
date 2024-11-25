const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const crypto = require('crypto');


const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    phoneNumber: { type: Number,
         required: true, 
         unique: true,
         minlength: 10,
         maxlength: 10,
         match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']},
    email: { type: String, required: true, unique: true },
    
    password: { type: String, required: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
})

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

UserSchema.methods.resetToken = function () {
    const token = crypto.randomBytes(32).toString('hex');
    const resetToken = crypto.createHash('sha256').update(token).digest('hex')
    this.resetPasswordToken = resetToken;
    this.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
  
    // Return the token
    return token;
}

module.exports = mongoose.model('User', UserSchema);