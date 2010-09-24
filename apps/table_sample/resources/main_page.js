// ==========================================================================
// Project:   TableSample - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TableSample */

// This page describes the main user interface for your application.  
TableSample.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'tableView'.w(),
    tableView: SC.TableView.design({
      layout: { left: 15, right: 15, top: 15, bottom: 15 },
      backgroundColor: "white",
      columns: [
        SC.TableColumn.create({
          key:   'firstName',
          label: 'Name',
          width: 50
        }),
        SC.TableColumn.create({
          key:   'lastName',
          label: 'Last Name',
          width: 90
        })
      ],
      contentBinding:   'TableSample.usersController.arrangedObjects',
      selectionBinding: 'TableSample.usersController.selection',
      selectOnMouseDown: YES,
      exampleView: SC.TableRowView,
      recordType: TableSample.User
    })
  })

});
