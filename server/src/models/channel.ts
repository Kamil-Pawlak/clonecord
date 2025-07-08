import mongoose from 'mongoose';
const { Schema } = mongoose;

const channelSchema = new Schema({
    serverId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Server'},
    name: {type: String, required: true}

});

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;