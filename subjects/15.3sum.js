// 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

// 例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]


// /**
//  * @param {number[]} nums
//  * @return {number[][]}
//  */
// var threeSum = function (nums) {
//     let res = []
//     let repeat = [];
//     nums.sort((a, b) => a - b);
//     for (let i = 0; i < nums.length - 2; i++) {
//         for (let j = i + 1; j < nums.length - 1; j++) {
//             for (let k = j + 1; k < nums.length; k++) {
//                 if (nums[i] + nums[j] + nums[k] === 0) {
//                     let tmpResult = [nums[i], nums[j], nums[k]];
//                     let tmpStr = tmpResult.toString();
//                     if (repeat.indexOf(tmpStr) === -1) {
//                         res.push(tmpResult);
//                         repeat.push(tmpStr)
//                     }

//                 }
//             }
//         }
//     }
//     return res
// };

// var threeSum = function (nums) {
//     let res = []
//     let length = nums.length;
//     nums.sort((a, b) => a - b) // 先排个队，最左边是最弱（小）的，最右边是最强(大)的
//     if (nums[0] <= 0 && nums[length - 1] >= 0) { // 优化1: 整个数组同符号，则无解
//         for (let i = 0; i < length - 2;) {
//             if (nums[i] > 0) break; // 优化2: 最左值为正数则一定无解
//             let first = i + 1
//             let last = length - 1
//             do {
//                 if (first >= last || nums[i] * nums[last] > 0) break // 两人选相遇，或者三人同符号，则退出
//                 let result = nums[i] + nums[first] + nums[last]
//                 if (result === 0) { // 如果可以组队
//                     res.push([nums[i], nums[first], nums[last]])
//                 }
//                 if (result <= 0) { // 实力太弱，把菜鸟那边右移一位
//                     while (first < last && nums[first] === nums[++first]) { } // 如果相等就跳过
//                 } else { // 实力太强，把大神那边右移一位
//                     while (first < last && nums[last] === nums[--last]) { }
//                 }
//             } while (first < last)
//             while (nums[i] === nums[++i]) { }
//         }
//     }
//     return res
// }

var threeSum = function(nums) {
    let ans = [];
    const len = nums.length;
    if(nums === null || len < 3) return ans;
    nums.sort((a, b) => a - b); // 排序
    for (let i = 0; i < len ; i++) {
        if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
        let L = i+1;
        let R = len-1;
        while(L < R){
            const sum = nums[i] + nums[L] + nums[R];
            if(sum === 0){
                ans.push([nums[i],nums[L],nums[R]]);
                while (L<R && nums[L] == nums[L+1]) L++; // 去重
                while (L<R && nums[R] == nums[R-1]) R--; // 去重
                // L++;
                // R--;
            }
            else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }        
    return ans;
};


var nums = [-1, 0, 1, 2, -1, -4]

var res = threeSum(nums);

console.log('res', res);



