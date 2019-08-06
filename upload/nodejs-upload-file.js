var http = require('http');
var fs = require('fs');
var formidable = require('formidable');var exec = require('child_process').exec;
 
// html file containing upload form
var upload_html = fs.readFileSync("upload_file.html");
 
// replace this with the location to save uploaded files
// var upload_path = "/home/chansonyhu123/.tmp/";
var upload_path = "/tmp/";

http.createServer(function (req, res) {
    if (req.url == '/uploadform') {
      res.writeHead(200);
      res.write(upload_html);
      return res.end();
    } else if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            // oldpath : temporary folder to which file is saved to
            var oldpath = files.filetoupload.path;
            var newpath = upload_path + files.filetoupload.name;
            console.log('oldpath: ', oldpath);
            console.log('newpath: ', newpath);
            // copy the file to a new location
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                // you may respond with another html page
                res.write('File uploaded and moved!');
                //req.url = '/uploadform';
                //res.write(upload_html);
                res.end();
                console.log('File uploaded and moved!');

                // 成功的例子
                exec('ls -al', function(error, stdout, stderr){
                    if(error) {
                        console.error('error: ' + error);
                        return;
                    }
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + typeof stderr);
                });

            });
        });
    }
}).listen(8086);
