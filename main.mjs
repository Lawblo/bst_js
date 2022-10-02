import { Node } from "./modules/node.mjs";
import { tree } from "./modules/tree.mjs";


const arr = [1, 6, 4, 5, 2, 12, 15, 3, 3, 3];

// const arr = Array.from({length: 10}, () => Math.floor(Math.random() * 20 + 1))
let full_tree = tree(arr);

full_tree.prettyPrint()




