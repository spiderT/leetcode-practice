// 给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。

// 例如，给出 n = 3，生成结果为：

// [
//   "((()))",
//   "(()())",
//   "(())()",
//   "()(())",
//   "()()()"
// ]

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    let results = [[""]];
    for (let i = 1; i <= n; i++) {
        let result = [];
        for (let j = 0; j < i; j++) {
            const first = results[j];
            const second = results[i - j - 1]
            for (let key in first) {
                const tmpFirst = first[key];
                for (let secondKey in second) {
                    const tmpSecond = second[secondKey];
                    result.push("(" + tmpFirst + ")" + tmpSecond);
                }
            }
        }
        results.push(result);
    }
    return results[results.length - 1];
};
