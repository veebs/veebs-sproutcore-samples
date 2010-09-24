This project contains sample apps that I've written as I'm learning Sproutcore and testing out concepts.

As of 14/9/2010, the code has been built to work with Sproutcore 1.4.

Installation Instructions
=========================
1. Install sproutcore gem.

       sudo gem install sproutcore


2. Get this project source code

       git clone git://github.com/veebs/veebs-sproutcore-samples.git
       cd veebs-sproutcore-samples


3. Optional. Install sproutcore source code into our project to help with debugging. Sproutcore build tools is smart
   enough to use this copy rather than the copy in the installed gem from step #1.

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

Check out the walkthrough on [my blog](http://www.veebsbraindump.com/2010/08/sproutcore-page-navigation-using-routes/).


login-sample
============
This demonstrates

1. moving from one page to another
2. binding between view and controller
3. using 'view-model' data stored in the controller
4. async HTTP call to retrieve login details
5. error handling

This does **NOT** handle cookies, session id or logout.  This is will addressed in an the login-logout-sample (todo).

Check out the walkthrough on [my blog](http://www.veebsbraindump.com/2010/08/sproutcore-login-sample/).


login-logout-sample
===================
This demonstrates

1. using cookies to store authentication token upon login
2. storage of login permanently, for browser session or for 3 seconds
3. logout clearing authentication token

Check out the walkthrough on [my blog](http://www.veebsbraindump.com/2010/09/sproutcore-login-logout-sample/).


table-sample
============
This is the table view tutorial as documented in the [sproutcore wiki](http://wiki.sproutcore.com/Basic-TableView-Tutorial).

I've just renamed table-example to table-**sample** to fit in with my app naming convention.


