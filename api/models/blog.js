const mongoose = require('mongoose')

const blogSchema  = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title : { type: String, required: true},
    username : { type: String, required: true},
    post : { type: String, required: true}
});

module.exports = mongoose.model('Blog', blogSchema);