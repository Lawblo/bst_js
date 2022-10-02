const Node =  require("./modules/node");
const Tree = require("./modules/tree");

//const arr = [1, 6, 4, 5, 2, 12, 15, 3, 3, 3];

const arr = Array.from({length: 10}, () => Math.floor(Math.random() * 20 + 1))
let tree = Tree(arr);

tree.prettyPrint()




tree.delete_val(14)
tree.prettyPrint()
