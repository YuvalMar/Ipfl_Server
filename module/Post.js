const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    title: { type: String, required: true },
});
mongoose.Collection
module.exports = mongoose.model("Post", PostSchema);