var makeBinarySearchTree = function(value){
	var binarySearchTree = {};
	
	binarySearchTree.value = value;
	binarySearchTree.left = null;
	binarySearchTree.right = null;
	binarySearchTree.level = 1;
	
	binarySearchTree.insert = function(value) {
		if (value < binarySearchTree.value && binarySearchTree.left === null) {
			binarySearchTree.left = makeBinarySearchTree(value);
			binarySearchTree.left.level = binarySearchTree.level + 1;
		} else if (value > binarySearchTree.value && binarySearchTree.right === null) {
			binarySearchTree.right = makeBinarySearchTree(value);
			binarySearchTree.right.level = binarySearchTree.level + 1;
		} else if (value < binarySearchTree.value && binarySearchTree.left !== null) {
			binarySearchTree.left.insert(value);
		} else if (value > binarySearchTree.value && binarySearchTree.right !== null) {
			binarySearchTree.right.insert(value);			
		} else {
			alert("Tree already has this value");
		}
	};

	binarySearchTree.contains = function(target) {
		if (target === binarySearchTree.value) {
			return true;
		} else if (target < binarySearchTree.value) {
				if (binarySearchTree.left === null) {
					return false;
				}
			return binarySearchTree.left.contains(target);
		} else if (target > binarySearchTree.value) {
				if (binarySearchTree.right === null) {
					return false;
				}
			return binarySearchTree.right.contains(target);
		} 
	};

	binarySearchTree.depthFirstLog = function(callback) {
		// need to iterate through every node in the tree (loop if either left or right is !null)
		// need to call the callback function, using an anonymous function, and apply that to the value stored
		// debugger;
		if (typeof callback === "function") {
			callback(this.value);
		}

		if (this.left !== null) {
			this.left.depthFirstLog(callback);
		} 
		if (this.right !== null) {
			this.right.depthFirstLog(callback);
		}
	};

	binarySearchTree.breadthFirstLog = function(callback) {
		var firstCalled = false;

		var treeLoop = function(node) {
			// start with root node and push it to the queue empty queue
			if (!firstCalled) {
				callback(node.value);
				firstCalled = true;
			}
			
			// if there is a left node
				// push the value to the queue
			if (node.left) {
				callback(node.left.value);
			}

			// if there is a right node
				// push the value to the queue
			if (node.right) {
				callback(node.right.value);
			}

			// if there is a left node
				// recurse on it
			if (node.left) {
				treeLoop(node.left);
			}

			// if there is a right node
				// recurse on it
			if (node.right) {
				treeLoop(node.right);
			}
		};

		// call inner function
		treeLoop(this);
	};

	binarySearchTree.redistribute = function() {
		binarySearchTree.breadthFirstLog(function(value) var array = []; array.push(value); return array;)
	}
	
	return binarySearchTree;
};


// Extra credit - Add a breadthFirstLog function which traverses the tree using a breadth-first approach
// This approach visits every node on each level before moving to the next, rather than completely exhausting each branch before moving on

// The algorithm uses a queue data structure to store intermediate results as it traverses through the graph

// Extra credit - Rebalance the tree once its maximum depth is greater than two times the minimum depth

// Need to keep track of both the minimum and maximum depth
	// Each time a node is added, if it's the first of its level, maximum depth is increased
	// If the node to which the new node is being added is at the maximum depth, then maximum depth += 1

	// How to keep track of minimum depth? Reference some sort of closure value for each max and min? Loop through each time?
	// Start with loop each time?

// Once the condition is achieved, rebalancing takes several steps
	// First, need to push all values into an array (using depth/breadthFirstLog)
	// Second, need to take middle most node and set it as the root of the tree (sorted array)
		// i.e.; [1, 5, 7, 9, 13, 23, 48] would use 9 as starting point and branch out from there
	// Third, loop through the remainder of items and insert them 
	// (is this right?  You'll just have two main branches with mini-branches, so there must be another way)

/*
 * Complexity: What is the time complexity of the above functions?
 */