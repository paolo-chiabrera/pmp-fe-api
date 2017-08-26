'use strict';

const Image = require('pmp-image-model');

function getPage(req, res, next) {
    const query = Image.find({
        'thumbs': { '$gt': [] }
    });
    
    query.select({
        'filename': 1,
        'meta': 1,
        'thumbs': 1,
        'sortIndex': 1,
        '_id': 0
    });

    query.sort({
        'createdAt': 1
    });

    query.skip(parseInt(req.params.page || 0));

    query.limit(parseInt(req.query.size || 20));

    query.lean();

    query.exec((err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.json(data);
        next();
    });
}

module.exports = getPage;