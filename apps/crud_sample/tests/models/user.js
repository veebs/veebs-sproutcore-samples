// ==========================================================================
// Project:   CrudSample.UserModel Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================

module("CrudSample.UserModel");

test('Create User', function() {
  stop(2000);

  var user = CrudSample.store.createRecord(CrudSample.UserModel, {
                username: 'SpongeBob',
                department: 'Accounts',
                status: 'Active',
                isAdmin: NO,
                lastLoggedInDate: '2010-05-05T10:20:30Z'
              });

  equals(user.get('username'), 'SpongeBob', 'user name is SpongeBob');
  equals(user.get('department'), 'Accounts', 'department is Accounts');
  equals(user.get('userStatus'), 'Active', 'user status is Active');
  equals(user.get('isAdmin'), NO, 'user is Admin');
  var d1 = user.get('lastLoggedInDate').getTime();
  var d2 = Date.UTC(2010,4,5,10,20,30);
  equals(d1, d2, 'user last logged in');

  // Status should be ready new because record is new and not committed to server
  ok(user.get('status') & SC.Record.READY_NEW, 'Status is READY_NEW');

  // Commit changes
  CrudSample.store.commitRecords();

  // Sproutcore asynchronously updates the status
  setTimeout(checkCreate, 1000);  
});
function checkCreate() {
  // Record should not be located by query anymore
  var query = SC.Query.local(CrudSample.UserModel, {
    conditions: 'username = {name}',
    name: 'SpongeBob'
    });
  var users = CrudSample.store.find(query);
  ok(users.get('length') == 1, 'SpongeBob record should be searchable by query');

  // Status should now be 'clean' since it's been saved
  var user = users.objectAt(0);
  ok(user.get('status') & SC.Record.READY_CLEAN, 'Status is READY_CLEAN');

  start();
}



test('Read and Update User', function() {
  stop(2000);

  var user = CrudSample.store.find(CrudSample.UserModel, '1');

  equals(user.get('username'), 'Michael', 'user name is Michael');
  equals(user.get('department'), 'Accounts', 'department is Accounts');
  equals(user.get('userStatus'), 'Active', 'user status is Active');
  equals(user.get('isAdmin'), YES, 'user is Admin');
  var d1 = user.get('lastLoggedInDate').getTime();
  var d2 = Date.UTC(2010,0,1,10,20,30);
  equals(d1, d2, 'user last logged in');

  // Record status should be clean because we've just retrieved it
  ok(user.get('status') & SC.Record.READY_CLEAN, 'Status is READY_CLEAN');

  // Change property and check that status is not dirty because we've changed it
  user.set('department', 'Payroll');
  equals(user.get('department'), 'Payroll', 'department is Payroll');
  ok(user.get('status') & SC.Record.READY_DIRTY, 'Status is READY_DIRTY');

  // Commit changes
  CrudSample.store.commitRecords();

  // Status should now be 'clean' since it's been saved
  ok(user.get('status') & SC.Record.READY_CLEAN, 'Status is READY_CLEAN');

  // Sproutcore asynchronously updates the status
  setTimeout(checkUpdate, 1000);
});
function checkUpdate() {
  var user = CrudSample.store.find(CrudSample.UserModel, '1');

  // Status should now be 'clean' since it's been saved
  ok(user.get('status') & SC.Record.READY_CLEAN, 'Status is READY_CLEAN');

  start();
}



test('Delete User', function() {
  stop(2000);

  // User query to find user called 'Dwight'/
  // Query returns a SC.RecordArray so we cannot use array[0]. Have to use objectAt() method. 
  var query = SC.Query.local(CrudSample.UserModel, {
    conditions: 'username = {name}',
    name: 'Dwight'
    });
  var users = CrudSample.store.find(query);
  ok(users.get('length') == 1, 'Found user Dwight');

  // Delete user
  var user = users.objectAt(0);
  user.destroy();

  // Record should have been destroyed in memory but not on server
  ok(user.get('status') & SC.Record.DESTROYED_DIRTY, 'Status is DESTROYED_DIRTY');

  // Commit changes
  CrudSample.store.commitRecords();

  // Sproutcore asynchronously updates the status 
  setTimeout(checkDelete, 1000);
});
function checkDelete() {
  // Record should have been destroyed in memory and on server
  var user = CrudSample.store.find(CrudSample.UserModel, '2');
  ok(user.get('status') & SC.Record.DESTROYED_CLEAN, 'Status is DESTROYED_CLEAN');

  // Record should not be located by query anymore
  var query = SC.Query.local(CrudSample.UserModel, {
    conditions: 'username = {name}',
    name: 'Dwight'
    });
  var users = CrudSample.store.find(query);
  ok(users.get('length') == 0, 'Dwight record should NOT be searchable by query');
  start();
}



test('Query User', function() {
  // User query to find user called 'Dwight'/
  // Query returns a SC.RecordArray so we cannot use array[0]. Have to use objectAt() method.
  // OR and AND have to be capital case!
  var query = SC.Query.local(CrudSample.UserModel, {
    conditions: '(username = {name}) OR (username = {name2})',
    name: 'Jim',
    name2: 'Pam',
    orderyBy: ['username']
    });
  var users = CrudSample.store.find(query);

  ok(users.get('length') == 2, '2 matching users');
  equals(users.objectAt(0).get('username'), 'Jim', '1st user is Jim');
  equals(users.objectAt(1).get('username'), 'Pam', '2nd user is Pam');

  users.forEach(function(user) { SC.Logger.log(user.get('username'));}, this);
});



test('Query No Matching User', function() {
  // User query to find user called 'Dwight'/
  // Query returns a SC.RecordArray so we cannot use array[0]. Have to use objectAt() method.
  // OR and AND have to be capital case!
  var query = SC.Query.local(CrudSample.UserModel, {
    conditions: '(username = {name})',
    name: 'XXXXXX',
    orderyBy: ['username']
    });
  var users = CrudSample.store.find(query);

  ok(users.get('length') == 0, '0 matching users');
});
