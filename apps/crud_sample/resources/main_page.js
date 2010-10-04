// ==========================================================================
// Project:   CrudSample - Tutorial Application on CRUD operations
// Copyright: ©2010 Vibul Imtarnasan (Veebs).
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*globals CrudSample */

// This page describes the main user interface for your application.
CrudSample.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'middleView topView bottomView'.w(),

    topView: SC.ToolbarView.design({
      layout: { top: 0, left: 0, right: 0, height: 36 },
      childViews: 'titleLabel addButton'.w(),
      anchorLocation: SC.ANCHOR_TOP,

      titleLabel: SC.LabelView.design({
        layout: { centerY: 0, height: 24, left: 8, width: 200 },
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT,
        value:   'Users'
      }),

      addButton: SC.ButtonView.design({
        layout: { centerY: 0, height: 24, right: 12, width: 100 },
        title:  'Add User',
        target: 'CrudSample.mainPage.detailPane',
        action: 'showForCreate',
        isEnabledBinding: 'CrudSample.userRecordArrayController.isReady'
      })
    }),

    middleView: SC.ScrollView.design({
      hasHorizontalScroller: NO,
      layout: { top: 36, bottom: 32, left: 0, right: 0 },
      backgroundColor: 'white',

      contentView: SC.TableView.design({
        layout: { left: 15, right: 15, top: 15, bottom: 15 },
        backgroundColor: "white",
        columns: [
          SC.TableColumn.create({
            key:   'username',
            label: 'Username',
            width: 100
          }),
          SC.TableColumn.create({
            key:   'department',
            label: 'Department',
            width: 200
          }),
          SC.TableColumn.create({
            key:   'userStatus',
            label: 'User Status',
            width: 100
          }),
          SC.TableColumn.create({
            key:   'isAdmin',
            label: 'Is Admin?',
            formatter: function(v) {
              return v ? 'Yes' : 'No';
            },
            width: 100
          }),
          SC.TableColumn.create({
            key:   'lastLoggedInDate',
            label: 'Last Logged In Date',
            formatter: function(v) {
              return v == null ? '' : v.toFormattedString('%Y-%m-%d %H:%M:%S %Z');
            },
            width: 300
          })
        ],
        contentBinding:   'CrudSample.userRecordArrayController.arrangedObjects',
        selectionBinding: 'CrudSample.userRecordArrayController.selection',
        selectOnMouseDown: YES,
        canDeleteContent: YES,
        exampleView: SC.TableRowView,
        recordType: CrudSample.UserRecord,
        target: "CrudSample.mainPage.detailPane",
        action: "showForUpdate"
      })
    }),

    bottomView: SC.ToolbarView.design({
      layout: { bottom: 0, left: 0, right: 0, height: 32 },
      childViews: 'summaryLabel'.w(),
      anchorLocation: SC.ANCHOR_BOTTOM,

      summaryLabel: SC.LabelView.design({
        layout: { centerY: 0, height: 18, left: 20, right: 20 },
        valueBinding: 'CrudSample.userRecordArrayController.summary'
      })
    })

  }),  // mainPane

  detailPane: SC.PanelPane.create({
    layout: { width:400, height:250, centerX:0, centerY:-50},

    contentView: SC.View.extend({
      childViews: 'title username department userStatus isAdmin lastLoggedInDate savingImage savingMessage deleteButton saveButton cancelButton'.w(),

      title: SC.LabelView.design({
        layout: { left: 17, right: 17, top: 17, height: 26 },
        value: 'User Details',
        textAlign: SC.ALIGN_CENTER,
        fontWeight: SC.BOLD_WEIGHT
      }),

      username: SC.View.design({
        layout: { left: 17, right: 17, top: 44, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 95, height: 18, centerY: 0 },

          value: 'Username',
          textAlign: SC.ALIGN_RIGHT,
          fontWeight: SC.BOLD_WEIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 250, height: 22, right: 3, centerY: 0 },
          valueBinding: 'CrudSample.userViewController.username',
          isEnabledBinding: 'CrudSample.mainPage.detailPane.isEnabled'
        })
      }),

      department: SC.View.design({
        layout: { left: 17, right: 17, top: 71, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 95, height: 18, centerY: 0 },

          value: 'Department',
          textAlign: SC.ALIGN_RIGHT,
          fontWeight: SC.BOLD_WEIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 250, height: 22, right: 3, centerY: 0 },
          valueBinding: 'CrudSample.userViewController.department',
          isEnabledBinding: 'CrudSample.mainPage.detailPane.isEnabled'
        })
      }),

      userStatus: SC.View.design({
        layout: { left: 17, right: 17, top: 98, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 95, height: 18, centerY: 0 },

          value: 'User Status',
          textAlign: SC.ALIGN_RIGHT,
          fontWeight: SC.BOLD_WEIGHT
        }),

        field: SC.SelectFieldView.design({
          layout: { width: 250, height: 22, right: 3, centerY: 0 },

          objects: [
            {name:'Active', value: 'Active'},
            {name:'InActive', value: 'InActive'},
            {name:'Locked', value: 'Locked;'},
          ],
          nameKey: 'name',
          valueKey: 'value',

          acceptsFirstResponder: function() {
            return this.get('isEnabled');
          }.property('isEnabled'),

          valueBinding: 'CrudSample.userViewController.userStatus',
          isEnabledBinding: 'CrudSample.mainPage.detailPane.isEnabled'
        })

      }),

      isAdmin: SC.View.design({
        layout: { left: 17, right: 17, top: 125, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 95, height: 18, centerY: 0 },

          value: 'Is Admin',
          textAlign: SC.ALIGN_RIGHT,
          fontWeight: SC.BOLD_WEIGHT
        }),

        field: SC.SelectFieldView.design({
          layout: { width: 250, height: 22, right: 3, centerY: 0 },

          objects: [
            {name:'Yes', value: 'YES'},
            {name:'No', value: 'NO'},
          ],
          nameKey: 'name',
          valueKey: 'value',

          acceptsFirstResponder: function() {
            return this.get('isEnabled');
          }.property('isEnabled'),

          valueBinding: 'CrudSample.userViewController.isAdminString',
          isEnabledBinding: 'CrudSample.mainPage.detailPane.isEnabled'
        })
      }),

      lastLoggedInDate: SC.View.design({
        layout: { left: 17, right: 17, top: 152, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 95, height: 18, centerY: 0 },

          value: 'Last Logged In Date',
          textAlign: SC.ALIGN_RIGHT,
          fontWeight: SC.BOLD_WEIGHT
        }),

        field: SC.LabelView.design({
          layout: { width: 250, height: 22, right: 3, centerY: 0, top: 4 },
          valueBinding: 'CrudSample.userViewController.lastLoggedInDate',
          formatter: function(v) {
            if (SC.kindOf(v, SC.DateTime)) {
              return v == null ? '' : v.toFormattedString('%Y-%m-%d %H:%M:%S %Z');
            } else {
              return '';
            }
          }
        })
      }),

      savingImage: SC.ImageView.design({
        layout: { bottom: 15, left: 175, height:16, width: 16 },
        value: sc_static('images/loading'),
        useImageCache: NO,
        isVisibleBinding: SC.Binding.from('CrudSample.mainPage.detailPane.isEnabled').bool().transform(
          function(value, isForward) {
            return !value;
          })
      }),

      savingMessage: SC.LabelView.design({
        layout: { bottom: 8, left: 195, height:24, width: 100 },
        value: 'Saving ...',
        classNames: ['saving-message'],
        isVisibleBinding: SC.Binding.from('CrudSample.mainPage.detailPane.isEnabled').bool().transform(
          function(value, isForward) {
            return !value;
          })
      }),

      deleteButton: SC.ButtonView.design({
        layout: {bottom: 10, left: 20, height:24, width:80},
        title: 'Delete',
        action: 'deleteRecord',
        isVisibleBinding: SC.Binding.from('CrudSample.userViewController.contentIsChanged').bool().transform(
          function(value, isForward) {
            return !value;
          })
      }),

      saveButton: SC.ButtonView.design({
        layout: {bottom: 10, right: 110, height:24, width:80},
        title: 'Save',
        action: 'save',
        isDefault: YES,
        isEnabledBinding: 'CrudSample.userViewController.contentIsChanged',
        isVisibleBinding: 'CrudSample.mainPage.detailPane.isEnabled'
      }),

      cancelButton: SC.ButtonView.design({
        layout: {bottom: 10, right: 20, height:24, width:80},
        title: 'Cancel',
        action: 'cancel',
        isCancel: YES,
        isVisibleBinding: 'CrudSample.mainPage.detailPane.isEnabled'
      })
    }),

    /**
     * Methods to show/hide the details pane
     * Thanks Charles:
     * http://markmail.org/message/miobpqe7y34w7rht#query:sproutcore%20panelpane+page:1+mid:miobpqe7y34w7rht+state:results
     */
    detailIsVisible: NO,

    /**
     * observer - show/hide panel
     */
    detailIsVisibleDidChange: function() {
      var panel = CrudSample.mainPage.get('detailPane');
      if (this.get('detailIsVisible')) {
        // Show
        panel.append();
        // Set focus on the username field
        CrudSample.mainPage.detailPane.contentView.username.field.becomeFirstResponder();
      }
      else {
        // Hide
        panel.remove();
      }
    }.observes('detailIsVisible'),

    /**
     * Show this form for a new user
     */
    showForCreate: function() {
      this.set('detailIsVisible', YES);
      CrudSample.userViewController.createNew();
    },

    /**
     * Show this form and load details of the current user for editing
     */
    showForUpdate: function() {
      this.set('detailIsVisible', YES);
      CrudSample.userViewController.updateCurrent();
    },

    /**
     * Save changes
     * Note that the save button is only visible if there has been changes in the current user record
     */
    save: function() {
      try {
        this.set('isEnabled', NO);
        CrudSample.userViewController.save(this, this.saveComplete);
      } catch (e) {
        this.showError(e);
        this.set('isEnabled', YES);
      }
    },

    /**
     * Check if saving has finished
     */
    saveComplete: function(errorObject) {
      this.set('isEnabled', YES);
      if (SC.none(errorObject)) {
        this.set('detailIsVisible', NO);
      } else {
        this.showError(errorObject);
      }
    },

    /**
     * Discard changes
     */
    cancel: function() {
      CrudSample.userViewController.discard();
      this.set('detailIsVisible', NO);
    },

    /**
     * Delete current user.
     * Note that the delete button is only visible if there are no changes to the current user being edited
     */
    deleteRecord: function() {
      CrudSample.userViewController.discard();
      CrudSample.mainPage.mainPane.middleView.contentView.deleteSelection();
      this.set('detailIsVisible', NO);
    },

    /**
     * Show an error message
     * @param e Error object to show
     */
    showError: function(e) {
      if (SC.instanceOf(e, SC.Error)) {
        SC.AlertPane.error(e.message);
        if (!SC.empty(e.label)) {
          var view = CrudSample.mainPage.detailPane.contentView.getPath(e.label);
          if (view) {
            view.field.becomeFirstResponder();
          }
        }
      } else {
        SC.AlertPane.error(e);
      }

    }

  })  //detailPane

}); // mainPage

