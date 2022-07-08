// // 42. 接雨水
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。



// 示例 1：



// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
// 示例 2：

// 输入：height = [4,2,0,3,2,5]
// 输出：9


// 提示：

// n == height.length
// 1 <= n <= 2 * 104
// 0 <= height[i] <= 105

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    /**
     * // 动态规划 时间 O(n) 空间O(n)
    let left = 0
    let right = 0
    // 新建两个数组
    let leftMax = new Array(height.length).fill(0)
    let rightMax = new Array(height.length).fill(0)
    let res = 0

    // 将数组中放入左边最高的高度
    for (let i = 0; i < height.length; i++) {
        if (height[i] > left) {
            left = height[i]
        }
        leftMax[i] = left
    }
    // 将数组中放入右边最高的高度
    for (let i = height.length; i >= 0; i--) {
        if (height[i] > right) {
            right = height[i]
        }
        rightMax[i] = right
    }

    // 取最小值，减去柱子本身
    for (let i = 0; i < height.length; i++) {
        res += Math.min(leftMax[i], rightMax[i]) - height[i]
    }
    return res
     */

    // 双指针 时间O(n)  空间O(1)
    let left = 0
    let right = height.length - 1
    let leftMax = height[left]
    let rightMax = height[right]
    let ans = 0
    while (left < right) {
        if (leftMax < rightMax) {
            left++
            leftMax = Math.max(leftMax, height[left])
            ans += leftMax - height[left]
        } else {
            right--
            rightMax = Math.max(rightMax, height[right])
            ans += rightMax - height[right]
        }
    }
    return ans



}