// ==========================================================================
// Project:   Login - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Login */

/** @class

  The loginPage is displayed upon application startup.  See /login_sample/main.js.

 */
LoginLogoutSample.loginPage = SC.Page.design({

  loginPane:  SC.MainPane.design({
    layout: { width: 360, height: 160, centerX: 0, centerY: 0 },
    classNames: ['login-pane'],
    childViews: 'boxView'.w(),

    boxView: SC.View.design({
      childViews: 'username password rememberMe loginButton loadingImage errorMessage'.w(),

      username: SC.View.design({
        layout: { left: 17, right: 14, top: 17, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 107, height: 18, centerY: 0 },

          value: '_Username',
          localize: YES,
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 200, height: 22, right: 3, centerY: 0 },

          nextKeyView: 'password',
          isEnabledBinding: SC.Binding.from("LoginLogoutSample.loginPageController.isLoggingIn")
            .bool()
            .transform(function(value, isForward) {
            return !value;
          }),
          valueBinding: 'LoginLogoutSample.loginPageController.username'
        })
      }),

      password: SC.View.design({
        layout: { left: 17, right: 14, top: 45, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 107, height: 18, centerY: 0 },

          value: '_Password',
          localize: YES,
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 200, height: 22, right: 3, centerY: 0 },

          isPassword: YES,
          nextKeyView: 'rememberMe',
          isEnabledBinding: SC.Binding.from("LoginLogoutSample.loginPageController.isLoggingIn")
            .bool()
            .transform(function(value, isForward) {
            return !value;
          }),
          valueBinding: 'LoginLogoutSample.loginPageController.password'
        })
      }),

      rememberMe: SC.View.design({
        layout: { left: 17, right: 14, top: 72, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 107, height: 18, centerY: 0 },

          value: '_RememberMe',
          localize: YES,
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.SelectFieldView.design({
          layout: { width: 200, height: 22, right: 3, centerY: 0 },

          objects: [
            {name:'For 3 Seconds', value:'3seconds'},
            {name:'Until the browser is closed', value:'closeBrowser'},
            {name:'For 1 year', value:'1year'}
            ],
          nameKey: 'name',
          valueKey: 'value',

          nextKeyView: 'loginButton',
          isEnabledBinding: SC.Binding.from("LoginLogoutSample.loginPageController.isLoggingIn")
            .bool()
            .transform(function(value, isForward) {
            return !value;
          }),
          valueBinding: 'LoginLogoutSample.loginPageController.rememberMe'
        })
      }),

      loginButton: SC.ButtonView.design({
        layout: { height: 24, width: 80, bottom: 17, right: 17 },
        title: '_Login',
        localize: YES,
        isDefault: YES,
        isEnabledBinding: SC.Binding.from("LoginLogoutSample.loginPageController.isLoggingIn")
          .bool()
          .transform(function(value, isForward) {
          return !value;
        }),

        target: 'LoginLogoutSample.loginPageController',
        action: 'beginLogin'
      }),

      loadingImage: SC.ImageView.design({
        layout: { width: 16, height: 16, bottom: 20, right: 110 },
        value: sc_static('images/loading'),
        useImageCache: NO,
        isVisibleBinding: 'LoginLogoutSample.loginPageController.isLoggingIn'
      }),

      errorMessage: SC.LabelView.design({
        layout: { height: 40, width: 230, right: 120, bottom: 7 },
        classNames: ['error-message'],

        valueBinding: 'LoginLogoutSample.loginPageController.errorMessage'
      })

    })  //contentView

  })  //loginPane

}); //loginPage
