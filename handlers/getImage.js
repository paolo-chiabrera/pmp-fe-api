'use strict';

const Image = require('pmp-image-model');

function getImage(req, res, next) {
    const query = Image.findOne({
        'filename': req.params.filename
    });
    
    query.select({
        '_id': 0,
        '__v': 0
    });

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

module.exports = getImage;