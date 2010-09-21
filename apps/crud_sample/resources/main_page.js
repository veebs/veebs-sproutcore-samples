// ==========================================================================
// Project:   CrudSample - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CrudSample */

CrudSample.TableRowView = SC.TableRowView.extend({

});

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
        title:  'Add User'
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
        contentBinding:   'CrudSample.userArrayController.arrangedObjects',
        selectionBinding: 'CrudSample.userArrayController.selection',
        exampleView: CrudSample.TableRowView,
        recordType: CrudSample.UserModel,
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
        textAlign: SC.ALIGN_CENTER,

        value: "User Count"
      })
    })

  }),  // mainPane

  detailPane: SC.PanelPane.create({
    layout: { width:400, height:250, centerX:0, centerY:-50},

    contentView: SC.View.extend({
      childViews: 'title username department userStatus isAdmin lastLoggedInDate saveButton cancelButton'.w(),

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
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 250, height: 22, right: 3, centerY: 0 },
          valueBinding: 'CrudSample.userNestedController.username'
        })
      }),

      department: SC.View.design({
        layout: { left: 17, right: 17, top: 71, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 95, height: 18, centerY: 0 },

          value: 'Department',
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 250, height: 22, right: 3, centerY: 0 },
          valueBinding: 'CrudSample.userNestedController.department'
        })
      }),

      userStatus: SC.View.design({
        layout: { left: 17, right: 17, top: 98, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 95, height: 18, centerY: 0 },

          value: 'User Status',
          textAlign: SC.ALIGN_RIGHT
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

          valueBinding: 'CrudSample.userNestedController.userStatus'
        })

      }),

      isAdmin: SC.View.design({
        layout: { left: 17, right: 17, top: 125, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 95, height: 18, centerY: 0 },

          value: 'Is Admin',
          textAlign: SC.ALIGN_RIGHT
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

          valueBinding: 'CrudSample.userNestedController.isAdminString'
        })
      }),

      lastLoggedInDate: SC.View.design({
        layout: { left: 17, right: 17, top: 152, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 95, height: 18, centerY: 0 },

          value: 'Last Logged In Date',
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 250, height: 22, right: 3, centerY: 0 },
          valueBinding: 'CrudSample.userNestedController.lastLoggedInDate'
        })
      }),

      saveButton: SC.ButtonView.design({
        layout: {bottom: 10, right: 110, height:24, width:80},
        title: 'Save',
        action: 'save',
        isEnabledBinding: 'CrudSample.userNestedController.recordIsChanged'
      }),

      cancelButton: SC.ButtonView.design({
        layout: {bottom: 10, right: 20, height:24, width:80},
        title: 'Cancel',
        action: 'cancel'
      })
    }),

    // Methods to show/hide the details pane
    // Thanks Charles:
    // http://markmail.org/message/miobpqe7y34w7rht#query:sproutcore%20panelpane+page:1+mid:miobpqe7y34w7rht+state:results
    detailIsVisible: NO,

    showForUpdate: function() {
      this.set('detailIsVisible', YES);
      CrudSample.userNestedController.loadCurrent();
    },

    save: function() {
      CrudSample.userNestedController.save();
      this.set('detailIsVisible', NO);
    },

    cancel: function() {
      CrudSample.userNestedController.discard();
      this.set('detailIsVisible', NO);
    },

    /* observer - show/hide panel */
    detailIsVisibleDidChange: function() {
      var panel = CrudSample.mainPage.get('detailPane');
      if (this.get('detailIsVisible')) {
        panel.append();
      }
      else {
        panel.remove();
      }
    }.observes('detailIsVisible')
  })  //detailPane

}); // mainPage

