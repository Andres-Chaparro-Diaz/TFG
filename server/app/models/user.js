const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    codigo: {
        type: Number
    },
    records: {
        type: [{
            type: Number
        }],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
    }
});

function arrayLimit(val) {
    return val.length <= 5;
}
const User = mongoose.model('User', UserSchema);

module.exports = User;