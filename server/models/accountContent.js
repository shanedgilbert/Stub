import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    id : String,
    name: String,
    lastLoggedIn: String
});

var AccountContent = mongoose.model('AccountContent', postSchema);

export default AccountContent;