// ==========================================================================
// Project:   ReorderSample.TeamView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals ReorderSample */

/**
 * @class
 *
 * Custom list view to display team rankings
 *
 * @extends SC.View
 */
ReorderSample.TeamView = SC.View.extend(SC.ContentDisplay, {

  layout: { left: 10 },

  classNames: ['team-view'],

  /**
   * List of content (TeamRecord) properties that needs to trigger a re-rendering when the property is changed
   *
   * Add an array with the names of any property on the content object that
   * should trigger an update of the display for your view.  Changes to the
   * content object will only invoke your display method once per runloop.
   *
   * @property {Array}
   */
  contentDisplayProperties: 'ranking name reason'.w(),

  /**
   * Flag so that we know if the mouse if hovering over this item or not
   */
  isHovering: NO,

  /**
   * List of view properties that needs to trigger a re-rendering when the property is changed.
   * We want to re-render when hovering so that we can hi-light the row 
   */
  displayProperties: 'isHovering isSelected'.w(),

  /**
   * When the mouse is over this view, set the isHovering flag in order to trigger hi-lighting
   */
  mouseEntered: function() {
    this.set('isHovering', YES);
  },

  /**
   * When the mouse leaves this view, set the isHovering flag in order to turn off hi-lighting
   */
  mouseExited: function() {
    this.set('isHovering', NO);
  },

  /**
   * Render our row 
   *
   * @param context
   * @param firstTime
   */
  render: function(context, firstTime) {
    var ranking = '';
    var name = '';
    var reason = '';
    var content = this.get('content');
    if (content != null) {
      ranking = content.get('ranking') + '.';
      name = content.get('name');
      reason = content.get('reason');
    }

    // If hovering, add the hovering CSS class to the DIV that is this view
    if (this.get('isSelected')) {
      context.setClass('team-view-selected', this.get('isSelected'));
    } else {
      context.setClass('team-view-hover', this.get('isHovering'));
    }

    // Output HTML. Create inner DIV to show our data
    context = context.begin('div').addClass('team-view-topfiller').push('&nbsp;').end();
    context = context.begin('div').addClass('team-view-line1').push(ranking + ' ' + name).end();
    context = context.begin('div').addClass('team-view-line2').push(reason).end();
    context = context.begin('div').addClass('team-view-bottomfiller').push('&nbsp;').end();

    sc_super();
  }
});
