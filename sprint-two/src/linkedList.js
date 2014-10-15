var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    // make a new node
    var newNode = makeNode(value);

    // if there is no head, set this node to the head
    if (list.head === null) {
      list.head = newNode;
    }

    // if there is already a node in the list, assign the last node a reference to the new tail
    // also assign the new node's previous reference to the former tail.
    if (list.tail !== null) {
      list.tail.next = newNode;
      newNode.previous = list.tail;
    }

    // assign the list's tail to the incoming, added node.
    list.tail = newNode;
  };

  list.addToHead = function(value) {
    // make a new node
    var newNode = makeNode(value);

    // if there is no head, set this node to the head
    if (list.head === null) {
      list.head = newNode;
    }

    // else, assign list.head's previous pointer to the new node, old list.head to new node's next, and assign list.head to the new node
    list.head.previous = newNode;
    newNode.next = list.head;
    list.head = newNode;
  }

  list.removeHead = function(){
    if (list.head !== null) {
      var removedValue = list.head.value;

      if (list.head.next !== null) {
        var nextNode = list.head.next;
        nextNode.previous = null;
        delete list.head;
        list.head = nextNode;
      }

      return removedValue;
    }
  };

  list.removeTail = function() {
    if (list.tail !==null) {
      var removedValue = list.tail.value;

      if (list.tail.previous !== null) {
        var prevNode = list.tail.previous;
        prevNode.next = null;
        delete list.tail;
        list.tail = prevNode;
      }

      return removedValue;
    }
  };

  list.contains = function(target){
    // loop through entire list starting at the head
    var nodeLoop = function(node) {
      if (node.value === target) {
        return true;
      } else if (!node.next) {
        return false;
      } else {
        return nodeLoop(node.next);
      }
    };

    return nodeLoop(list.head);

    // if node.value is equal to the target,
      // return true
    // else if node.next != null,
      // move on to next node
    // else return false
  };

  return list;
};

var makeNode = function(value){
  var node = {};

  node.value = value;
  node.next = null;
  node.previous = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
