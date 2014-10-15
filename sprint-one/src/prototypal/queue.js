var makeQueue = function() {
  var someInstance = Object.create(queueMethods);
  someInstance.storage = {};
  someInstance.sizeOfQueue = 0;
  someInstance.curPos = 0;
  someInstance.nextPos = 0;
  return someInstance;
};

var queueMethods = {};
queueMethods.enqueue = function(value){
  this.sizeOfQueue++;
  this.storage[this.nextPos] = value;
  this.nextPos++;
};

queueMethods.dequeue = function(){
  if (this.sizeOfQueue > 0) {
    var result = this.storage[this.curPos];
    delete this.storage[this.curPos];
    this.sizeOfQueue--;
    this.curPos++;
    return result;
  }

};

queueMethods.size = function(){
  return this.sizeOfQueue;
};



