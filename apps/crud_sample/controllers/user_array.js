// ==========================================================================
// Project:   CrudSample.userArrayController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CrudSample */

/** @class

  Controller for an array of user records

 @extends SC.Object
 */
CrudSample.userRecordArrayController = SC.ArrayController.create(SC.CollectionViewDelegate, {

  /**
   * Only allow 1 row to be selected at anyone time.
   * SC.CollectionView looks for this variable in it's content (which is this array) 
   */
  allowsMultipleSelection: NO,
  
  /**
   * Allows this controller to properly respond to ListView delete
   * See http://wiki.sproutcore.com/Todos+05-Finishing+the+UI
   * @param view View calling the delete
   * @param content
   * @param indexes Indexes of the item to be deleted
   */
  collectionViewDeleteContent: function(view, content, indexes) {
    // destroy the records
    var records = indexes.map(function(idx) {
      return this.objectAt(idx);
    }, this);
    records.invoke('destroy');

    var selIndex = indexes.get('min') - 1;
    if (selIndex < 0) {
      selIndex = 0;
    }
    this.selectObject(this.objectAt(selIndex));
  },

  /**
   * Adds a new user and prepares it for editing
   */
  add: function() {
    // Create a new task in the store
    var newUser = CrudSample.store.createRecord(CrudSample.UserRecord);

    // Make the new user the currently selected record in our store so we can edit it
    this.selectObject(newUser);

    return;
  }


});
