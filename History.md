
0.0.14 / 2015-03-14
===================

  * Add 404 page for backend only, on client we still have this issue to solve https://github.com/DemocracyOS/app/issues/690. Closes #22
  * Add a smaller logo for smaller devices. Closes #67
  * Fix header buttons and labels on smaller devices. Fix newsfeed width as well. Closes #68
  * Fix header signin and signup hiding/showing. Closes #69

0.0.13 / 2015-03-12
===================

  * Add maintenance view for /deployments/new and /settings/deployments. Closes #64
  * Update header height. Closes #59
  * Fix link taking user to their deployment on the same page

0.0.12 / 2015-03-11
===================

  * Update img to be as wide as the newsfeed card. Closes #60

0.0.11 / 2015-03-11
===================

  * Add deploymentId on feeds

0.0.10 / 2015-03-11
===================

  * Add welcome message for anonymous users. Closes #56
  * Update delete deployment modal. Closes #62
  * Remove image input on deployment creation
  * Prevent newsfeed from breaking when a feed is not found or an error is produced getting it. Closes #61

0.0.9 / 2015-03-10
==================

  * Add subdomain frontend validators
  * Rename 'instance' to 'deployment' in manager-api

0.0.8 / 2015-03-10
==================

  * Add domain when clearing jwt
  * Add Manager environment variables

0.0.7 / 2015-03-10
==================

  * Update to use democracyos-db

0.0.6 / 2015-03-09
==================

  * Add DemocracyOS Manager Machine Pack
  * Add instance creation form
  * Add instance remove form

0.0.5 / 2015-03-08
==================

  * Fix calling next() no an error decoding jwt so it continues but without loading the user into the request

0.0.4 / 2015-03-07
==================

  * Remove 404 page to avoid problem on issue #690
  * Fix auth pages, saving a cookie supporting all subdomains if necessary (does not apply for localhost)
0.0.3 / 2015-03-06
==================

  * [feed] - Add different feed cards for each feed type
  * [jwt] - Store jwt in cookies to work out between hub and DemocracyOS
  * [start-democracy] - Add call to action button on newsfeed

