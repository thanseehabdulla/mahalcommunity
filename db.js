var mongojs = require('mongojs')

var db = mongojs('mahallu')

exports.db = function () {
    return db
}