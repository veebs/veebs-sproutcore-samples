// ==========================================================================
// Project:   RouteSample - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals RouteSample */

// Page #1
LoginLogoutSample.onePage = SC.Page.design({

  onePane: SC.MainPane.design({
    childViews: 'buttonView'.w(),
    
    buttonView: SC.ButtonView.design({
      layout: { top: 27, left: 27, width: 400 },
      title: 'You are on page #1. Click to go to page #2.',
      action: 'go'
    }),
    
    go: function() {
      SC.routes.set('location', 'twoPage/twoPane');
    }
    
  })

});
