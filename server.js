const express = require('express');
const mongoose = require('mongoose');
const app = express()

//dependecies interns
const articlesRouter = require('./routes/index');
const methodeOverride = require('method-override');
const Article = require('./models/article');

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/blog', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, console.log('Connected !! '))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(methodeOverride('_method'));

app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({ date: 'desc' })
    res.render('index', { articles: articles })
})

app.use(articlesRouter);


app.listen(3000, console.log('Server in on port 3000'))