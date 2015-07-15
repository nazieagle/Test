/**
 * Created by Olive.C on 2015/7/15.
 */
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash')

var routes = require('./main.js')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: 'test',
    key: 'test',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
    store: new MongoStore({
        db: 'test',
        host: '123.57.237.143',
        port: '10001'
    })
}))

routes(app);

app.listen(3000)