import mongoose from 'mongoose';
const { Schema } = mongoose;

const serverSchema = new Schema({
    name: {type: String, required: true},
    ownerId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    members: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    createdAt: {type: Date, default: Date.now},
    icon: {type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'}

});

const Server = mongoose.model('Server', serverSchema);

export default Server;