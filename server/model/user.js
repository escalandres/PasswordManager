const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true, unique: true},
        semail: {type: String, required: true, unique: true},
        sname: {type: String, required: true},
        hashedPassword: {type: String, required: true}
    },
    {collection: 'users'}
)

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model