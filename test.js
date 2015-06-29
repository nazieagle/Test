/**
 * Created by Olive.C on 2015/6/29.
 */
var http=require('http')
http.createServer(function (req, res) {
    res.end('hello')
}).listen(3000);