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

    function find_smallest(node = root) {
        if (!node.left) {
            return node.data
        }
        else {
            return find_smallest(node.left)
        }
    }

    function delete_node(value, node=root) {
        if (!node) {
            return null
        }
        if (value < node.data) {
            node.left = delete_node(value, node.left)
        }
        else if (value > node.data) {
            node.right = delete_node(value, node.right)
        }
        else if (value == node.data) {
            if (node.left == null) {
                return node.right
            }
            else if (node.right == null) {
                return node.left
            }
            node.data = find_smallest(node.right)
            node.root = delete_node(node.data, node.right)
        }
        return node
    }

    function levelOrderRec(func=node_data => node_data, node=root, stored_nodes = [], stored_output = []) {
        stored_output.push(func(node.data))
        if(node.left) {
            stored_nodes.push(node.left)
        }
        if (node.right) {
            stored_nodes.push(node.right) 
        }
        if (stored_nodes.length > 0) {
            levelOrderRec(func, stored_nodes.shift(), stored_nodes, stored_output)
        }
        return stored_output
    }

    function levelOrderIt(func=node_data => node_data) {
        let stored_output = []
        let stored_nodes = []
        let node = root
        if (!node) {
            console.log('Tree Empty')
            return null
        }

        while (true) {
            stored_output.push(func(node.data))
            if (node.left) {
                stored_nodes.push(node.left)
            }

            if (node.right) {
                stored_nodes.push(node.right)
            }

            if(stored_nodes.length < 1) {
                return stored_output
            }
            else {
                node = stored_nodes.shift()
            }
        }
    }

    function inorder(func=node_data => node_data, node=root, stored_output=[]) {
        if (node.left) {
            inorder(func, node.left, stored_output)
        }
        stored_output.push(func(node.data))

        if (node.right) {
            inorder(func, node.right, stored_output)
        }
        return stored_output
    }

    function preorder(func=node_data => node_data, node=root, stored_output=[]) {
        stored_output.push(func(node.data))
        if (node.left) {
            inorder(func, node.left, stored_output)
        }

        if (node.right) {
            inorder(func, node.right, stored_output)
        }
        return stored_output
    }

    function postorder(func=node_data => node_data, node=root, stored_output=[]) {
        if (node.left) {
            inorder(func, node.left, stored_output)
        }

        if (node.right) {
            inorder(func, node.right, stored_output)
        }
        stored_output.push(func(node.data))
        return stored_output
    }
    function prettyPrint(node = root, prefix = '', isLeft = true) {
        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
    return { root, insert, find, find_smallest, delete_node, levelOrderRec, levelOrderIt, inorder, preorder, postorder, prettyPrint };
}

