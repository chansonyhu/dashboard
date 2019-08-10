var http = require('http');
var fs = require('fs');
var formidable = require('formidable');var exec = require('child_process').exec;
 
// html file containing upload form
var upload_html = fs.readFileSync("upload_file.html");
 
// replace this with the location to save uploaded files
// var upload_path = "/home/chansonyhu123/.tmp/";
var upload_path = "./DataDeal/data/excel/";

var html_header = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
<!--<script src="/jquery-1.10.2.min.js"></script>-->
<link rel="icon" href="/forest_city.ico" type="image/x-icon">
<link rel="shortcut icon" href="/forest_city.ico" type="image/x-icon">
<title>Results</title>
<style>
    body{text-align:center;}
    form{display:block;border:1px solid black;padding:20px;}
</style>
</head>
<body>
`

var html_end = `
<span></span>
<a id='btn_back_to_upload' class=""><I><U>返回</U></I></a>
</body>
</html>
<script>
    console.log('back');
    $("#btn_back_to_upload").click(function(){
        console.log('back');
        window.location.href=document.referrer;
    });
</script>
`

http.createServer(
    function (req, res) {
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
                if (err) {
                    res.write(html_header);
                    res.write('<a class="">发生异常！</a>');
                    res.write(html_end);
                    res.end();
                    return;
                };
                // you may respond with another html page
                res.write(html_header);
                //req.url = '/uploadform';
                //res.write(upload_html);
                console.log('File uploaded and moved!');

                console.log('./forest_data_process.sh ' + files.filetoupload.name);
                // 成功的例子
                exec('./forest_data_process.sh ' + files.filetoupload.name, function(error, stdout, stderr){
                if(error) {
                    console.error('error: ' + error);
                    
                    res.write(`
                    <a class="">文件上传成功！</a>
                    <a class="">数据更新失败！</a>`);
                } else {
                    res.write(`<a class="">文件上传成功！</a>
                    <a class="">` +
                    files.filetoupload.name
                    + `文件更新成功！</a>`);
                }
                res.write(html_end);
                res.end();
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + typeof stderr);
                return 1;
                });
            });
        });

    }
    }
).listen(8086);
