// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

// 示例 1:

// 输入: 123
// 输出: 321
//  示例 2:

// 输入: -123
// 输出: -321
// 示例 3:

// 输入: 120
// 输出: 21

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    if (x === 0 || x < (Math.pow(-2, 31)) || x > (Math.pow(2, 31) - 1)) return 0;
    let flag = true;
    if (x < 0) {
        x * -1
        flag = false
    }
    let result = parseInt(x.toString().split("").reverse().join(""));
    if (result < (Math.pow(-2, 31)) || result > (Math.pow(2, 31) - 1)) return 0;
    if (!flag) return result * -1;
    return result
};

var x = 120
var result = reverse(x);

console.log('result', result);