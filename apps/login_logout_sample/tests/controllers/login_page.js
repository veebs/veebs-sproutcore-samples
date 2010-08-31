// ==========================================================================
// Project:   LoginLogoutSample.loginPageController Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LoginLogoutSample module test ok equals same stop start */

module("LoginLogoutSample.loginPageController");

test("test successful login", function() {
  stop(3000);

  LoginLogoutSample.loginPageController.set('username', 'admin');
  LoginLogoutSample.loginPageController.set('password', 'admin');
  LoginLogoutSample.loginPageController.set('returnRoute', null);

  ok(LoginLogoutSample.loginPageController.beginLogin(), 'Async call started');

  var isLoggingIn = LoginLogoutSample.loginPageController.get('isLoggingIn');
  ok(isLoggingIn == YES, 'isLoginIn is YES');

  setTimeout(checkSuccess, 2000);
});

test("test error login", function() {
  stop(3000);

  LoginLogoutSample.loginPageController.set('username', 'admin');
  LoginLogoutSample.loginPageController.set('password', 'xxxx');
  LoginLogoutSample.loginPageController.set('returnRoute', null);

  ok(LoginLogoutSample.loginPageController.beginLogin(), 'Async call started');

  setTimeout(checkError, 2000);
});

test("test empty username", function() {
  LoginLogoutSample.loginPageController.set('username', '');
  LoginLogoutSample.loginPageController.set('password', 'xxxx');
  LoginLogoutSample.loginPageController.set('returnRoute', null);

  ok(!LoginLogoutSample.loginPageController.beginLogin(), 'Async call not started');
  checkError();
});

test("test empty password", function() {
  LoginLogoutSample.loginPageController.set('username', 'xxxx');
  LoginLogoutSample.loginPageController.set('password', '');
  LoginLogoutSample.loginPageController.set('returnRoute', null);

  ok(!LoginLogoutSample.loginPageController.beginLogin(), 'Async call not started');
  checkError();
});


function checkSuccess() {
  var errorMessage = LoginLogoutSample.loginPageController.get('errorMessage');
  ok(errorMessage.length == 0, 'No error messages');

  var isLoggingIn = LoginLogoutSample.loginPageController.get('isLoggingIn');
  ok(isLoggingIn == NO, 'isLoginIn is NO');

  start();
}

function checkError() {
  var errorMessage = LoginLogoutSample.loginPageController.get('errorMessage');
  ok(errorMessage.length > 0, 'Error message is: ' + errorMessage);

  var isLoggingIn = LoginLogoutSample.loginPageController.get('isLoggingIn');
  ok(isLoggingIn == NO, 'isLoginIn is NO');

  start();
}

