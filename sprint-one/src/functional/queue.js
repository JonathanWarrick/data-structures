var makeQueue = function(){
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var size = 0;
  var curPos = 0;
  var nextPos = 0;

  // Implement the methods below

  someInstance.enqueue = function(value){
    size++;
    storage[nextPos] = value;
    nextPos++;
  };

  someInstance.dequeue = function(){
    if (size > 0) {
      var result = storage[curPos];
      delete storage[curPos];
      size--;
      curPos++;
      return result;
    }

  };

  someInstance.size = function(){
    return size;
  };

  return someInstance;
};
