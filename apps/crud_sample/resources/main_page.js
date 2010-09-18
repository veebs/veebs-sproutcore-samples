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
              return v == null ? '' : SC.DateTime.create(v.getTime()).toFormattedString('%Y-%m-%d %H:%M:%S %Z');
            },
            width: 300
          })
        ],
        contentBinding:   'CrudSample.userArrayController.arrangedObjects',
        selectionBinding: 'CrudSample.userArrayController.selection',
        exampleView: CrudSample.TableRowView,
        recordType: CrudSample.UserModel,
        target: "CrudSample.mainPage.detailPane",
        action: "showDetail"
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
    layout: { width:400, height:300, centerX:0, centerY:-50},

    contentView: SC.View.extend({
      childViews: 'username dismissButton'.w(),

      username: SC.View.design({
        layout: { left: 17, right: 14, top: 17, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 77, height: 18, centerY: 0 },

          value: 'Username',
          localize: YES,
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 230, height: 22, right: 3, centerY: 0 },
          valueBinding: 'CrudSample.userController.username'
        })
      }),

      dismissButton: SC.ButtonView.design({
        layout: {bottom: 10, centerX:0, height:24, width:80},
        title: "Dismiss",
        action: "hideDetail"
      })
    }),

    // Methods to show/hide the details pane
    // Thanks Charles:
    // http://markmail.org/message/miobpqe7y34w7rht#query:sproutcore%20panelpane+page:1+mid:miobpqe7y34w7rht+state:results
    detailIsVisible: NO,

    showDetail: function() {
      this.set('detailIsVisible', YES);
    },

    hideDetail: function() {
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

