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

  static buildTree(array) {
    if (array.length <= 1) return null;
    const mid = parseInt(array.length / 2);
    const node = new Node(array[mid]);
    node.left = Tree.buildTree(array.slice(0, mid));
    node.right = Tree.buildTree(array.slice(mid));
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
    if (node === null) return node
    if (item < node.data) {
      node.left = this.deleteItem(item, node.left)
    } else {
      node.right = this.deleteItem(item, node.right)
    }
    // TODO
  }
}

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
const testTree = new Tree(testArr);
testTree.insertItem(2);
testTree.insertItem(2);
testTree.insertItem(10);
testTree.insertItem(11);
prettyPrint(testTree.root);
