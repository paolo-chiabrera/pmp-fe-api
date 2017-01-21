'use strict';

const Image = require('pmp-image-model');

/* export */

module.exports = {
  getPage
};

/* methods */
function getPage(args) {
	const { pageNum, pageSize} = args;
	const FROM = pageNum * pageSize;
	const TO = FROM + pageSize;

	return Image
	.find({
		'sortIndex': {
			$gte: FROM,
			$lt: TO
		}
	}, {
		'filename': 1,
		'meta': 1,
		'thumbs': 1,
		'sortIndex': 1,
		'_id': 0
	})
	.sort({
		'sortIndex': 1
	})
  .exec();
}
