// 17. 电话号码的字母组合
// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。





// 示例 1：

// 输入：digits = "23"
// 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
// 示例 2：

// 输入：digits = ""
// 输出：[]
// 示例 3：

// 输入：digits = "2"
// 输出：["a","b","c"]


// 提示：

// 0 <= digits.length <= 4
// digits[i] 是范围 ['2', '9'] 的一个数字。


// 假设用户输入'23'

var letterCombinations = function (digits) {
    let res = []
    let table = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'] // 键盘对应字母
    if (!digits) return []
    f(0, '', table, digits, res)
    return res
}
function f(idx, cur, table, digits, res) {
    // 终止条件
    // 第一次调用 idx=0 cur='' 0!==2直接跳过
    // 第二次调用 idx=1 cur='' 1!==2直接跳过
    // 第三次调用 idx=2 cur='' 2===2进入判断 res = [ad,ae,af]
    if (idx === digits.length) {
        res.push(cur)
        return
    }
    // 第一次调用 str = abc
    // 第二次调用 str = def
    let str = table[Number(digits[idx]) - 2]  // 获取当前用户输入的当前遍历的值
    for (const char of str) {
        // 第一次循环 第一次调用 cur = a
        // 第一次循环 第二次调用 cur = ad
        
        // 第二次循环 第一次调用 cur = a
        // 第二次循环 第二次调用 cur = ad

        cur = cur.concat(char) // 将之前的字符串拼接上
        f(idx + 1, cur, table, digits, res) // 开始第二次调用 // 开始第三次调用
        console.log(cur,'前')
        cur = cur.slice(0, cur.length - 1) // 第三次调用结束后  cur = a 接着进入第二次循环
        console.log(cur,'后')
    }
}

letterCombinations('23')