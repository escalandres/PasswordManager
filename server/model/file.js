const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true, unique: true},
        path: {type: String, required: true},
    },
    {collection: 'files'}
)

const model = mongoose.model('FileSchema', FileSchema);

module.exports = model