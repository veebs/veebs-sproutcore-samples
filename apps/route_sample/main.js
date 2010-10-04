// ==========================================================================
// Project:   RouteSample - Tutorial Application showing how to move from
//            page to page.
// Copyright: ©2010 Vibul Imtarnasan (Veebs).
// License:   Licensed under MIT license (see license.js)
// ==========================================================================


// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
RouteSample.main = function main() {

  // Register our routes
  // Our URL will look like 'http://localhost:4020/route_sample#twoMain/twoPane'
  // This means that 'twoMain' will get passed into RouteSample.routes.gotoRoute() as
  // the pageName property of the input parameter object, while 'twoPane' will get passed
  // as the paneName property.
  SC.routes.add(':pageName/:paneName', RouteSample.routes, 'gotoRoute');
  
  // This is the 'catch-all' route just in case nothing else fits.
  // This is used when the URL is specified upon start up without
  // any parameters: 'http://localhost:4020/route_sample'.
  SC.routes.add(':', RouteSample.routes, 'gotoRoute');
  
  // *** WE CAN SKIP THIS *** Step 1: Instantiate Your Views
  // We can skip this normal step of showing the 1st page
  // because the page that will displayed is determined by
  // the URL.  RouteSample.routes.gotoRoute() will be called by SC.
  //RouteSample.getPath('onePage.onePane').append() ;

} ;

function main() { RouteSample.main(); }
