// ==========================================================================
// Project:   LoginLogoutSample
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LoginLogoutSample */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
LoginLogoutSample.main = function main() {

  // Register our routes
  // Our URL will look like 'http://localhost:4020/route_sample#twoMain/twoPane'
  // This means that 'twoMain' will get passed into RouteSample.routes.gotoRoute() as
  // the pageName property of the input parameter object, while 'twoPane' will get passed
  // as the paneName property.
  SC.routes.add(':pageName/:paneName', LoginLogoutSample.routes, 'gotoRoute');

  // This is the 'catch-all' route just in case nothing else fits.
  // This is used when the URL is specified upon start up without
  // any parameters: 'http://localhost:4020/route_sample'.
  SC.routes.add(':', LoginLogoutSample.routes, 'gotoRoute');

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  // TODO: Set the content property on your primary controller
  // ex: LoginLogoutSample.contactsController.set('content',LoginLogoutSample.contacts);

};

function main() {
  LoginLogoutSample.main();
}
