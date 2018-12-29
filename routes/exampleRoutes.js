const mongoose = require('mongoose');
const Example = mongoose.model('Example');
// const cleanCache = require('../middlewares/cleanCache');

module.exports = app => {

    app.get('/examples', async (req, res) => {
        const blogs = await Example.find({});
        res.send(blogs);
    });

    app.get('/examples/:id', async (req, res) => {
        const blog = await Example.findOne({ _id: req.params.id });
        res.send(blog);
    });

    app.post('/examples', async (req, res) => {
        const blog = await Example.insertMany(req.body);
        res.send(blog);
    });

};