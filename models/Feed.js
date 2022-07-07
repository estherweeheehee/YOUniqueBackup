const mongoose = require("mongoose");
const { Schema } = mongoose;


const feedSchema = mongoose.Schema({
    post: String,
    Image_url:String,
    date: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    userid: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Feed", feedSchema);