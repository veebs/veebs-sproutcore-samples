// ==========================================================================
// Project:   CrudSample - Tutorial Application on CRUD operations
// Copyright: ©2010 Vibul Imtarnasan (Veebs).
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/** @class
 *
 * Overrides the standard fixtures datasource with the following features:
 *
 * - Allocates a numeric id for each record.  The standard fixtures allocates a string in the format like @id8.
 *   We just want a number.
 * - Provide latency in order to simulate a proper call to a remote server.
 * - Simulate server side error in checking for unique usernames
 * 
 *
 * @extends SC.FixturesDataSource
 */
CrudSample.NumericIdFixturesDataSource = SC.FixturesDataSource.extend(
  /** @scope CrudSample.AutoIdFixturesDataSource.prototype */ {

  /**
   * Let's simulate calling a remote server for CRUD operations
   */
  simulateRemoteResponse: YES,

  /**
   * Assume we have a slow server that takes 1 second to respond
   */
  latency: 1000,

  /**
   * The next number to allocate to a primary key
   */
  nextNumber: 1000000,

  /**
   * Override this method so that we can allocate ID based on a number that starts at 1,000,000.  We don't start at
   * 1 because that is within range of our primary key in our fixtures.  We also want to return a number and not a
   * string.
   *
   * @param recordType
   * @param dataHash
   * @param store
   * @param storeKey
   */
  generateIdFor: function(recordType, dataHash, store, storeKey) {
    return this.nextNumber++;
  },

  /**
   * Override _createRecords so that we can check for unique usernames
   *
   * @param store
   * @param storeKeys
   */
  _createRecords: function(store, storeKeys) {
    storeKeys.forEach(function(storeKey) {
      try {
        var id = store.idFor(storeKey),
          recordType = store.recordTypeFor(storeKey),
          dataHash = store.readDataHash(storeKey),
          fixtures = this.fixturesFor(recordType);

        this.validateUniqueUsername(dataHash);

        if (!id) {
          id = this.generateIdFor(recordType, dataHash, store, storeKey);
        }
        this._invalidateCachesFor(recordType, storeKey, id);
        fixtures[id] = dataHash;
        store.dataSourceDidComplete(storeKey, null, id);

      } catch (e) {
        // We have an error
        store.dataSourceDidError(storeKey, e);
      }
    }, this);
  },

  /**
   * Override _updateRecords so that we can check for unique usernames
   * @param store
   * @param storeKeys
   */
  _updateRecords: function(store, storeKeys) {
    storeKeys.forEach(function(storeKey) {
      try {
        var hash = store.readDataHash(storeKey);
        this.validateUniqueUsername(hash);
        this.setFixtureForStoreKey(store, storeKey, hash);
        store.dataSourceDidComplete(storeKey);
      } catch (e) {
        // We have an error
        store.dataSourceDidError(storeKey, e);
      }
    }, this);
  },

  /**
   * Checks if the username is unique in local store
   * This simulates checking on the server side
   *
   * @param storeKey Store key of the user record to check
   * @throws SC.Error
   */
  validateUniqueUsername: function(dataHash) {
    var username = dataHash.username;
    var query = SC.Query.local(CrudSample.UserRecord, {
      conditions: '(username = {name})',
      name: username
    });
    var userRecords = CrudSample.store.find(query);
    var count = userRecords.get('length');
    if (count == 0) {
      return;
    } else {
      if (count == 1) {
        // Check that we are not matching ourselves
        var dataHashPrimaryKey = dataHash.userId;
        if (dataHashPrimaryKey && dataHashPrimaryKey != undefined) {
          var primaryKey = userRecords.objectAt(0).get('id');
          if (dataHashPrimaryKey != primaryKey) {
            throw SC.Error.desc('Username already exists', 'username');
          }
        }
      } else {
        // Error - more than 1 match for whatever reason
        throw SC.Error.desc('Username already exists', 'username');
      }
    }
  }


});
