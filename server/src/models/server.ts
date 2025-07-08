import mongoose from 'mongoose';
const { Schema } = mongoose;

const serverSchema = new Schema({
    name: {type: String, required: true},
    ownerId: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}


});

const Server = mongoose.model('Server', serverSchema);

export default Server;