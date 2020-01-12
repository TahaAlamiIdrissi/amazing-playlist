const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        min: 5
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('userSchema',userSchema);