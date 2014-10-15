var makeTree = function(value){
  var newTree = {};
  newTree.value = value;
  newTree.parent = null;
  newTree.children = undefined;
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value){
  // if tree has no children, make an array
  // push this child onto array
  var childTree = makeTree(value);

  if (this.children === undefined) {
    this.children = [];
  }

  this.children.push(childTree);

  return childTree;
};

treeMethods.contains = function(target){

  var treeLoop = function(tree) {
    // if tree value is equal to target, return true
    if (tree.value === target) {
      return true;
    } else if (tree.children !== undefined) {
      for (var i = 0; i < tree.children.length; i++) {
        var branch = treeLoop(tree.children[i]);
        if (branch) {
          return true;
        }
        if (i === tree.children.length - 1) {
          return false;
        }
      }
    } else {
      return false;
    }
  };
  return treeLoop(this);
  // else if there are children, look through each child
  // else if there are no children return false
};


/*
 * Complexity: What is the time complexity of the above functions?
 */