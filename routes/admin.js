const router = require('express').Router();
const ArticleModel = require('../models/Article');
const muter = require('multer')();



router.get('/article', (req, res, next) => {
    const { id } = req.query;
    if (id !== undefined) {
        ArticleModel.getArticleById(id)
        .then(article => {
                if (article !== null) {
                    return res.render('admin/editArticle', { article });
                }
            }
        )
    } else {
        const articles = ArticleModel.getAllArticles()
            .then(articles => {
                res.render('admin/article', { articles });
            });
    }
});



router.post('/article', muter.any(), (req, res, next) => {
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

router.delete('/article', (req, res, next) => {
    if (req.body.id) {
        ArticleModel.remove(req.body.id)
        .then(result => {
            console.log(result);
            res.send({ deleted: result });
        })
    }
    
})

router.post('/article/update', (req, res, next) => {
    const { _id, title, content } = req.body;
    ArticleModel.update({ _id, title, content })
    .then(result => {
        if (result) {
            console.log(result);
            res.redirect('/admin/article');
        }
    });
})
router.get('/article/add', (req, res, next) => {
    res.render('admin/addArticle')
});

router.get('/', (req, res, next) => {
    res.redirect('/admin/article');
})
module.exports = router;
