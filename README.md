This project contains sample apps that I've written as I'm learning Sproutcore and testing out concepts.

As of 17/10/2010, the code has been built to work with Sproutcore 1.4.2.

Installation Instructions
=========================
1. Install sproutcore gem.

       sudo gem install sproutcore


2. Get this project source code

       git clone git://github.com/veebs/veebs-sproutcore-samples.git
       cd veebs-sproutcore-samples


3. Install sproutcore source code into our project to help with debugging and fixing known bugs in the framework.
   Sproutcore build tools is smart enough to use this copy rather than the copy in the installed gem from step #1.

       cd veebs-sproutcore-samples
       mkdir -p frameworks
       cd frameworks
       git clone git://github.com/sproutcore/sproutcore.git
       cd sproutcore
       git branch -r
       git checkout origin/1-4-stable


route-sample
============
I found the standard Sproutcore route sample too complex for a newbie like me.
It uses responders, states and other advance features.

This sample demonstrates

1. registering routes (in main.js) using SC.routes.add().
2. moving between 2 pages (one_page and two_page) using routes using SC.routes.set().
3. how to read and use URL parameters in the route handler (route.js)

Check out the tutorial on [my blog](http://www.veebsbraindump.com/2010/08/sproutcore-page-navigation-using-routes/).

See it in action [here](http://demo.veebsbraindump.com/route_sample/).


login-sample
============
This demonstrates

1. moving from one page to another
2. binding between view and controller
3. using 'view-model' data stored in the controller
4. async HTTP call to retrieve login details
5. error handling

This does **NOT** handle cookies, session id or logout.  This is will addressed in an the login-logout-sample (todo).

Check out the tutorial on [my blog](http://www.veebsbraindump.com/2010/08/sproutcore-login-sample/).

See it in action [here](http://demo.veebsbraindump.com/login_sample/).


login-logout-sample
===================
This demonstrates

1. using cookies to store authentication token upon login
2. storage of login permanently, for browser session or for 3 seconds
3. logout clearing authentication token

Check out the tutorial on [my blog](http://www.veebsbraindump.com/2010/09/sproutcore-login-logout-sample/).

See it in action [here](http://demo.veebsbraindump.com/login_logout_sample/).


crud-sample
===========
Allows the user to Create, Read, Update and Delete user records.

This demonstrates

1.  Use of SC.TableView
2.  Use of a modal details pane
3.  Use of a modal error pane
4.  Field level validation - username must be [a-z]
5.  Page level validation - username is required
6.  Nested stores so that local changes can be discarded before commit.
7.  Simulated server response with 1 second latency
8.  Simulated server error - check for duplicate keys (username)
9.  SC.DataSource error handling
10. Display errors to users

Check out the tutorial on [my blog](http://www.veebsbraindump.com/2010/10/sproutcore-crud-tutorial-using-sc-tableview).

See it in action [here](http://demo.veebsbraindump.com/crud_sample/).


reorder-sample
==============
Displays a list of items and allows the user to re-order them.

This demonstrates

1. How to implement a custom SC.ListView row.
2. How to hi-light an item when hovering with a mouse.
3. How to implement drag-and-drop re ordering.

Check out the tutorial on [my blog](http://www.veebsbraindump.com/2010/11/sproutcore-tutorial-custom-listview-with-reordering).

See it in action [here](http://demo.veebsbraindump.com/reorder_sample/).


table-sample
============
This is the table view tutorial as documented in the [sproutcore wiki](http://wiki.sproutcore.com/Basic-TableView-Tutorial).

I've just renamed table-example to table-**sample** to fit in with my app naming convention.




