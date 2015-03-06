/**
* Module dependencies.
*/

var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

/**
 * Define `Feed` Schema
 */

 var types = [
   'law-published'
];

var FeedSchema = new Schema({
    type: { type: String, enum: types, required: true }
  , data: { type: Schema.Types.Mixed, required: true }
  , url: { type: String, required: true }
});

FeedSchema.index({ law: 1 });
FeedSchema.index({ type: 1 });

module.exports = mongoose.model('Feed', FeedSchema);
