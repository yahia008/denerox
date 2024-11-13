const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


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
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
})

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', UserSchema);