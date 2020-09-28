// Source: Cracking the coding interview page 71:

// Numbers are randomly generated and stored into an (expanding) array.
// How would you keep track of the median?

// If there are two middle elements, the median is the average of the two.

// ---

// 4 5 9 5 123 3 5 11 4945 452 993 34 34 245

// Step 0: first number will be THE median.
// Then put the whole bunch into a binary search tree.

// I want to reduce insertion cost.

// What sorting do I choose? Let's do a balanced binary tree, because I have not done that yet!

// it's just inserting values into a sorted array.


// Implement binary search tree.

class BinSearchTree{

    root = null

    insert(value){
        if (!root){
            root = this.newElement(value)
        } else {
            this.findPlaceForTheValue(value, root)
        }
    }

    findPlaceForTheValue(value, node){
        if (value == node.value){
            // We already have this element in the array. Let's increase the counter of it.
            node.count++
        } else if (value > node.value){
            if (node.right){
                findPlaceForTheValue(value, node.right, node)
            } else {
                // insert it there
                node.right = this.newElement(value)
                node.balance++
            }
        } else {
            // go left
            if (node.left){
                findPlaceForTheValue(value, node.left, node)
            } else {
                // insert it there
                node.left = this.newElement(value)
                node.balance--
            }
        }
        // rebalance
    }

    reBalance(){
        
    }

    newElement(value){
        return {value, left: null, right: null, balance: 0, count: 1}
    }

}
