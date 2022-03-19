import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    imdbID: String,
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

var ShowContent = mongoose.model('ShowContentDB', postSchema);

export default ShowContent;