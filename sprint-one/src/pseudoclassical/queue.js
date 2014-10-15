var Queue = function() {
  this.storage = {};
  this.sizeOfQueue = 0;
  this.curPos = 0;
  this.nextPos = 0;
};


Queue.prototype.enqueue = function(value){
  this.storage[this.nextPos] = value;
  this.nextPos++;
  this.sizeOfQueue++;
};

Queue.prototype.dequeue = function(){
  if (this.sizeOfQueue > 0) {
    var result = this.storage[this.curPos];
    delete this.storage[this.curPos];
    this.sizeOfQueue--;
    this.curPos++;
    return result;
  }

};

Queue.prototype.size = function(){
  return this.sizeOfQueue;
};
