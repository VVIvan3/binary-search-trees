class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = Tree.buildTree(Tree.sort(array));
  }

  static sort(array) {
    return [...new Set(array.sort((a, b) => a - b))];
  }

  minimum(node) {
    while (node.left !== null) {
      node = node.left;
    }
    let minVal = node.data;
    return minVal;
  }

  static buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    const mid = parseInt((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = Tree.buildTree(array, start, mid - 1);
    node.right = Tree.buildTree(array, mid + 1, end);
    return node;
  }

  insertItem(item, node = this.root) {
    if (node === null) {
      node = new Node(item);
      return node;
    }
    if (item === node.data) return node;
    if (item < node.data) {
      node.left = this.insertItem(item, node.left);
    } else {
      node.right = this.insertItem(item, node.right);
    }
    return node;
  }

  deleteItem(item, node = this.root) {
    if (node === null) return node;
    if (item < node.data) {
      node.left = this.deleteItem(item, node.left);
    } else if (item > node.data) {
      node.right = this.deleteItem(item, node.right);
    } else {
      if (node.left === null) return node.right;
      else if (node.right === null) return node.left;
      else {
        node.data = this.minimum(node.right);
        node.right = this.deleteItem(node.data, node.right);
      }
    }
    return node;
  }

  find(item, node = this.root) {
    while (node !== null) {
      if (item < node.data) node = node.left;
      else if (item > node.data) node = node.right;
      else if (item === node.data) return true;
    }
    return false;
  }

  levelOrder(node = this.root) {
    const queue = [];
    const array = [];
    queue.push(node);
    while (queue.length !== 0) {
      const currentNode = queue[0];
      array.push(currentNode.data);
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
      queue.shift();
    }
    return array;
  }

  inOrder(node = this.root, array = []) {
    if (node.left !== null) this.inOrder(node.left, array);
    array.push(node.data);
    if (node.right !== null) this.inOrder(node.right, array);
    return array;
  }

  preOrder(node = this.root, array = []) {
    array.push(node.data);
    if (node.left !== null) this.preOrder(node.left, array);
    if (node.right !== null) this.preOrder(node.right, array);
    return array;
  }

  postOrder(node = this.root, array = []) {
    if (node.left !== null) this.postOrder(node.left, array);
    if (node.right !== null) this.postOrder(node.right, array);
    array.push(node.data);
    return array;
  }

  depth(node, traverseNode = this.root) {
    let depth = 1;
    while (traverseNode.data !== node) {
      depth++;
      if (node > traverseNode.data) {
        traverseNode = traverseNode.right;
      } else if (node < traverseNode.data) {
        traverseNode = traverseNode.left;
      }
      if (
        traverseNode.data !== node &&
        traverseNode.left === null &&
        traverseNode.right === null
      )
        return undefined;
    }
    return depth;
  }

  height(node = this.root) {
    if (node === null) return 0;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    if (leftHeight > rightHeight) return leftHeight + 1;
    else return rightHeight + 1;
  }

  isBalanced(node = this.root) {
    const heightDifference = Math.abs(this.height(node.left) - this.height(node.right));
    if (heightDifference > 1) return false;
    return true;
  }

  rebalance() {
    const tempArray = this.inOrder();
    this.root = Tree.buildTree(tempArray);
  }
}
//
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// const testTree = new Tree(testArr);
// testTree.insertItem(2);
// testTree.insertItem(2);
// testTree.insertItem(10);
// testTree.insertItem(11);
// prettyPrint(testTree.root);

// const testTreeTwo = new Tree(testArr);
// prettyPrint(testTreeTwo.root);
// testTreeTwo.deleteItem(8);
// prettyPrint(testTreeTwo.root);
// testTreeTwo.deleteItem(23);
// prettyPrint(testTreeTwo.root);
// testTreeTwo.deleteItem(4);
// prettyPrint(testTreeTwo.root);

// const testTreeThree = new Tree(testArr);
// prettyPrint(testTreeThree.root);
// console.log(testTreeThree.find(9));
// console.log(testTreeThree.find(1));
// console.log(testTreeThree.find(10));
// console.log(testTreeThree.levelOrder());
// console.log(testTreeThree.inOrder());
// console.log(testTreeThree.preOrder());
// console.log(testTreeThree.postOrder());
// console.log(testTreeThree.depth(6345));
// console.log(testTreeThree.height());
// console.log(testTreeThree.isBalanced());

const testTreeFour = new Tree(testArr)
prettyPrint(testTreeFour.root)
console.log(testTreeFour.isBalanced())
testTreeFour.insertItem(100);
testTreeFour.insertItem(101);
testTreeFour.insertItem(102);
testTreeFour.insertItem(103);
prettyPrint(testTreeFour.root)
console.log(testTreeFour.isBalanced())
testTreeFour.rebalance()
prettyPrint(testTreeFour.root)
console.log(testTreeFour.isBalanced())