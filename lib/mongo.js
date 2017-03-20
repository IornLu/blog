const Mongo = require('mongolass');
const config = require('config-lite');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

const mongo = new Mongo(config.mongodb);

mongo.plugin('addCreateAt', {
    afterFind: results => {
        results.forEach(function(element) {
            element.createAt = moment(objectIdToTimestamp(element._id)).format('YYYY-MM-DD HH:mm');
        }, this);
        return results;
    },
    afterFindOne: result => {
        if (result) {
            result.createAt = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
})

exports.User = mongo.model('User', {
    email: { type: String },
    password: { type: String },
    superUser: { type: Boolean },
})

exports.Article = mongo.model('Article', {
    title: { type: String },
    content: { type: String }
})
