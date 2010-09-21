// ==========================================================================
// Project:   CrudSample.userController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CrudSample */

/** @class
 * 
 * Controller to proxy the selected user record in userArrayController.
 *
 * @extends SC.ObjectController
 */
CrudSample.userController = SC.ObjectController.create({

  /**
   * Binds the user record proxied by this controller to the selected
   * user record in the user array controller.
   */
  contentBinding: SC.Binding.single('CrudSample.userArrayController.selection')

});

/** @class
 *
 * Nested version of the userController. This controller allows us to edit a record and then discard/commit changes.
 *
 * If we were to edit the record in userController, there is no ability to discard changes.  Also any changes are
 * immediately displayed on all bound controls.
 *
 * To use this controller, set the content by calling loadNew() or loadCurrent(). Finish, by calling save() or
 * discard(). 
 * 
 * @extends SC.Object
 */
CrudSample.userNestedController = SC.ObjectController.create({

  /**
   * Boolean flag to denote if the record has change (is dirty)
   */
  recordIsChanged: NO,

  /**
   * Nested store that was used to retrieve the record
   */
  nestedStore: null,

  /**
   * Empty object that we use to set the content so that any views bound to this content will not throw an
   * exception like "cannot call method 'get' of null"
   */
  emptyContent: SC.Object.create(),

  /**
   * Current nested content we are proxying 
   */
  content: this.emptyContent,

  /**
   * Sets up the content of this controller with a new user record to edit
   */
  loadNew: function() {
    var ns = CrudSample.store.chain();
    this.set('nestedStore', ns);

    var user = CrudSample.UserModel.create();
    this.set('content', user);
  },

  /**
   * Sets up the content of this controller with the current record in userController.
   */
  loadCurrent: function() {
    var ns = CrudSample.store.chain();
    this.set('nestedStore', ns);

    var pk = CrudSample.userController.get('userID');
    var user = ns.find(CrudSample.UserModel, pk);
    this.set('content', user);
  },

  /**
   * Saves changes back to the parent store
   */
  save: function() {
    var ns = this.get('nestedStore');
    ns.commitChanges();
    ns.destroy();
    this.set('nestedStore', null);

    var userRecord = CrudSample.userController.get("content");
    userRecord.commitRecord();

    this.set('content', this.emptyContent);
  },

  /**
   * Discard changes
   */
  discard: function() {
    var ns = this.get('nestedStore');
    ns.discardChanges();
    ns.destroy();
    this.set('nestedStore', null);

    this.set('content', this.emptyContent);

  },

  /**
   * Listens to changes in content and/or content status property of the ObjectController by observing the
   * pattern "*content.status".  We set the recordIsChanged property to YES if the record is dirty or new.
   */
  recordStateDidChange: function() {
    var userRecord = this.get("content");
    if (userRecord.get("status") === SC.Record.READY_DIRTY ||
      userRecord.get("status") === SC.Record.READY_NEW) {
      this.set("recordIsChanged", YES);
    } else {
      this.set("recordIsChanged", NO);
    }
  }.observes("*content.status")


});