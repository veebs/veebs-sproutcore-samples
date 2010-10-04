// ==========================================================================
// Project:   LoginSample - Tutorial Application to login
// Copyright: ©2010 Vibul Imtarnasan (Veebs).
// License:   Licensed under MIT license (see license.js)
// ==========================================================================


module("LoginSample.loginController");


test("test successful login", function() {
  stop(3000);
  
  LoginSample.loginController.set('username', 'admin');
  LoginSample.loginController.set('password', 'admin');
  LoginSample.loginController.set('onLoginGoToPagePaneName', null);
  
  ok(LoginSample.loginController.beginLogin(), 'Async call started');

  var isLoggingIn = LoginSample.loginController.get('isLoggingIn');
  ok(isLoggingIn == YES, 'isLoginIn is YES');

  setTimeout(checkSuccess, 2000);
});

test("test error login", function() {
  stop(3000);

  LoginSample.loginController.set('username', 'admin');
  LoginSample.loginController.set('password', 'xxxx');
  LoginSample.loginController.set('onLoginGoToPagePaneName', null);
  
  ok(LoginSample.loginController.beginLogin(), 'Async call started');

  setTimeout(checkError, 2000);
});

test("test empty username", function() {
  LoginSample.loginController.set('username', '');
  LoginSample.loginController.set('password', 'xxxx');
  LoginSample.loginController.set('onLoginGoToPagePaneName', null);
  
  ok(!LoginSample.loginController.beginLogin(), 'Async call not started');
  checkError();
});

test("test empty password", function() {
  LoginSample.loginController.set('username', 'xxxx');
  LoginSample.loginController.set('password', '');
  LoginSample.loginController.set('onLoginGoToPagePaneName', null);
  
  ok(!LoginSample.loginController.beginLogin(), 'Async call not started');
  checkError();
});


function checkSuccess() {
  var errorMessage = LoginSample.loginController.get('errorMessage');
  ok(errorMessage.length == 0, 'No error messages');

  var isLoggingIn = LoginSample.loginController.get('isLoggingIn');
  ok(isLoggingIn == NO, 'isLoginIn is NO');

  start();
}

function checkError() {
  var errorMessage = LoginSample.loginController.get('errorMessage');
  ok(errorMessage.length > 0, 'Error message is: ' + errorMessage);

  var isLoggingIn = LoginSample.loginController.get('isLoggingIn');
  ok(isLoggingIn == NO, 'isLoginIn is NO');

  start();
}




