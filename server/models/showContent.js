import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    overview: String,
    year: Number,
    imdbRating: Number,
    tags: [String],
    posterURL: String,
    userRating: {
        type: Number,
        default: 0,
    },
})

var ShowContent = mongoose.model('ShowContent', postSchema);

export default ShowContent;