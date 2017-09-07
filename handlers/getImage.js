'use strict';

const Image = require('pmp-image-model');

function remapImage(image) {
    const filename = image.filename.split('.');
    const ext = filename.splice(-1, 1)[0];

    return Object.assign({}, image, {
        filename: filename.join('.'),
        meta: Object.assign(
            {},
            image.meta,
            {
              ext
            }
        )
    });
}

function getImage(req, res, next) {
    const query = Image.findOne({
        'filename': new RegExp(`^${req.params.filename}`)
    });
    
    query.select({
        '_id': 0,
        '__v': 0,
        'sortIndex': 0
    });

    query.lean();

    query.exec((err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.json(remapImage(data));
        next();
    });
}

module.exports = getImage;