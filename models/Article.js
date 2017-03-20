const Article = require('../lib/mongo').Article;

module.exports = {
    create: (article) => {
        return Article.create(article).exec();
    },
    getArticleById: _id => {
        return Article.findOne({ _id }).addCreateAt().exec();
    },
    getAllArticles: () => {
        return Article.find().sort().addCreateAt().exec();
    }
}
