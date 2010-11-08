// ==========================================================================
// Project:   ReorderSample.Team
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals ReorderSample */

/**
 * @class
 *
 * Basketball teams to rank
 *
 * @extends SC.Record
 * @version 0.1
 */
ReorderSample.TeamRecord = SC.Record.extend(
  /** @scope ReorderSample.Team.prototype */ {

  ranking: SC.Record.attr(Number, { isRequired: YES }),
  name: SC.Record.attr(String, { isRequired: YES }),
  reason: SC.Record.attr(String, { isRequired: YES })

});
