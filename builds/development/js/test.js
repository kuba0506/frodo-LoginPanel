console.time('Worker');
console.log('I\'m a Worker global object' , self);
console.log('I was call from ' , location.href);

importScripts('test2.js');

console.timeEnd('Worker');