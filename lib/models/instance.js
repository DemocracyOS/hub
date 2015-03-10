/**
* Extend module's NODE_PATH
* HACK: temporary solution
*/

require('node-path')(module);

/**
* Module dependencies.
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/*
 * Instance Schema
 */

var InstanceSchema = new Schema({
    name: {
    type: String,
    index: true,
    required: true,
    unique: true,
    trim: true,
    lowecase: true,
    // String, between 1~80 chars, alphanumeric or `-`, not starting nor finishing with `-`.
    match: /^([a-zA-Z0-9]{1,2}|[a-zA-Z0-9][a-zA-Z0-9\-]{1,78}[a-zA-Z0-9])$/
  },
  deis_uuid: { type: String },
  url:       { type: String },
  title:     { type: String, required: true, trim: true },
  summary:   { type: String, trim: true },
  imageUrl:  { type: String },
  mongo_url: { type: String },
  owner:     { type: ObjectId, required: true, unique: true, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date }
});

InstanceSchema.index({ owner: -1 });
InstanceSchema.index({ name: -1 });

/**
 * Make Schema `.toObject()` and
 * `.toJSON()` parse getters for
 * proper JSON API response
 */

InstanceSchema.set('toObject', { getters: true });
InstanceSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Instance', InstanceSchema);
