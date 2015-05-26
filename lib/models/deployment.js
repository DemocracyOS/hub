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
 * Deployment Schema
 */

var DeploymentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowecase: true,
    // String, between 1~80 chars, alphanumeric or '-', not starting nor finishing with '-'.
    match: /^([a-zA-Z0-9]{1,2}|[a-zA-Z0-9][a-zA-Z0-9\-]{1,78}[a-zA-Z0-9])$/
  },
  deisId:    { type: String },
  url:       { type: String },
  title:     { type: String, required: true, trim: true },
  summary:   { type: String, trim: true },
  imageUrl:  { type: String },
  mongoUrl:  { type: String },
  owner:     { type: ObjectId, required: true, unique: true, ref: 'User' },
  status:    { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

DeploymentSchema.index({ owner: -1, deleted: -1 });
DeploymentSchema.index({ name: -1, deleted: -1 });

/**
 * Make Schema `.toObject()` and
 * `.toJSON()` parse getters for
 * proper JSON API response
 */

DeploymentSchema.set('toObject', { getters: true });
DeploymentSchema.set('toJSON', { getters: true });

DeploymentSchema.pre('init', function () {
  throw new Error('You cant\'t create Deployments outside Manager.');
});

DeploymentSchema.pre('save', function () {
  throw new Error('You cant\'t modify Deployments outside Manager.');
});

DeploymentSchema.pre('remove', function () {
  throw new Error('You cant\'t delete Deployments outside Manager.');
});

module.exports = function initialize(conn) {
  var Model = conn.model('Deployment', DeploymentSchema);

  DeploymentSchema.path('name').validate(function(val, fn){
    Model.find({
      name: name,
      deleted: false
    }).limit(1).exec(function(err, deployments){
      if (err) return fn(false);
      fn(!!deployments.length);
    });
  }, 'Name already taken.');

  return Model;
}
