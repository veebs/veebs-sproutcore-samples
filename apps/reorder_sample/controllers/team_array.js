// ==========================================================================
// Project:   ReorderSample.teamArray
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals ReorderSample */

/**
 * @class
 *
 * Controller for connecting our team records with the view.
 * Delete and re-ordering implemented here.
 *
 * Most of this code just implements the methods set out in the
 * SC.CollectionViewDelegate class.
 *
 * @extends SC.Object
 */
ReorderSample.teamArrayController = SC.ArrayController.create(SC.CollectionViewDelegate, {

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
   * Specifies that data type we are allowed to drag
   */
  collectionViewDragDataTypes: function(view) {
    return [ReorderSample.TeamRecord];
  },

  /**
   Called by a collection view when a drag concludes to give you the option
   to provide the drag data for the drop.

   This method should be implemented essentially as you would implement the
   dragDataForType() if you were a drag data source.  You will never be asked
   to provide drag data for a reorder event, only for other types of data.

   The default implementation returns null.

   @param view {SC.CollectionView}
   the collection view that initiated the drag

   @param dataType {String} the data type to provide
   @param drag {SC.Drag} the drag object
   @returns {Object} the data object or null if the data could not be provided.
   */
  collectionViewDragDataForType: function(view, drag, dataType) {
    if (dataType === ReorderSample.TeamRecord) {
      return view.get('selection');
    }
    return null;
  },

  /**
   Called by the collection view to actually accept a drop.  This method will
   only be invoked AFTER your validateDrop method has been called to
   determine if you want to even allow the drag operation to go through.

   You should actually make changes to the data model if needed here and
   then return the actual drag operation that was performed.  If you return
   SC.DRAG_NONE and the dragOperation was SC.DRAG_REORDER, then the default
   reorder behavior will be provided by the collection view.

   @param view {SC.CollectionView}
   @param drag {SC.Drag} the current drag object
   @param op {Number} proposed logical OR of allowed drag operations.
   @param proposedInsertionIndex {Number} an index into the content array representing the proposed insertion point.
   @param proposedDropOperation {String} the proposed drop operation.  Will be one of SC.DROP_ON, SC.DROP_BEFORE, or SC.DROP_ANY.
   @returns the allowed drag operation.  Defaults to proposedDragOperation
   */
  collectionViewPerformDragOperation: function(view, drag, op, proposedInsertionIndex, proposedDropOperation) {
    // content is just a reference to this object. 
    var content = view.get('content');
    var ret = SC.DRAG_NONE;

    // Continue only if data is available from drag
    var selectionSet = drag.dataForType(ReorderSample.TeamRecord);
    if (!selectionSet) {
      return ret;
    }

    // Get our record - there should only be 1 selection
    var record = selectionSet.firstObject();

    // Suspend notifications for bulk changes to properties
    content.beginPropertyChanges();

    // Re ordering
    var oldIndex = record.get('ranking') - 1;  // -1 to convert from ranking # to index
    if (proposedInsertionIndex < oldIndex) {
      // Move up list
      for (var i = proposedInsertionIndex; i < oldIndex; i++) {
        this.objectAt(i).set('ranking', i + 1 + 1);  // add 1 to convert from ranking to sequence #
      }
    } else {
      // Move down list
      for (var i = oldIndex + 1; i <= proposedInsertionIndex; i++) {
        this.objectAt(i).set('ranking', i - 1 + 1);  // add 1 to convert from ranking to sequence #
      }
    }
    record.set('ranking', proposedInsertionIndex + 1);

    // Restart notifications
    content.endPropertyChanges();

    // Return the requested op, usually SC.DRAG_REORDER, to flag that the event has been handled    
    return op;
  },

  /**
   * Denotes if the data source is ready
   */
  isReady: function() {
    var status = this.get('status');
    return status & SC.Record.READY;
  }.property('status').cacheable(),

  /**
   * Provides a summary of the status of the controller.
   */
  summary: function() {
    var ret = '';

    var status = this.get('status');
    if (status & SC.Record.READY) {
      var len = this.get('length');
      if (len && len > 0) {
        ret = len === 1 ? "1 team" : "%@ teams".fmt(len);
      } else {
        ret = "No teams";
      }
    }
    if (status & SC.Record.BUSY) {
      ret = "Loading..."
    }
    if (status & SC.Record.ERROR) {
      ret = "Error"
    }

    return ret;
  }.property('length', 'status').cacheable()  

});
