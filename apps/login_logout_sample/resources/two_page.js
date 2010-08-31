// ==========================================================================
// Project:   RouteSample - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals RouteSample */

// Page #2
LoginLogoutSample.twoPage = SC.Page.design({

  twoPane: SC.MainPane.design({
    childViews: 'buttonView logoutButtonView'.w(),
    
    buttonView: SC.ButtonView.design({
      layout: { top: 27, left: 27, width: 400 },
      title: 'You are on page #2. Click to go to page #1.',
      action: 'go'
    }),
    
    logoutButtonView: SC.ButtonView.design({
      layout: { top: 60, left: 27, width: 400 },
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
