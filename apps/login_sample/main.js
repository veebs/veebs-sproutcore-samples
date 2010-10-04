// ==========================================================================
// Project:   LoginSample - Tutorial Application to login
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
LoginSample.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes. 
  // For our app, we just instance the login pane
  LoginSample.getPath('loginPage.loginPane').append() ;

};

function main() { LoginSample.main(); }
