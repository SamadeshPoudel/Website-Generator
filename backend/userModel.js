const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
    promptText: String,
    generatedWebsite: String,
    createdAt: {type: Date, default: Date.now}
})

const userSchema = new mongoose.Schema({
    googleId: {type: String, unique: true},
    email: {type: String, unique: true},
    verifiedEmail: Boolean,
    name: String,
    givenName: String,
    familyName: String,
    picture: String,
    prompts: [promptSchema] // Embedding prompts as an array
})

const User = mongoose.model('User', userSchema);

module.exports = User;