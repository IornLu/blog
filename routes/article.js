const router = require('express').Router()

router.use('/', (req, res) => {
    res.render('article', { pageTitle: 'Iron\'s blog ' });
})
module.exports = router;
