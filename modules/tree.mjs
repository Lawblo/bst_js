import { merge_sort } from "./merge_sort.mjs";
import { Node } from './node.mjs'

export function tree (arr) {
    let root = buildTree(prepare_array(arr));

    function prepare_array(arr) {
        return (merge_sort([...new Set(arr)]))
    }

    function buildTree(arr) {
        if (arr.length == 0) {
            return null;
        }

        let mid = Math.floor(arr.length / 2);
        let left = arr.slice(0, mid);
        let right = arr.slice(mid + 1);

        return Node(arr[mid], buildTree(left), buildTree(right));
    }



    function insert(value, node = root) {
        if (value < node.data) {
            node.left
                ? insert(value, node.left)
                : node.left = Node(value);
        } else if (value > node.data) {
            node.right
                ? insert(value, node.right)
                : node.right = Node(value);
        }
    }

    function find(value, node = root) {
        console.log(`Searching for ${value}. \nCurrent node value: ${node.data}`)

        if (node.data == value) {
            return node
        }

        if (!node.left && !node.right) {
            return null
        }

        if (node.data > value && node.left) {
            return find(value, node.left)
        } 
        else if ( node.data < value && node.right) {
            return find(value, node.right)
        }
        else {
            return null
        }
    }

    function delete_val(value) {
        let node = find(value)
        console.log(node)
        if (!node) {
            console.log('value not found')
            return 
        }

        if (!node.left && node.right) {
            node.data = node.right.data
            node.right = node.right.right
            node.left = node.right.left
            return 
        }  
        if (!node.right && node.left) {
            node.data = node.left.data
            node.right = node.left.right
            node.left = node.left.left
            return 
        }

        if (!node.left && !node.right) {
            node.data = null
            node.left = null
            node.right = null
            return 
        }

        let store_right = node.right

        place_node(store_right, node)
    }

    function place_node(store_node, node) {
        if (!node.right) {
            node.right = store_node
            return 
        }

        place_node(store_node, node.right)
    }

    function prettyPrint(node = root, prefix = "", isLeft = true) {
        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
    return { root, insert, find, delete_val, prettyPrint };
}

