// 22. 括号生成
// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。



// 示例 1：

// 输入：n = 3
// 输出：["((()))","(()())","(())()","()(())","()()()"]
// 示例 2：

// 输入：n = 1
// 输出：["()"]


// 提示：

// 1 <= n <= 8

/**
* @param {number} n
* @return {string[]}
b站视频：https://www.bilibili.com/video/BV1Vg4y1q7Kv?spm_id_from=333.337.search-card.all.click&vd_source=361cd16b705667f69fbaf20260b48fe7
*/
// 回溯
var generateParenthesis = function (n) {
    const res = [] // 用数组存储结果
    function dfs(l, r, str) {
        if (l === 0 && r === 0) { // 终止条件
            res.push(str)
            return
        }
        if (l > 0) { // 先消耗左括号
            dfs(l - 1, r, str + '(')
        }
        if (l < r) { // 消耗有括号
            dfs(l, r - 1, str + ')')
        }

    }
    dfs(n, n, '')
    return res
};