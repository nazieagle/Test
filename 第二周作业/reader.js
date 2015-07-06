var fs=require('fs');
var EventEmitter=require('events').EventEmitter;
var util=require('util');
var readSoFar=0;

function LineReader(path){
    this.path=path;
}

util.inherits(LineReader,EventEmitter);

LineReader.prototype.on('newListener', function (eventName) {
    var buffer=new Buffer(1);
    var temp=[];
    var self=this;
    if(eventName=='newLine'){
        fs.open(this.path,'r',0777, function (err,fd) {
            if(err){
                console.log(util.inspect(err));
            }else{
                var recur= function (buffer,temp,self) {
                    fs.read(fd,buffer,0,1,readSoFar, function (err, bytesRead) {
                        if(bytesRead>0){
                            if(buffer[0]==0x0d){
                                readSoFar+=(bytesRead+1);
                                self.emit('newLine',Buffer.concat(temp).toString());
                                temp=[];
                            }else{
                                temp.push(new Buffer([buffer[0]]));
                                readSoFar+=bytesRead;
                            }
                            recur(buffer,temp,self);
                        }else{
                            self.emit('newLine',Buffer.concat(temp).toString());
                        }
                    })
                }
                recur(buffer,temp,self);
            }
        })
    }
})

var reader=new LineReader('./msg.txt');
reader.on('newLine', function (line) {
    console.log(line);
})