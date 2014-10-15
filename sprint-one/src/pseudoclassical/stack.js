var Stack = function() {
  this.storage = {};
  this.sizeOfStack = 0;
};


Stack.prototype.push = function(value){
  this.storage[this.sizeOfStack] = value;
  this.sizeOfStack++;
};

Stack.prototype.pop = function() {
  if (this.sizeOfStack > 0) {
    this.sizeOfStack--;
    var result = this.storage[this.sizeOfStack];
    delete this.storage[this.sizeOfStack];
    return result;
  }
};

Stack.prototype.size = function() {
  return this.sizeOfStack;
};
