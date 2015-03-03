/**
* Module dependencies.
*/

var user = require('user');
var o = require('dom');
var template = require('./template');
var View = require('view');
var UserBadge = require('user-badge');
var Headroom = require('headroom');

/**
* Expose HeaderView
*/

module.exports = HeaderView;

/**
* Create Sidebar List view container
*/

function HeaderView() {
  View.call(this, template);

  this.user = this.el.find('.user');
}

View(HeaderView);

HeaderView.prototype.switchOn = function() {
  var self = this;

  user.on('ready', function () {
    var userBadge = new UserBadge();
    userBadge.replace(self.user);
    self.el.find('.anonymous-user').addClass('hide');
  });

  user.on('unloaded', function () {
    self.user.empty();
    self.el.find('.anonymous-user').removeClass('hide');
  });
};

HeaderView.prototype.switchOff = function() {
  if (this.headroomBrowser) this.headroomBrowser.destroy();
  if (this.headroomContent) this.headroomContent.destroy();
  user.off('loaded');
  user.off('unloaded');
};

function initHeadroom(scroller) {
  var header = o('header')[0];
  var aside = o('aside');
  scroller = o(scroller);
  var headroom = new Headroom(header, {
    scroller: scroller[0],
    onPin: function() {
      scroller.removeClass('content-pinned');
      aside.removeClass('content-pinned');
    },
    onUnpin: function() {
      scroller.addClass('content-pinned');
      aside.addClass('content-pinned');
    }
  });

  headroom.init();
  return headroom;
}
