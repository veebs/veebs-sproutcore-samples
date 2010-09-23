// ==========================================================================
// Project:   RouteSample - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals RouteSample */

// Page #1
LoginLogoutSample.onePage = SC.Page.design({

  onePane: SC.MainPane.design({
    childViews: 'labelView buttonView logoutButtonView'.w(),
    
    labelView: SC.LabelView.design({
      layout: { top: 20, left: 27, width: 400, height: 20 },
      value: 'You are on page #1.',
      classNames: ['title1']
    }),

    buttonView: SC.ButtonView.design({
      layout: { top: 70, left: 27, width: 400 },
      title: 'Click to go to page #2.',
      action: 'go'
    }),
    
    logoutButtonView: SC.ButtonView.design({
      layout: { top: 110, left: 27, width: 400 },
      title: 'Logout',
      action: 'goLogout'
    }),

    go: function() {
      SC.routes.set('location', 'twoPage/twoPane');
    },
    
    goLogout: function() {
      SC.routes.set('location', 'logoutPage/logoutPane');
    }
    
  })

});
