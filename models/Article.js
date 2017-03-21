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
    },
    remove: _id => {
        return Article.remove({ _id }).exec();
    },
    update: article => {
        return Article.updateOne({ _id: article._id }, article);
    }
}