0.0.2 / 2015-03-04
==================

  * [signup] - Fix /signup route on backend
  * [newsfeed] - Remove ribbon. Update tag styles
  * [newsfeed] - Add body background-color only on newsfeed page. Add participation and share buttons. Add 'New!' ribbon on feed
  * [newsfeed] - Add basic template
  * [newsfeed] - Add news feed basic layout on homepage, displaying each feed's law mediaTitle. Currently, only showing law-published type feeds
  * [header] - Add new logo #55
  * [newsfeed] - First steps #55
  * [manager-client] - Fix error handling #54
  * [manager-client] - Add manager client mock #54
  * [jwt] Fixed signup flow. Closes #53
  * [dashboard] - Update button to work as a link now instead of binding an event to it to redirect to '/instance/new'
  * [instance-success] Restored link to the newly created instance
  * [instance-view] Stylish instance cards
  * [user-api] Normalize username
  * [instance-form] Some styling to the URL unavailable message. Closes #47
  * [instance-form] Add bare user uniqueness check #47
  * [user-unique] Added component #47
  * Fixed translation keys
  * [config] Refactor
  * [instance-api] Fixed image URL wasn't being saved
  * [dashboard] Layout, api, styles
  * [dashboard] Clean component.json
  * [dashboard] Markup improvements
  * [dashboard] Modifications in layout
  * [boot] Changed font face
  * [dashboard] Remade instance list, added Search box
  * [instance-api] Fixed error mishandling. Closes #46.
  * [instance-api] Fixed wrong error handling
  * Remove nodejs-starter text and add a bare description of hub #26
  * [settings] Fixed responsive styles. Closes #42
  * [instance-form] Made form a little wider
  * [instance-api] Validation: user cannot have more than one instance #39
  * Refactor #39
  * [log] Corrected some logging issues
  * [instance] Redirect to /signin page if user is not logged in. Closes #40.
  * [dashboard] Show 'New' button only if the user doesn't have an instance. Closes #39
  * [dashboard] Changed labels texts #39
  * [instance] Improved Create Instance form #40
  * [log] Renamed wrong logging keys
  * Deleted lib/config/client.js because don't have to be versioned
  * [https] Added ssl/ to .gitignore
  * [routes] Replaced deprecated express send method calling by sendStatus
  * Renamed files, references and text labels from platform to hub. Closes #41
  * [signin] Fixed express deprecated function calling.
  * [dashboard] Show all instances instead of just user's. Closes #38
  * [settings] Added missing translation keys
  * [username] Added username to User model and Signup form. Closes #16
  * [settings] Working settings page. Closes #11
  * [settings] Rebase from development #11
  * Added HTTPS support. Closes #9.
  * Fixed express deprecated function call
  * Fixed signin and signup styles. Closes #21.
  * Updated app description in package.json
  * Added node_modules and components as PHONY targets. Closes #31.
  * Fixed page titles mishandling. Closes #20
  * [logout] Fixed locally stored JWT was not being cleared on logout
  * [instance] Created /instance/mine endpoint #24
  * [instance] Created instance mongoose model and bound instance-api to it #24
  * [instance] Deleted homepage (replaced by dashboard) #24
  * [instance] Added New Instance form #24
  * [dashboard] Styles and sample data. Closes #25
  * [layout] Changed page title
  * [dashboard] Render instances using instance-view #25
  * [dashboard] Created instance-view #25
  * [dashboard] Basic page with hardcoded redirection to an instance #25
  * [dashboard] Made basic directory structure #25
  * [jwt] Redirect to DemocracyOS instance preserving user session #27
  * [jwt] Fixed req.user null reference when route does not use restrict middleware #27
  * [jwt] Fixed user name display after login #27
  * [jwt] Added JSON Web Token sign in mechanism. Closes #27.
  * Use democracyOS session information. Closes #18.
  * comment settings link to be fix on #15
  * fix urls for send mails.
  * start with en instead of es.
  * Replace emmiter on user sign in/out with stateful
  * Fix show/hide user badge. Closes #12
  * [forgot] - Add forgot page. Closes #13
  * Standarize page.js version to 1.5.0 on all components
  * Fix logout, closes #10. Update page dependencies
  * Add logout component #10
  * Add missing keys for user badge. #10
  * Add bootstrap libraries. #10
  * [translations] - Add translations for 'Email already used' and 'Please wait'
  * [models:user] - Add emailValidated attribute
  * Add bootstrap libraries. #10
  * Add separate env variables for privatePort and publicPort
  * Update user loading events #10
  * Update user data on user badge #10
  * Update PORT env variable to PUBLIC_PORT
  * Add email validated flag #10
  * Add missing env variables for HOST
  * Add missing env variable for PROTOCOL
  * Fix binary filenames
  * Update Procfile and package.json files
  * [setup] - Add missing debug require
  * [env] - Add missing env variables
  * fix tabulation #10
  * [signup] - Add resend email validation, email validation #7
  * remove unuse messages. #10
  * Rollback ripple view to FormView. #10
  * [styles] - Remove ugly background color
  * [signup] - Add signup form view. #7
  * [translations] - Add missing translations for validators and signup
  * Add view and form view
  * Add keys to sign in form. #10
  * English translations. #10
  * Spanish translations. #10
  * Base sign in form. #10
  * Add keys to sign in form. #10
  * [signup] - Adding error handling (WIP) #7
  * English translations. #10
  * Spanish translations. #10
  * [singup] - Handling signup submit #7
  * Base sign in form. #10
  * [autosubmit] - Add autosubmit support #7
  * [csrf] - Add csrf support #7
  * [boot] - Use res.sendStatus instead of res.send #7
  * [autovalidate] - Set autovalidating=true to every view when using the autovalidate directive #7
  * [styles] - Remove ugly background color #7
  * [autovalidate] - Add novalidate='novalidate' to a form with autovalidate to disable browser default validation mechanism on form submit #7
  * [signup] - Add autovalidate #7
  * [signup] - Add autovalidate form #7
  * [signup] - Remove autosubmit. Add ripplejs/events #7
  * [signup] - Starting with the signup form #7
  * [signin] - Add signin and signup routes for passport. Closes #3
  * [render] - Destroy view when view's el gets removed. Ignore client.js file
  * [translations] - Add translations component #8
  * [header] - Add header with headroom
  * [homepage] - Clean homepage
  * [install] - Remove /config dir. Update bin/platform-install file
  * Revert to 4d464ca7ab4186b78ea7122cdb13223347846a64
  * Update file references.
  * Ignore files.
  * Update npm dependencies
  * Rename development.json to sample.json
  * updating homepage adding @slifszyc to the list of contributors
  * adding @slifszyc to the list of contributors
  * moving sample.json to development.json
  * Fix bug
  * Revert builder2 changes
  * Using Builder2.js
  * Using component v1.0.0-rc5
  * Create  directory to hold all config code and parameters
  * Bump express version to 4.4.3
  * Update README.md
  * splash update
  * splash update
  * fix remote
  * fix git remotes
  * fix superagent
  * Update README.md
  * Update test for build on development
  * Update README.md
  * Bump passport, passport-twitter and passport-facebook
  * Add debug to auth routes
  * Add debug to root booting
  * Update build module
  * Update code style for variable assignments
  * Update Makefile
  * fix typo
  * fixes
  * Update README.md
  * [boot] - removing gravityonmars-components/bootstrap-stylus
  * [build] - avoid compile on every root
  * [user] - Unnecessary stuff
  * [user:index] - Avoid 404 on json response
  * [user-model] - Check if provided user has id or _id
  * Link Heroku deployment issues at README.md
  * Add Windows Common errors reference.
  * removing script from boot page
  * fix counters github/twitter
  * [bin] - Resolve path for windows environments. #4
  * [bin] - Fix typo
  * Update component.json
  * Update Makefile components install script
  * fixing splash
  * fixing splash
  * fixing splash
  * fixing splash
  * fixing splash
  * fixes config & updated readme
  * favicon fix
  * [homepage] - Tweet button to iframe instead script
  * [auth] - Logout user prior to login with any strategy
  * [auth] - success redirect url to /restricted
  * [boot] - Restricted area.
  * [homepage] - Add yields/empty as dependency
  * Added new area 51
  * Mount user API service routes
  * [boot] - Moved homepage to component. Add first restricted example.
  * [registration] - Fix Twitter's registration bug with avatar
  * [user-model] - Client user-model prototyping user session
  * [user] - User object from user-model
  * [homepage] - Initial component
  * [auth] - Add logout route force replace
  * Add twitter auth routes
  * Fix Twitter strategy options
  * Add twitter registration
  * Add Twitter strategy
  * fixes
  * Update README.md
  * fixes
  * fixes
  * fixes
  * Update some README.md's links
  * Update README.md
  * more forgotten errors
  * Forgoten registration module in auth
  * Add component as dependency
  * Makefile fix
  * Patch to merge of configuration keys
  * fix env configs
  * new splash
  * new splash
  * new splash
  * new splash
  * new splash
  * readme & sites using it
  * Move gravityonmars-components/bootstrap-stylus to boot's dependencies
  * Add Procfile
  * Provide with some usefull silly commands
  * support for bootstrap 2.3.2
  * fixing style
  * fixing style
  * new splash page
  * new splash page
  * Fix jade's deprecated implicit scripts
  * boot auth module
  * Add missing routes for auth module
  * new splash page
  * Add auth routes and strategy
  * new splash page
  * Simple registration module for facebook provider
  * Add simple user model
  * new splash page
  * Update engines in package.json
  * Add stylus component compiler plugin
  * Write app.css after compile
  * Add public to make clean command
  * Fix booting component.json
  * new splash
  * Update README.md
  * fixing config files
  * new readme & development.json
  * Update component builder
  * Remove forgotten console.log
  * First commit
