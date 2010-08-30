// ==========================================================================
// Project:   LoginSample - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LoginSample */

/** @class
  
  The mainPage is displayed after login.
  
*/
LoginSample.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'labelView'.w(),
    
    labelView: SC.LabelView.design({
      layout: { centerX: 0, centerY: 0, width: 300, height: 18 },
      textAlign: SC.ALIGN_CENTER,
      tagName: "h1", 
      value: "Welcome to SproutCore! You are now logged in."
    })
  })

});
