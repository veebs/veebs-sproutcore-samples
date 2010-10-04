// ==========================================================================
// Project:   LoginLogoutSample - Tutorial Application to login/logout
// Copyright: ©2010 Vibul Imtarnasan (Veebs).
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/** @class

  (Document Your Controller Here)

 @extends SC.Object
 */
LoginLogoutSample.loginPageController = SC.ObjectController.create(
  /** @scope LoginLogoutSample.loginPageController.prototype */ {


  // View-Model
  // I have used page level properties for the control to bind to  because I generally see the "model" as data
  // in a datastore.
  // As a personal preference, I like to separate data displayed on pages (View-Model) from data in the datastore
  // (Model) because I've found on complex pages, the data on pages may
  username: '',
  password: '',
  rememberMe: '',
  errorMessage: '',
  isLoggingIn: NO,
  returnRoute: '',

  /**
   Start async login process

   @returns YES if async call successfully started, NO if it failed. If error, the error message
   will be placed in the 'errorMessage' property.
   */
  beginLogin: function() {
    try {
      // Get our data from the properties using the SC 'get' methods
      // Need to do this because these properties have been bound/observed.
      var username = this.get('username');
      if (username == null || username == '') {
        throw SC.Error.desc('Username is required');
      }

      var password = this.get('password');
      if (password == null || password == '') {
        throw SC.Error.desc('Password is required');
      }

      // Start login
      this.set('isLoggingIn', YES);

      // Simulate a HTTP call to check our data.
      // If the credentials not admin/admin, then get a bad url so we get 404 error
      var url = '/login_logout_sample/en/current/source/resources/login_page.js';
      if (username != 'admin' || password != 'admin') {
        url = '/login_logout_sample/en/current/source/resources/bad_url.js';
      }

      SC.Request.getUrl(url)
        .notify(this, 'endLogin')
        .send();

      return YES;
    }
    catch (err) {
      // Set Error
      this.set('errorMessage', err.message);

      // Finish login processing
      this.set('isLoggingIn', NO);

      return NO;
    }
  },

  /**
   Callback from beginLogin() after we get a response from the server to process
   the returned login info.

   @param {SC.Response} response The HTTP response
   @param {function} callback A function taking SC.Error as an input parameter. null is passed if no error.
   */
  endLogin: function(response) {
    try {
      // Flag finish login processing to unlock screen
      this.set('isLoggingIn', NO);

      // Check status
      SC.Logger.info('HTTP status code: ' + response.status);
      if (!SC.ok(response)) {
        // Error
        throw SC.Error.desc('Invalid username or password. Try admin/admin ;-)');
      }

      // Set cookie
      var rememberMe = this.get('rememberMe');
      var authCookie = SC.Cookie.create();
      authCookie.name = 'LoginLogoutSampleCookie';
      authCookie.value = 'sometoken passed back in the response';
      if (rememberMe == '3seconds') {
        // Cookie is saved for 3 seconds
        var d = new Date();
        d.setTime(d.getTime() + 3000);
        authCookie.expires = d;
      } else if (rememberMe == 'closeBrowser') {
        // Cookie removed when browser closed
        authCookie.expires = null;
      } else {
        // Cookie is saved for 1 year
        var d = new Date();
        d.setFullYear(d.getYear() + 1);
        authCookie.expires = d;
      }
      authCookie.write();

      // clear data
      this.set('errorMessage', '');

      // Go to next page
      var returnRoute = LoginLogoutSample.loginPageController.get('returnRoute');
      if (returnRoute != undefined && returnRoute != null && returnRoute != '') {
        SC.routes.set('location', returnRoute);
      }
    }
    catch (err) {
      this.set('errorMessage', err.message);
      SC.Logger.info('Error in endLogin: ' + err.message);
    }
  }

});
