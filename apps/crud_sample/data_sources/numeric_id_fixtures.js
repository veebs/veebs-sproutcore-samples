// ==========================================================================
// Project:   CrudSample.AutoIdFixturesDataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CrudSample */

/** @class

 Allocates a numeric id for each record.  The standard fixtures allocates a string in the format like @id8. We just
 want a number.

 @extends SC.FixturesDataSource
 */
CrudSample.NumericIdFixturesDataSource = SC.FixturesDataSource.extend(
  /** @scope CrudSample.AutoIdFixturesDataSource.prototype */ {

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
  }

});
