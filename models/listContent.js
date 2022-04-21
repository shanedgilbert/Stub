import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    ownerID: String,
    shows: [],
})

var ListContent = mongoose.model('ListContent', postSchema);

export default ListContent;