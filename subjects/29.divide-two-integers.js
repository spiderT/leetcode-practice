// 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。

// 返回被除数 dividend 除以除数 divisor 得到的商。

// 示例 1:

// 输入: dividend = 10, divisor = 3
// 输出: 3
// 示例 2:

// 输入: dividend = 7, divisor = -3
// 输出: -2
// 说明:

// 被除数和除数均为 32 位有符号整数。
// 除数不为 0。
// 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31,  2^31 − 1]。本题中，如果除法结果溢出，则返回 2^31 − 1。

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    var INT_MAX = 0x7FFFFFFF;
    var INT_MIN = 1 << 31;

    var symbol = (dividend ^ divisor) >> 31;
    var _dividend = dividend > 0 ? -dividend : dividend;
    var _divisor = divisor > 0 ? -divisor : divisor;

    var times = divided_negtive(_dividend, _divisor);

    var output = 0;
    for (var i = 0; i < times.length; i++) {
        if (times[i] === 31) {
            if (symbol === 0) {
                return INT_MAX;
            }
            return INT_MIN;
        }
        output += (1 << times[i]);
    }
    return symbol ? -output : output;

};


function divided_negtive(dividend, divisor) {
    if (divisor < dividend) {
        return [];
    }

    var timesMax = 32;
    var timesMin = 0;
    while (timesMax !== timesMin + 1) {
        var mid = (timesMax + timesMin) >> 1;
        if (divisor < (-1 << (31 - mid))) {
            timesMax = mid;
            continue;
        }

        var testVal = divisor << mid;
        if (testVal < dividend) {
            timesMax = mid;
        } else {
            timesMin = mid;
        }
    }
    return [timesMin].concat(divided_negtive(dividend - (divisor << timesMin), divisor));
}
