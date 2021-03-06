// ==========================================================================
// Project:   CrudSample - Tutorial Application on CRUD operations
// Copyright: ©2010 Vibul Imtarnasan (Veebs).
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('models/user');

CrudSample.UserRecord.FIXTURES = [

  {
    userID: 1,
    username: "michael",
    department: "Accounts",
    status: "Active",
    isAdmin: YES,
    lastLoggedInDate: "2010-01-01T10:20:30Z"
  },

  {
    userID: 2,
    username: "dwight",
    department: "",
    status: "Active",
    isAdmin: NO,
    lastLoggedInDate: "2010-02-02T10:20:30Z"
  },

  {
    userID: 3,
    username: "jim",
    department: "",
    status: "Active",
    isAdmin: NO,
    lastLoggedInDate: "2010-03-03T10:20:30Z"
  },

  {
    userID: 4,
    username: "pam",
    department: "",
    status: "Active",
    isAdmin: NO,
    lastLoggedInDate: null
  },

  {
    userID: 5,
    username: "ryan",
    department: "" ,
    status: "Active",
    isAdmin: YES,
    lastLoggedInDate: "2010-04-04T10:20:30Z"
  }

];
