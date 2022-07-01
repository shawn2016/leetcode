// 11. 盛最多水的容器
// 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

// 返回容器可以储存的最大水量。

// 说明：你不能倾斜容器。



// 示例 1：



// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49 
// 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
// 示例 2：

// 输入：height = [1,1]
// 输出：1


// 提示：

// n == height.length
// 2 <= n <= 105
// 0 <= height[i] <= 104

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let max = 0 //面积最大值
    let right = height.length - 1 // 获取右边下标
    let left = 0 // 获取左边下标
    while (left < right) {
        let area = (right - left) * Math.min(height[left], height[right]) // 获取当前下标盛水面积
        max = Math.max(area, max) // 与上一次比较更新最大面值
        // 两边下标移动的距离相同，取决于那个下标对应的高度
        if (height[left] < height[right]) {
            left++
        } else {
            right--
        }
    }
    return max
};