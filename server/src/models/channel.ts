import mongoose from 'mongoose';
const { Schema } = mongoose;

const channelSchema = new Schema({
    serverId: {type: String, required: true},
    name: {type: String, required: true}

});

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;