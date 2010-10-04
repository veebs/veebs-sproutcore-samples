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
CrudSample.userRecordController = SC.ObjectController.create({

  /**
   * Binds the user record proxied by this controller to the selected
   * user record in the user array controller.
   */
  contentBinding: SC.Binding.single('CrudSample.userRecordArrayController.selection')

});

/** @class
 *
 * Controller used by views to CRUD user records.
 *
 * If we were to edit the record in userController, there is no ability to discard changes.  Also any changes are
 * immediately displayed on all bound controls.
 *
 * To use this controller, set the content by calling createNew() or updateCurrent(). Finish, by calling save() or
 * discard().
 *
 * @extends SC.Object
 */
CrudSample.userViewController = SC.ObjectController.create({

  /**
   * Boolean flag to denote if the record has change (is dirty)
   */
  contentIsChanged: NO,

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
   * Target to callback when saving is finished
   */
  savingCallbackTarget: null,

  /**
   * Method of target to callback when saving is finished
   */
  savingCallbackMethod: null,

  /**
   * The user record in the store that in being saved. NOTE - this is the actual record out of the store and not
   * the temporary record from the nested store.
   */
  savingUserRecord: null,

  /**
   * If editing, we store the original properties just in case saving fails and we have to restore the original values 
   */
  originalProperties: null,

  /**
   * Sets up the content of this controller with a new user record to create
   */
  createNew: function() {
    var ns = CrudSample.store.chain();
    var nsUserRecord = ns.createRecord(CrudSample.UserRecord, {
      status: 'Active',
      isAdmin: NO
    });

    this._reset(ns, nsUserRecord, null);
  },

  /**
   * Sets up the content of this controller with the current record in userController
   * for updating.
   */
  updateCurrent: function() {
    // Get the primary key using the 'id' property and NOT 'userID' because sproutcore caches the primary key in an
    // array within the store. When records are created,the primary key in the array is updated but the primary key
    // property in the record is NOT!
    var ns = CrudSample.store.chain();
    var pk = CrudSample.userRecordController.get('id');
    var nsUserRecord = ns.find(CrudSample.UserRecord, pk);

    this._reset(ns, nsUserRecord, nsUserRecord.backupProperties());
  },

  /**
   * Reset our state so that we are ready to add or edit a record
   *
   * @param {SC.NestedStore} Nested Data store for this editing session
   * @param {CrudSample.UserRecord} user record from the nested store that we are going to edit. This will be set
   *  as the content of this controller.
   * @param {SC.Object} object containing properties of the original record we are editing
   */
  _reset: function(ns, nsUserRecord, originalProperties) {
    this.set('savingUserRecord', null);
    this.set('savingCallbackTarget', null);
    this.set('savingCallbackMethod', null);
    this.set('nestedStore', ns);
    this.set('content', nsUserRecord);
    this.set('originalProperties', originalProperties);
  },

  /**
   * Saves changes back to the parent store
   *
   * @param {Object} callbackTarget Insurance of object containing the callbackMethod
   * @param {Method} callbackMethod Method to callback when save is complete.
   */
  save: function(callbackTarget, callbackMethod) {
    this.validateRecord();

    var nsUserRecord = this.get('content');
    var ns = this.get('nestedStore');
    ns.commitChanges();
    ns.destroy();

    var userRecord = CrudSample.store.find(nsUserRecord);
    this.set('savingUserRecord', userRecord);
    this.set('savingCallbackTarget', callbackTarget);
    this.set('savingCallbackMethod', callbackMethod);
    userRecord.commitRecord();
  },

  /**
   * Wait for user record being save to be saved and check for error
   */
  savingUserRecordStatusDidChange: function() {
    var userRecord = this.get('savingUserRecord');
    if (userRecord != null) {
      var callbackTarget = this.get('savingCallbackTarget');
      var callbackMethod = this.get('savingCallbackMethod');
      var status = userRecord.get("status");
      if (status === SC.Record.READY_CLEAN) {
        // Saved OK - select object in UI
        CrudSample.userRecordArrayController.selectObject(userRecord);

        // Callback UI to clean up
        callbackMethod.call(callbackTarget, null);

        // Init variables to get read for next view session
        this._reset(null, this.emptyContent, null);
      } else {
        // Error
        if (userRecord.get('isError')) {
          callbackMethod.call(callbackTarget, userRecord.get('errorObject'));
          this.fixSaveError(userRecord);
        }
      }
    }
  }.observes('*savingUserRecord.status'),

  /**
   * Sets up the content of this controller with the current record for which there's been an error.
   * When an error happens, the error record is sitting in our main store.
   *
   * @param {CrudSample.UserRecord} userRecord in the store that is to be loaded for fixing
   */
  fixSaveError: function(userRecord) {
    var store = userRecord.get('store');
    var isCreating = SC.none(userRecord.get('id'));
    var nsUserRecord;

    var ns = CrudSample.store.chain();

    if (isCreating) {
      // Was adding. Delete from store and try again.
      // Backup and restore properties so the user don't have to re-key
      var backup = userRecord.backupProperties();
      userRecord.destroy();
      nsUserRecord = ns.createRecord(CrudSample.UserRecord, {});
      nsUserRecord.restoreProperties(backup);
    } else {
      // Was updating, we change status to READY_DIRTY and try again
      nsUserRecord = ns.materializeRecord(userRecord.get('storeKey'));
      store.writeStatus(userRecord.get('storeKey'), SC.Record.READY_DIRTY);
      userRecord.propertyDidChange('status');
    }

    this._reset(ns, nsUserRecord, this.get('originalProperties'));
  },

  /**
   * Discard changes
   */
  discard: function() {
    var ns = this.get('nestedStore');
    ns.discardChanges();
    ns.destroy();

    // If updating and there was an error in the save, we have to restore our properties and reset the
    // record to clean (alternatively, we can reload the record from the data store)
    var nsUserRecord = this.get('content');
    if (!SC.none(nsUserRecord.get('id')))  {
      var userRecord = CrudSample.store.find(nsUserRecord);
      var store = userRecord.get('store');
      var status = userRecord.get("status");
      if (status === SC.Record.READY_DIRTY) {
        userRecord.restoreProperties(this.get('originalProperties'));
        store.writeStatus(userRecord.get('storeKey'), SC.Record.READY_CLEAN);
        userRecord.propertyDidChange('status');
      }
    }

    // Init for next time
    this._reset(null, this.emptyContent, null);
  },

  /**
   * Listens to changes in content and/or content status property of the ObjectController by observing the
   * pattern "*content.status".  We set the contentIsChanged property to YES if the record is dirty or new.
   */
  contentStatusDidChange: function() {
    var userRecord = this.get('content');
    if (userRecord == null) {
      this.set('contentIsChanged', NO);
    } else {
      var status = userRecord.get("status");
      if (status === SC.Record.READY_DIRTY || status === SC.Record.READY_NEW) {
        this.set('contentIsChanged', YES);
      } else {
        this.set('contentIsChanged', NO);
      }
    }
  }.observes('*content.status'),

  /**
   * Checks if the current user's username is valid.  This is an example of a field level check.
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
   * Checks if the current user record is valid. This is an example of a page check.
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