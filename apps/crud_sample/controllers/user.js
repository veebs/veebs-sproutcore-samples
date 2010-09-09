// ==========================================================================
// Project:   CrudSample.userController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CrudSample */

/** @class

  Controller for a single user record

 @extends SC.Object
 */
CrudSample.userController = SC.ObjectController.create({

  /**
   * Binds the user record proxied by this controller to the selected
   * user record in the user array controller.
   */
  contentBinding: SC.Binding.single('CrudSample.userArrayController.selection'),

  /**
   * Commits the current record to the server
   */
  save: function() {
    var user = this.get("content");
    if (user && user.isRecord) {
      user.commitRecord();
    }
  }

});
