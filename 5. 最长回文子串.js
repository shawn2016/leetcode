// 5. 最长回文子串
// 给你一个字符串 s，找到 s 中最长的回文子串。



// 示例 1：

// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
// 示例 2：

// 输入：s = "cbbd"
// 输出："bb"


// 提示：

// 1 <= s.length <= 1000
// s 仅由数字和英文字母组成

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    // 中心扩散法
    let substring = ''
    // 对于每个位置的子串寻找最长回文子串
    for (let i = 0; i < s.length; i++) {
        // 对于奇数串，返回每个位置的最长回文子串
        let s1 = p(s, i, i);
        // 对于偶数串，返回每个位置的最长回文子串
        let s2 = p(s, i, i + 1);
        // 去检查每个位置的回文子串，找到那个最长的
        if (s1.length > substring.length) substring = s1
        if (s2.length > substring.length) substring = s2
    }
    // 通过这个函数去寻找以l、r为中心的回文子串
    function p(s, l, r) {
        // 这是一个循环移动l、r两个指针的过程。当l和r指向的字符相同时，就继续分别向左和向右移动指针，直到不满足条件。
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            l--
            r++
        }
        // 返回l到r之间的字符即可，这个部分就是这个位置的最长回文子串
        return s.slice(l + 1, r)
    }
    // 返回最长回文子串
    return substring

};