const mongoose = require('mongoose')
const mongooseHidden = require('mongoose-hidden')

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        hidden: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

userSchema.plugin(mongooseHidden);

module.exports = mongoose.model('user', userSchema);