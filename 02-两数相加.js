
// 2. 两数相加
// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

// 请你将两个数相加，并以相同形式返回一个表示和的链表。

// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

 

// 示例 1：


// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[7,0,8]
// 解释：342 + 465 = 807.
// 示例 2：

// 输入：l1 = [0], l2 = [0]
// 输出：[0]
// 示例 3：

// 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// 输出：[8,9,9,9,0,0,0,1]
 

// 提示：

// 每个链表中的节点数在范围 [1, 100] 内
// 0 <= Node.val <= 9
// 题目数据保证列表表示的数字不含前导零

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

 var addTwoNumbers = function(l1, l2) {
    // head变量保存头结点
    let head = null
    // 当前操作的新节点
    let tail = null;
    // sum中的十位数部分
    let carry = 0;
    while (l1 || l2) {
        // 获取当前链表头结点的值，没有就设置为0
        const n1 = l1 ? l1.val : 0;
        const n2 = l2 ? l2.val : 0;
        const sum = n1 + n2 + carry;
        if (!head) {
        // 取出sum中的个位数部分
            head = tail = new ListNode(sum % 10);
        } else {
            // 取出sum中的个位数部分，接在后面
            tail.next = new ListNode(sum % 10);
            // 移动位置
            tail = tail.next;
        }
        // 取出sum中的十位数部分
        carry = Math.floor(sum / 10);
        
        if (l1) {
            // 移动l1
            l1 = l1.next;
        }
        if (l2) {
            // 移动l2
            l2 = l2.next;
        }
    }
    // 最后需要处理的十位数部分
    if (carry > 0) {
        tail.next = new ListNode(carry);
    }
    return head;
};