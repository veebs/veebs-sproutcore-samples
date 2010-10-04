// ==========================================================================
// Project:   LoginLogoutSample - Tutorial Application to login/logout
// Copyright: ©2010 Vibul Imtarnasan (Veebs).
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

// Page #2
LoginLogoutSample.twoPage = SC.Page.design({

  twoPane: SC.MainPane.design({
    childViews: 'labelView buttonView logoutButtonView'.w(),
    
    labelView: SC.LabelView.design({
      layout: { top: 20, left: 27, width: 400, height: 20 },
      value: 'You are on page #2.',
      classNames: ['title2']
    }),

    buttonView: SC.ButtonView.design({
      layout: { top: 70, left: 27, width: 400 },
      title: 'Click to go to page #1.',
      action: 'go'
    }),
    
    logoutButtonView: SC.ButtonView.design({
      layout: { top: 110, left: 27, width: 400 },
      title: 'Logout',
      action: 'goLogout'
    }),

    go: function() {
      SC.routes.set('location', 'onePage/onePane');
    },
    
    goLogout: function() {
      SC.routes.set('location', 'logoutPage/logoutPane');
    }

  })

});
