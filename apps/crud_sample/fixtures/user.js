// ==========================================================================
// Project:   CrudSample.UserModel Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================

sc_require('models/user');

CrudSample.UserModel.FIXTURES = [

  {
    userID: 1,
    username: "Michael",
    department: "Accounts",
    status: "Active",
    isAdmin: YES,
    lastLoggedInDate: "2010-01-01T10:20:30Z"
  },

  {
    userID: 2,
    username: "Dwight",
    department: "",
    status: "Active",
    isAdmin: NO,
    lastLoggedInDate: "2010-02-02T10:20:30Z"
  },

  {
    userID: 3,
    username: "Jim",
    department: "",
    status: "Active",
    isAdmin: NO,
    lastLoggedInDate: "2010-03-03T10:20:30Z"
  },

  {
    userID: 4,
    username: "Pam",
    department: "",
    status: "Active",
    isAdmin: NO,
    lastLoggedInDate: null
  },

  {
    userID: 5,
    username: "Ryan",
    department: "" ,
    status: "Active",
    isAdmin: YES,
    lastLoggedInDate: "2010-04-04T10:20:30Z"
  }

];
