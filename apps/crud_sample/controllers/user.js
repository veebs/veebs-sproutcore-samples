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
 * To use this controller, set the content by calling createNew() or updateCurrent(). Finish, by calling save() or
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
   * exception like "cannot call method 'get' of null" when it tries to get a property value
   */
  emptyContent: SC.Object.create(),

  /**
   * Current nested content we are proxying
   */
  content: this.emptyContent,

  /**
   * Sets up the content of this controller with a new user record to create
   */
  createNew: function() {
    var ns = CrudSample.store.chain();
    this.set('nestedStore', ns);

    var userRecord = ns.createRecord(CrudSample.UserRecord, {
      status: 'Active',
      isAdmin: NO        
    });
    this.set('content', userRecord);
  },

  /**
   * Sets up the content of this controller with the current record in userController
   * for updating.
   */
  updateCurrent: function() {
    var ns = CrudSample.store.chain();
    this.set('nestedStore', ns);

    // Get the primary key using the 'id' property and NOT 'userID' because sproutcore caches the primary key in an
    // array within the store. When records are created,the primary key in the array is updated but the primary key
    // property in the record is NOT!
    var pk = CrudSample.userController.get('id');
    var userRecord = ns.find(CrudSample.UserRecord, pk);
    this.set('content', userRecord);
  },

  /**
   * Saves changes back to the parent store
   */
  save: function() {
    this.validateRecord();
    
    var nsUserRecord = this.get('content');

    var ns = this.get('nestedStore');
    ns.commitChanges();
    ns.destroy();
    this.set('nestedStore', null);

    var userRecord = CrudSample.store.find(nsUserRecord);
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
    if (userRecord == null) {
      this.set("recordIsChanged", NO);
    } else {
      var status = userRecord.get("status");
      if (status === SC.Record.READY_DIRTY || status === SC.Record.READY_NEW) {
        this.set("recordIsChanged", YES);
      } else {
        this.set("recordIsChanged", NO);
      }
    }
  }.observes("*content.status"),

  /**
   * Checks if the current user's username is valid
   *
   * SC.Error Exception thrown if error. 
   */
  validateUsername: function() {
    var pattern = /^[a-z]+$/
    var nsUserRecord = this.get('content');
    var username = nsUserRecord.get('username');
    if (!SC.empty(username)) {
      if (!pattern.test(username)) {
        throw SC.Error.desc('Username can only contain a-z in lower case and no spaces.', 'username');
      }
    }
    return;
  },

  /**
   * Checks if the current user record is valid
   *
   * SC.Error Exception thrown if error.
   */
  validateRecord: function() {
    var nsUserRecord = this.get('content');

    var userName = nsUserRecord.get('username');
    if (SC.empty(userName)) {
      throw SC.Error.desc('Username is required', 'username');
    } else {
      this.validateUsername();
    }

    var userStatus = nsUserRecord.get('userStatus');
    if (SC.empty(userStatus)) {
      throw SC.Error.desc('Status is required', 'userStatus');
    }

    var isAdmin = nsUserRecord.get('isAdmin');
    if (userStatus == 'InActive' && isAdmin) {
      throw SC.Error.desc('Administrators must be active', 'isAdmin');
    }

    return;
  }


});