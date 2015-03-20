/**
 * Module dependencies.
 */

var config = require('config');
var page = require('page');
var t = require('t');
var translations = require('translations');
var timeago = require('timeago');

/**
 * Load localization dictionaries to translation application
 */

translations.help(t);

/**
 * Init `t` component with locale as `es`
 */

t.lang(config.locale);

/**
 * Boot components
 * and pages.
 */

require('body-classes');
require('header');
require('newsfeed');
require('deployment');
require('signup');
require('signin');
require('forgot');
require('logout');
require('settings');
require('restricted');

/**
 * Init `timeago` component with parameter locale
 */

timeago('.ago', { lang: config.locale, interval: 1000 });

/**
 * Boot page.js
 */

page();

/**
 * Google Analytics
 */

if(config['google analytics tracking id']) {
	require('ga')(config['google analytics tracking id']);
}
