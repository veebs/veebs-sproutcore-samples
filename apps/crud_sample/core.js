// ==========================================================================
// Project:   CrudSample - Tutorial Application on CRUD operations
// Copyright: ©2010 Vibul Imtarnasan (Veebs).
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*globals CrudSample */

/** @namespace

 Sample application to show CRUD functionality

 @extends SC.Object
 */
CrudSample = SC.Application.create(
  /** @scope CrudSample.prototype */ {

  NAMESPACE: 'CrudSample',
  VERSION: '0.1.0',

  /**
   * Set our store to use our "special" auto id (primary key) number allocation when
   * a record is added CrudSample.AutoIdFixturesDataSource.create()
   */
  //store: SC.Store.create().from(SC.Record.fixtures)
  store: SC.Store.create().from('CrudSample.NumericIdFixturesDataSource')

  // TODO: Add global constants or singleton objects needed by your app here.

});
