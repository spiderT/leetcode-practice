// 给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

// 说明：你不能倾斜容器，且 n 的值至少为 2。

// 示例:

// 输入: [1,8,6,2,5,4,8,3,7]
// 输出: 49


/**
 * @param {number[]} height
 * @return {number}
 */
// var maxArea = function (height) {
//     let res = 0;
//     for (let i = 0; i < height.length - 1; i++) {
//         for (let j = i + 1; j < height.length; j++) {
//             let temp = (j - i) * Math.min(height[i], height[j]);
//             res = Math.max(temp, res);
//         }
//     }
//     return res;
// };


// 双指针法

var maxArea = function (height) {
    let i = 0, // 左边界
        j = height.length - 1, // 右边界
        res = 0, // 最大值
        lastHeight = 0; // 存放上一次的高度
    while (i < j) {
        if (height[i] < height[j]) { // 以左边界为高
            if (height[i] > lastHeight) { // 只考虑移动后高度增加的情况（移动后宽度肯定变小，若高度也变小，则面积是一定小于之前的）
                res = Math.max(res, (j - i) * height[i]); // 将最大值赋值给res
                lastHeight = height[i]; // 将高度赋值给lastHeight
            }
            i++;
        } else { // 以右边界为高
            if (height[j] > lastHeight) {
                res = Math.max(res, (j - i) * height[j]);
                lastHeight = height[j];
            }
            j--;
        }
    }
    return res;
};
