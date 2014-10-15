var PrefixTree = function() {



};

// Start with a root note that links down to all other nodes
// The first level of nodes will be the keypad buckets (using objects or a hash table)
	// if word starts with [abc] start with bucket 0, [def], bucket 1, etc.
// Under the initial buckets, there will be individual nodes for each corresponding letter
// Within each of these letters will be a trie, which contains all possible "next letter" choices
// This trie will continue down until all possible letter combinations are exhausted

// Design implementation:
	// FIRST LEVEL: Object containing keys that relate to the numerical key pressed
	// The values for each key will be an object in itself, containing each letter-specific trie