import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    imdbID: String,
    title: String,
    overview: String,
    year: Number,
    imdbRating: Number,
    tags: [String],
    streamingInfo: {type: mongoose.Mixed},
    posterURLs: {type: Map, of: String},
    userRating: {
        type: Number,
        default: 0,
    },
    runtime: Number,
    originalTitle: String,
    genres: [Number],
    backdropURLs: {type: Map, of: String},
    cast: [String],
    significants: [String],
    tagline: String,
    type: {
        type: String,
        default: 'series'
    },
    service: [String]

})

var ShowContent = mongoose.model('ShowContent', postSchema);

export default ShowContent;

