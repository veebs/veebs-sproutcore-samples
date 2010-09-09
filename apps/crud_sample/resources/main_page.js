// ==========================================================================
// Project:   CrudSample - mainPage
// Copyright: ©2010 My Company, Inc.
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
            formatter: function(v) { return v ? 'Yes' : 'No'; },
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
        selectOnMouseDown: YES,
        exampleView: SC.TableRowView,
        recordType: CrudSample.UserModel
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

  })  // mainPane

}); // mainPage
