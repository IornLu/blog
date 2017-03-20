const router = require('express').Router();
const ArticleModel = require('../models/Article');
const permission = require('../middlewires/checkPermission');
const muter = require('multer')();

router.get('/', permission.checkSuperUser, (req, res, next) => {
    res.redirect('/admin/article');
})

router.get('/article', permission.checkSuperUser, (req, res, next) => {
    const articles = ArticleModel.getAllArticles()
    .then(articles => {
        res.render('admin/article', { articles });
    });
});

router.post('/article',permission.checkSuperUser, muter.any(), (req, res, next) => {
    console.log(req.body);
    const { title, content } = req.body;
    const article = { title, content };
    ArticleModel.create(article)
    .then(result => {
        console.log('创建成功');
        res.redirect('/admin/article');
    })
    .catch(err => {
        console.log('创建失败');
        res.redirect('/admin/article');
    });
});

router.get('/article/add',permission.checkSuperUser, (req, res, next) => {
    res.render('admin/addArticle')
});
module.exports = router;