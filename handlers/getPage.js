'use strict';

const Image = require('pmp-image-model');

const RATIOS = [
  { ratio: 1 },
  { ratio: 2 },
  { ratio: 3 }
];

function calculateRatio(height = 0, width = 0) {
  const ratio = width / height;

  const index = RATIOS.findIndex(item => item.ratio > ratio) || 0;

  let closer = RATIOS[index];

  if (index > 0) {
    const prevDiff = Math.abs(ratio - RATIOS[index - 1].ratio);
    const nextDiff = Math.abs(ratio - RATIOS[index].ratio);

    closer = prevDiff > nextDiff ? RATIOS[index - 1] : RATIOS[index];
  }

  return closer;
}

function remapFilename(images) {
    return images.map(image => {
        const { meta } = image;
        const filename = image.filename.split('.');
        const ext = filename.splice(-1, 1)[0];

        return Object.assign({}, image, {
            filename: filename.join('.'),
            meta: Object.assign(
              {},
              image.meta,
              {
                ext
              },
              calculateRatio(meta.height, meta.width)
            )
          });
        });
}

function getPage(req, res, next) {
    const PAGE = parseInt(req.params.page || 0);
    const SIZE = parseInt(req.query.size || 50);

    const query = Image.find({
        'thumbs': { '$gt': [] }
    });

    query.select({
        'filename': 1,
        'meta': 1,
        'thumbs': 1,
        '_id': 0
    });

    query.sort({
        'createdAt': 1
    });

    query.skip(PAGE * SIZE);

    query.limit(SIZE);

    query.lean();

    query.exec((err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.json(remapFilename(data));
        next();
    });
}

module.exports = getPage;