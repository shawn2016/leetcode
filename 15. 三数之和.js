// 15. 三数之和
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。



// 示例 1：

// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 示例 2：

// 输入：nums = []
// 输出：[]
// 示例 3：

// 输入：nums = [0]
// 输出：[]


// 提示：

// 0 <= nums.length <= 3000
// -105 <= nums[i] <= 105

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const ans = []
    const n = nums.length;
    if (nums == null || n < 3) return []; // 根据题目所得
    nums.sort((a, b) => a - b) // 先从小到大排序
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) break; // 如果当前数字大于0，因为排完序之后，第一个数是最小的数，三数之和一定大于0，所以结束循环
        if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重  当前固定的值去重
        // nums[i] 当前起始值
        // nums[l] 从左往右的值
        // nums[r] 从右往左的值
        let l = i + 1; // 
        let r = n - 1;
        while (l < r) {
            if (nums[i] + nums[l] + nums[r] === 0) {
                ans.push([nums[i], nums[l], nums[r]]);
                while (l < r && nums[l] == nums[l + 1]) l++; // 去重 去除左边一样的值
                while (l < r && nums[r] == nums[r - 1]) r--; // 去重 去除右边一样的值
                l++
                r--
            } else if (nums[i] + nums[l] + nums[r] < 0) {
                l++
            } else {
                r--
            }
        }
    }
    return ans

};
