// 124. 二叉树中的最大路径和
// 路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。

// 路径和 是路径中各节点值的总和。

// 给你一个二叉树的根节点 root ，返回其 最大路径和 。



// 示例 1：


// 输入：root = [1,2,3]
// 输出：6
// 解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
// 示例 2：


// 输入：root = [-10,9,20,null,null,15,7]
// 输出：42
// 解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42


// 提示：

// 树中节点数目范围是 [1, 3 * 104]
// -1000 <= Node.val <= 1000

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
* @return {number}
*/
//    采用深度优先遍历
var maxPathSum = function (root) {
    let maxSum = Number.MIN_SAFE_INTEGER // 设置一个最小正整数
    dfs(root)
    function dfs(node) {
        if (!node) return 0 // 节点为空 直接返回0
        const left = Math.max(0, dfs(node.left)) // 获取左边最大值
        const right = Math.max(0, dfs(node.right)) // 获取右边最大值
        maxSum = Math.max(maxSum, left + node.val + right) // 更新最大值，为什么需要全部加起来，因为 都是最大值了
        return Math.max(left, right) + node.val // 求出以本身时，最大值
    }
    return maxSum
}