const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema({
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
        required: true
    }
}, { timestamps: true });

// object가 json으로 바뀔 때 호출할 수 있는 함수
userSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.password;
    return obj;
}

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, { expiresIn: '1d' });

    return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;