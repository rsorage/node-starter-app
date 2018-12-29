const mongoose = require('mongoose');
const { Schema } = mongoose;

const exampleSchema = new Schema({
    name: String,
    description: String,
    createdAt: { type: Date, default: Date.now }
});

mongoose.model('Example', exampleSchema);
