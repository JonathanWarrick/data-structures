var makeQueue = function(){
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var someInstance = {};

  // Use an object with numeric keys to store values
  someInstance.storage = {};
  someInstance.sizeOfQueue = 0;
  someInstance.curPos = 0;
  someInstance.nextPos = 0;

  _.extend(someInstance, queueMethods);
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
