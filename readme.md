I attempted this in Node.js despite being fairly new to the language.

This web application for the Web returns an HTML page containing the following when it receives an HTTP request:
A) The name of the server upon which the script is executing.
B) The current date.
C) An HTML form that contains an HTML select list (<select> tag) that contains a list of image files. The input list for this select list is created by scanning the server file system from a provided "root directory" and adding all GIF, JPG, and PNG format files located in that provided "root directory" and all sub-directories to it.
Matching files should be identified by checking the filename extension. Those files which end in a .gif, .jpg, or .png extension should be included (case insensitive).
The "starting directory" should be specified to the script using the HTTP query string. As an example, to search for all images under the "/var/www/images" directory the URL to the script (e.g. interview.php) would be:
 http://localhost/interview.php?image=/var/www/images
D) An input button to submit the form containing the HTML select list.

### Usage
node PictureList.js

### Bugs (to be fixed in next release)
- More error handling are needed.
- Error in reflecting the directory recursion to the form despite wrench-js successfully performing the recursion.
- Could not get it deployed successfuly at Heroku.

### Results
Despite the bug in the form, the selected pictures are successfuly streamed to the browser.
I tested out the following in the browser where it matched how the directories were setup for me:
http://localhost:8080/?image=/home/murugan/nodejs/assignment
http://localhost:8080/?image=/home/murugan/nodejs/assignment/images
