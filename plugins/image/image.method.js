'use strict';

const Image = require('pmp-image-model');

/* export */

module.exports = {
  getPage
};

/* methods */
function getPage(args) {
  return Image.paginate({
    sortIndex: {
      $gt: -1
    }
  }, {
    lean: true,
    leanWithId: false,
    limit: args.limit,
    page: args.page,
    select: {
      _id: 0,
      filename: 1,
      meta: 1,
      thumbs: 1,
      sortIndex: 1
    },
    sort: {
      sortIndex: 1
    }
  });
}
