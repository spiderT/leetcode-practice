
// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

//  

// 示例:

// 给定 1->2->3->4, 你应该返回 2->1->4->3.


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 添加一个哨兵节点
var swapPairs = function (head) {
    if (!head || !head.next) return head;
    let res = new ListNode(null);
    res.next = head;
    let prev = res;
    while (prev.next && prev.next.next) {
        let [fst, snd] = [prev.next, prev.next.next];
        [prev.next, fst.next, snd.next] = [snd, snd.next, fst];
        prev = prev.next.next;
    }
    return res.next;
};

// 递归
var swapPairs = function (head) {
    if (!head || !head.next) return head;
    let [fst, snd] = [head, head.next];
    [fst.next, snd.next] = [swapPairs(snd.next), fst];
    return snd;
};