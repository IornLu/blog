const router = require('express').Router()
const ArticleModel = require('../models/Article');
const UserModel = require('../models/User')
const markdown = require('markdown-it')();

router.get('/', (req, res, next) => {
    ArticleModel.getAllArticles()
    .then(articles => {
        articles.forEach(article => {
            article.content = markdown.render(article.content).slice(0, 300);
        })
        res.render('article', { articles });
    });
});
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    ArticleModel.getArticleById(id)
    .then(article => {
        article.content = markdown.render(article.content || '');
        res.render('articleContent', { article });
    })
    .catch(err => {
        res.status(404);
        next();
    })
})
module.exports = router;
