import { tree } from "./modules/tree.mjs";



function drawTrees(repeats) {
    for (let i = 0; i < repeats; i++) {

        // const arr = [1, 6, 4, 5, 2, 12, 15, 3, 3, 3, 13];
        const arr = Array.from({length: 20}, () => Math.floor(Math.random() * 30 + 1))
        let full_tree = tree(arr);

        full_tree.insert(13)
        full_tree.prettyPrint()
        let a = full_tree.inorder()
        console.log(a)
    }

}




drawTrees(1)
