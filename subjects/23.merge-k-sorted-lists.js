// 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。

// 示例:

// 输入:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// 输出: 1->1->2->3->4->4->5->6


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
//  遍历所有节点将节点值提取到数组中，然后对数组排序，遍历数组将数组内容重新转化为链表
var mergeKLists = function (lists) {
    let len = lists.length;
    if (len == 0) return null;
    if (len == 1) return lists[0];
    let arr = new Array();
    for (let i = 0; i < len; i++) {
        let temp = lists[i];
        while (temp) {
            arr.push(temp.val);
            temp = temp.next;
        }
    }
    arr.sort((a, b) => a - b);
    let heap = new ListNode();
    let cur = heap;
    for (let i = 0, len = arr.length; i < len; i++) {
        let node = new ListNode(arr[i]);
        cur.next = node;
        cur = cur.next;
    }
    return heap.next;
};


// 链表逐一进行合并
var mergeKLists = function (lists) {
    const len = lists.length;
    if (len === 0) return null;
    if (len === 1) return lists[0];
    let heap = new ListNode();
    heap.next = lists[0];
    for (let i = 1; i < len; i++) {
        let cur1 = heap.next;
        let cur2 = lists[i];
        let origh = heap;
        while (cur1 !== null && cur2 !== null) {
            if (cur1.val >= cur2.val) {
                origh.next = cur2;
                cur2 = cur2.next;
            } else {
                origh.next = cur1;
                cur1 = cur1.next;
            }
            origh = origh.next;
        }
        if (cur1) origh.next = cur1;
        if (cur2) origh.next = cur2;
    }
    return heap.next;
};

// 归并排序

function partition(lists) {
    switch (lists.length) {
        case 0:
            return null;
        case 1:
            return lists[0];
        case 2:
            return merge2Lists(lists[0], lists[1]);
        default:
            let mid = lists.length >> 1;
            return merge2Lists(partition(lists.slice(0, mid)),
                partition(lists.slice(mid, lists.length)));
    }
}

function merge2Lists(l0, l1) {
    let p0 = l0,
        p1 = l1,
        c = new ListNode(null),
        pc = c;
    while (p0 || p1) {
        if (p0 && p1) {
            if (p0.val < p1.val) {
                pc.next = p0;
                p0 = p0.next;
            } else {
                pc.next = p1;
                p1 = p1.next;
            }
        } else if (p0) {
            pc.next = p0;
            break;
        } else if (p1) {
            pc.next = p1;
            break;
        }
        pc = pc.next;
    }
    return c.next;
}

var mergeKLists = function (lists) {
    return partition(lists);
};
