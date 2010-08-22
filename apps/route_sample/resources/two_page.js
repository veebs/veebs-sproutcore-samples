// ==========================================================================
// Project:   RouteSample - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals RouteSample */

// Page #2
RouteSample.twoPage = SC.Page.design({

  twoPane: SC.MainPane.design({
    childViews: 'buttonView'.w(),
    
    buttonView: SC.ButtonView.design({
      layout: { top: 27, left: 27, width: 400 },
      title: 'You are on page #2. Click to go to page #1.',
      action: 'go'
    }),
    
    go: function() {
      SC.routes.set('location', 'onePage/onePane');
    }
    
  })

});
