var makeStack = function() {
  var someInstance = Object.create(stackMethods);
  someInstance.storage = {};
  someInstance.sizeOfStack = 0;
  return someInstance;
};

var stackMethods = {
  push: function(value){
    this.storage[this.sizeOfStack] = value;
    this.sizeOfStack++;
  },
  pop: function(){
    if (this.sizeOfStack > 0) {
      this.sizeOfStack--;
      var result = this.storage[this.sizeOfStack];
      delete this.storage[this.sizeOfStack];
      return result;
    }
  },
  size: function() {
    return this.sizeOfStack;
  }
};
