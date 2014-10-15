var HashTable = function(){
  this._limit = 8;
  this._size = 0;
  this._storage = makeLimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) { 
	// if (this._size === 48) {
	// 	debugger;
	// }
  var i = getIndexBelowMaxForKey(k, this._limit); 
  
  if (this._storage.get(i) === undefined) {
    this._storage.set(i, []);
  }

  var newObj = {};
  newObj[k] = v;
  this._storage.get(i).push(newObj);
  this._size++;
  if (this._size > (this._limit * .75)) {
  	this.rehash();
	}
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);

  if (this._storage.get(i) === undefined) {
    return null;
  }

  var bucket = this._storage.get(i);
  
  for (var j = 0; j < bucket.length; j++) {
     if (bucket[j][k] !== undefined) {
      return bucket[j][k];
    }
  }

  return null;
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  
  if (this._storage.get(i) === undefined) {
    return null;
  }
  
  var bucket = this._storage.get(i);
  
  for (var j = 0; j < bucket.length; j++) {
     if(bucket[j][k] !== undefined) {
      bucket.splice(j,1);
      this._size--;
      if (this._limit > 8 && (this._size < (this._limit * .25))) {
        this.downsize();
      }
    }
  }
  
  return null;
};

HashTable.prototype.rehash = function() {
	var tempHash = new HashTable();
	tempHash._limit = this._limit * 2;
  tempHash._size = 0;
  tempHash._storage = makeLimitedArray(tempHash._limit);
	this._storage.each(function(value) {
    if (value !== undefined) {
  		for (var i = 0; i < value.length; i++) {
  			var tempObj = value[i];
  			var tempKey = Object.keys(tempObj)[0];
  			var tempVal = tempObj[tempKey];
  			tempHash.insert(tempKey, tempVal);
  		}
    }
	});
	this._storage = tempHash._storage;
	this._limit = tempHash._limit;
}

HashTable.prototype.downsize = function() {
  var tempHash = new HashTable();
  tempHash._limit = this._limit / 2;
  tempHash._size = 0;
  tempHash._storage = makeLimitedArray(tempHash._limit);
  this._storage.each(function(value) {
    if (value !== undefined) {  
      for (var i = 0; i < value.length; i++) {
        var tempObj = value[i];
        var tempKey = Object.keys(tempObj)[0];
        var tempVal = tempObj[tempKey];
        tempHash.insert(tempKey, tempVal);
      }
    }
  });
  this._storage = tempHash._storage;
  this._limit = tempHash._limit;
}

// Logic for creating self-expanding hash table:
// Space at beginning is number of buckets ^ 2 (defaults to 8 ^ 2 or 64); need to track this from the beginning
// If, upon an insert, the number of objects in the table is 75% of total space, re-run this new function
// This new function returns a new instance of a hash table
// The new hash table will have the updated size, and as a result, the proper hashing function
// All of the objects from the old hash table will be re-hashed and inserted (using insert)
// To loop through each bucket, we can use the pre-defined each function.

/*
 * Complexity: What is the time complexity of the above functions?
 */
