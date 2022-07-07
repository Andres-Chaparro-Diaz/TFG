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
    participa: {
        type: Boolean
    },
    records: {
        type: [{
            type: Number
        }],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
    },
    gamesPlayed: {
        type: Number
    },
    gamesToEmotional: {
        type: Number
    }
}, { timestamps: true });

function arrayLimit(val) {
    return val.length <= 5;
}
const User = mongoose.model('User', UserSchema);

module.exports = User;