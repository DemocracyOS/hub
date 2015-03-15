/**
 * Module dependencies.
 */
var page = require('page');
var title = require('title');
var SigninForm = require('./view');
var o = require('dom');
var t = require('t');
var query = require('querystring');

page('/signin', function(ctx, next) {

  // Update page title
  title(t('signin.title'));

  // Empty section
  var section = o('section.site-content').empty();

  o(document.body).addClass('signin-page');

  var search = query.parse(ctx.querystring);

  var emailValidated = search.emailValidated ? JSON.parse(search.emailValidated) : false;

  // Create view instance and append it to section
  var signin = new SigninForm(emailValidated);
  signin.el.appendTo(section[0]);
});
