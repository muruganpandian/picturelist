var http = require('http'),
url = require('url'),
fs = require('fs'),
os = require('os'),
wrench = require('wrench'),
util = require('util');

http.createServer(function(request, response) {

	console.log('the request is ' + request);
	// passing in directory
	var uri = url.parse(request.url).pathname;
	console.log('the uri is ' + uri);
        
	var query = url.parse(request.url).query;
	console.log('the query is ' + query);
	
	if(query) {
		var query_clean = query.replace("image=","");
		console.log('the clean query is ' + query_clean);
	}
       
	// The "POST" page where the image is presented. 
	if(/*uri == '/myaction' &&*/ request.method.toLowerCase() == 'post') {
		var req = url.parse(request.url, true);
        	console.log('req = ' + req);
        	var action = request.pathname;
        	console.log('action = ' + action);
		console.log('uri = ' + uri);
		var filename;
		request.on('data', function(chunk) {
			console.log("Received body data:");
			console.log(chunk.toString());
			filename = chunk.toString();
			var filedisplay = filename.split('=').pop();
			console.log(filedisplay);
			var fileext = filedisplay.split('.').pop();
			console.log(fileext);

			var pathtofile = uri + '/' + filedisplay;
			console.log('path to file ' + pathtofile);
			response.writeHead(200, {'Content-Type': 'image/' + fileext });
			fileStream = fs.createReadStream(pathtofile);
 		        fileStream.pipe(response);

		});

        } 
	else {	
	// The "home page" where the form containing a list of image files is presented.
	wrench.readdirRecursive(query_clean, function(err, files) {
	var dirtoadd = '';
	if(files) {
	
	var filelist = {};
	function addToList(element, index, array) {
		var ext = element.split('.').pop();
		if('gif' == ext || 'jpg' == ext || 'png' == ext) {
			var directory = element.substring(0, element.lastIndexOf('/'));
			directory = query_clean + '/' + directory;
			if(element.indexOf('/') != -1) {
				element = element.substring(element.lastIndexOf('/')+1, element.length);
				//directory = directory + '/';
			}
			filelist[element] = directory;
		}
	}
	files.forEach(addToList);

		
	response.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
      
          if (err) throw err;
                //console.log("the files are: " + files);
                response.write('<HTML><HEAD><title>Directory listing for ' + query_clean + '</title></HEAD><BODY><h1>Directory Listing for ' + query_clean + '</h1>');
         	response.write('<form action="'+query_clean+'" method="post" enctype="application/x-www-form-urlencoded">');	
		response.write('<select name="select_string">'); 

		for (var file in filelist) {
                	if(filelist.hasOwnProperty(file)) {
				response.write('<option value="' + file +'">' + file + '</option>');
				console.log('file = ' + file + ' directory = ' + filelist[file]);
                	}
        	}
		response.write('</select>');
		response.write('<input type="submit" />');
		response.write('</form>');
		// Write the hostname.
		response.write('<p>' + 'Host - ' + os.hostname() + '</p>');
		// Write the date.
		response.write('<p>' + Date() + '</p>');
        	response.write('</BODY></HTML>');
        	response.end()
        }
	});
	}

}).listen(8080);

console.log('Listening on port 8080. . .');
