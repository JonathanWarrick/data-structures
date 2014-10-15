// A Bloom Filter is a probabalistic hash table that can gain enormous space
// and speed advantages over traditional hash tables. 
// Downside is it has to accept a false positive rate when looking up 
// whether an item is in the table. 
// Use cases are often for checking against a giant list locally and 
// only doing a full lookup when the local one comes back positive.

// Wiki: http://en.wikipedia.org/wiki/Bloom_filter
// Types of hash functions to potentially use:
// http://billmill.org/bloomfilter-tutorial/
// See http://willwhim.wordpress.com/2011/09/03/producing-n-hash-functions-by-hashing-only-once/
// Cool visual Bloom Filter built using D3: https://www.jasondavies.com/bloomfilter/

// A query to a Bloom Filter will either return "definitely not in the set" OR
// "possibly in the set"

// Elements can be added to the set, but not removed ("counting filter")

// The rate of false positives increases with number of members in the set

// An empty Bloom Filter is a bit array of m bits with k hash functions 
// (i.e.; m=18, k=3)

// TODO:
// Refactor to do everything within a loop for each of the three functions, both wihin add and retrieve
// Use actual hash functions for functions 2 and 3
// Make number of functions variable to handle k = n

var BloomFilter = function() {
	// default to an m=18, k=3 filter
	this._m = 18; // number of indices
	this._k = 3;  // number of hash functions
	this._storage = new Array(this._m);

	for (var i = 0; i < this._storage.length; i++) {
		this._storage[i] = false;
	}

	this._hashFunc1 = getIndexBelowMaxForKey;
	//this._hashFunc2 = // TODO
	//this._hashFunc3 = // TODO
};

BloomFilter.prototype.add = function(key) {
	// feed item to EACH of the k hash functions to get k array positions
	// set the bits at all these positions to 1	
	var hashResult1 = this._hashFunc1(key, this._m);
	
	if (this._hashFunc1(key, this._m) > this._m) {
		var hashResult2 = 5;
	} else {
		var hashResult2 = this._hashFunc1(key, this._m);
	}

	if (this._hashFunc1(key, this._m) > this._m) {
		var hashResult3 = 8;
	} else {
		var hashResult3 = this._hashFunc1(key, this._m);
	}

	// var hashResult2 = this._hashFunc1(key, this._m);
	// var hashResult3 = this._hashFunc3(key);

	this._storage[hashResult1] = true;
	this._storage[hashResult2] = true;
	this._storage[hashResult3] = true;
};

BloomFilter.prototype.retrieve = function(key) {
	var hashResult1 = this._hashFunc1(key, this._m);
	
	if (this._hashFunc1(key, this._m) > this._m) {
		var hashResult2 = 0;
	} else {
		var hashResult2 = this._hashFunc1(key, this._m);
	}

	if (this._hashFunc1(key, this._m) > this._m) {
		var hashResult3 = 0;
	} else {
		var hashResult3 = this._hashFunc1(key, this._m);
	}

	if (this._storage[hashResult1] === false) {
		return false;
	}
	if (this._storage[hashResult2] === false) {
		return false;
	}
	if (this._storage[hashResult2] === false) {
		return false;
	}

	return true;
};

// Default hashing function from the Hash Table source code
var getIndexBelowMaxForKey = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

// Design Implementation

// Requires a data structure that contain binary values that "turn on" to 1 after a hash hits them
	// Can I use an array here that simply stores a boolean value?

// Upon calling add, THREE SEPARATE HASH FUNCTIONS will be run on the key passed in
// The corresponding indices in the array will be set to true using the results of each independent hash function

// When looking to retrieve, run THREE SEPARATE HASH FUNCTIONS on the key passed in
	// If the value of all indices corresponding to the hash function returns are true, then it is MAYBE true
	// Else, definitely false

// You can simulate n hash functions by having access to only two hash functions.  Study this at a later time.
// hash(i) = (a + b * i) % m

// HASHING FUNCTIONS
 
// Fowler/Noll/Vo hashing.
var fnv_1a = function(v) {
  var n = v.length,
      a = 2166136261,
      c,
      d,
      i = -1;

  while (++i < n) {
    c = v.charCodeAt(i);
    if (d = c & 0xff000000) {
      a ^= d >> 24;
      a += (a << 1) + (a << 4) + (a << 7) + (a << 8) + (a << 24);
    }
    if (d = c & 0xff0000) {
      a ^= d >> 16;
      a += (a << 1) + (a << 4) + (a << 7) + (a << 8) + (a << 24);
    }
    if (d = c & 0xff00) {
      a ^= d >> 8;
      a += (a << 1) + (a << 4) + (a << 7) + (a << 8) + (a << 24);
    }
    a ^= c & 0xff;
    a += (a << 1) + (a << 4) + (a << 7) + (a << 8) + (a << 24);
  }

  // From http://home.comcast.net/~bretm/hash/6.html
  a += a << 13;
  a ^= a >> 7;
  a += a << 3;
  a ^= a >> 17;
  a += a << 5;
  return a & 0xffffffff;
};

// One additional iteration of FNV, given a hash.
var fnv_1a_b = function(a) {
  a += (a << 1) + (a << 4) + (a << 7) + (a << 8) + (a << 24);
  a += a << 13;
  a ^= a >> 7;
  a += a << 3;
  a ^= a >> 17;
  a += a << 5;
  return a & 0xffffffff;
};

// THIRD HASH FUNCTION

BloomFilter.prototype.locations = function(v) {
    var k = this.k,
        m = this.m,
        r = this._locations,
        a = fnv_1a(v),
        b = fnv_1a_b(a),
        i = -1,
        x = a % m;
    while (++i < k) {
      r[i] = x < 0 ? (x + m) : x;
      x = (x + b) % m;
    }
    return r;
  };