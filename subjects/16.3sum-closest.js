// 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

// 例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

// 与 target 最接近的三个数的和为 2.(-1 + 2 + 1 = 2).



/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    const len = nums.length;
    if (len < 3) {
        return null;
    }
    nums.sort((a, b) => a - b);
    let res = target - (nums[0] + nums[1] + nums[2]);
    for (let i = 0; i < len - 2; i++) {
        let left = i + 1, right = len - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === target) {
                return sum;
            } else if (sum < target) {
                while (nums[left] === nums[++left]);
            } else {
                while (nums[right] === nums[--right]);
            }
            if (Math.abs(sum - target) < Math.abs(res)) {
                res = target - sum;
            }
        }
    }
    return target - res;
};


let nums = [-1, 2, 1, -4], target = 1;

let result = threeSumClosest(nums, target);

console.log('result', result)



