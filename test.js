var buffer = new Buffer([1, 2]);
var buffer2 = new Buffer([2, 3]);
console.log(Buffer.concat([buffer, buffer2]))