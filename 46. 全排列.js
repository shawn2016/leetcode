// 46. 全排列
// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

 

// 示例 1：

// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// 示例 2：

// 输入：nums = [0,1]
// 输出：[[0,1],[1,0]]
// 示例 3：

// 输入：nums = [1]
// 输出：[[1]]
 

// 提示：


// 1 <= nums.length <= 6
// -10 <= nums[i] <= 10
// nums 中的所有整数 互不相同

/**
 * @param {number[]} nums
* @return {number[][]}
*/
var permute = function(nums) {
    const res = []
    dfs([])
    function dfs(path){
        // 终止条件
        if(path.length === nums.length){
            res.push([...path])
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if(path.includes(nums[i])){
                // 排除同样的数字 如 11、122
                continue
            };
            // 寻找除了自己一样的数字，如12、123
            path.push(nums[i])
            // 重复同样的操作
            dfs(path)
            path.pop()

            
        }

    }
    return res
}