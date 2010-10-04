// ==========================================================================
// Project:   CrudSample - Tutorial Application on CRUD operations
// Copyright: ©2010 Vibul Imtarnasan (Veebs).
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/** @class

  Model of our user record

 @extends SC.Record
 @version 0.1
 */
CrudSample.UserRecord = SC.Record.extend({

  //
  // sc-gen model CrudSample.User
  //
  // The valid types are standard Javascript types: String, Number, Boolean or Date
  //
  // See properties of SC.RecordAttribute class/
  //
  // title: SC.Record.attr(String, {
  // defaultValue: 'Untitled',
  // key: null,
  // isRequired: YES|NO,
  // isEditable: YES|NO,
  // useIsoDate: YES|NO,
  // aggregate: YES|NO
  // })
  //
  // Reserved attribute names  
  // store - points to the store that owns the record
  // storeKey - an internal reference used to find the record data in the store
  // status - the current record status.  changes when a record is busy loading, dirty, etc.
  // attributes - the underlying data hash behind the record
  //
  // Always use Iso Date to avoid confusion between local and utc times
  //

  properties: 'userID username department userStatus isAdminString lastLoggedInDate'.w(),

  primaryKey: 'userID',

  userID: SC.Record.attr(Number),     //not required on create

  username: SC.Record.attr(String, { isRequired: YES }),

  department: SC.Record.attr(String),

  userStatus: SC.Record.attr(String, { isRequired: YES, key: "status" }),

  isAdmin: SC.Record.attr(Boolean, { defaultValue: NO,  isRequired: YES }),

  /**
   * Convert our boolean value into string because SelectFieldView converts 'false' to 'false'
   * rather than '(False)' as returned by SC.guidFor() (into which the bound value is passed).
   * This means, that No cannot be selected because '(False)' != 'False'.
   */
  isAdminString: function(key, value) {
    // writing
    if (value !== undefined) {
      this.writeAttribute('isAdmin', value == 'YES' ? YES : NO);  // write into data hash
    }

    // reading
    value = this.readAttribute('isAdmin');
    value = value ? 'YES' : 'NO';

    return value;
  }.property().cacheable(),

  lastLoggedInDate: SC.Record.attr(SC.DateTime, {userIsoDate: YES}),

  /**
   * Return an object containing a backup of the properties
   * @returns SC.Object object containing properties to backup
   */
  backupProperties: function() {
    var backup = SC.Object.create();
    for (var i = 0; i < this.properties.length; i++) {
      var p = this.properties[i];
      backup.set(p, this.get(p));
    }
    return backup;
  },

  /**
   * Restores properties from a backup crated by backupProperties().
   */
  restoreProperties: function(backup) {
    for (var i = 0; i < this.properties.length; i++) {
      var p = this.properties[i];
      this.set(p, backup.get(p));
    }
    return;
  }


});
