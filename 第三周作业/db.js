/**
 * Created by Olive.C on 2015/7/15.
 */
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
module.exports = new Db('test', new Server('123.57.237.143', '10001'), {safe: true})