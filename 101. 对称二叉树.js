// 101. 对称二叉树
// 给你一个二叉树的根节点 root ， 检查它是否轴对称。



// 示例 1：


// 输入：root = [1,2,2,3,4,4,3]
// 输出：true
// 示例 2：


// 输入：root = [1,2,2,null,3,null,3]
// 输出：false


// 提示：

// 树中节点数目在范围 [1, 1000] 内
// -100 <= Node.val <= 100


// 进阶：你可以运用递归和迭代两种方法解决这个问题吗？
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
    // 没有根节点就直接是对称
    if (!root) return true
    return f(root.left, root.right)

    function f(node1, node2) {
        // 两个节点是空的
        if (node1 === null && node2 === null) return true
        // 两个节点 一个是空的 一个是非空的
        if (node1 === null || node2 === null) return false
        // 两个节点 值相同，并且他的左右节点 对称
        return node1.val === node2.val && f(node1.left, node2.right) && f(node1.right, node2.left)
    }
}