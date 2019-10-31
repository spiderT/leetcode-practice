// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

// 示例 1：

// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。
// 示例 2：

// 输入: ""aacdefcaa""
// 输出: "aa"

var longestPalindrome = function (s) {
    function isPalindrome(str) {
        var len = str.length
        var middle = parseInt(len / 2)
        for (var i = 0; i < middle; i++) {
            if (str[i] !== str[len - i - 1]) {
                return false
            }
        }
        return true
    }
    var ans = '', max = 0, len = s.length;
    for (var i = 0; i < len; i++) {
        for (var r = i + 1; r <= len; r++) {
            var tmpStr = s.substring(i, r)
            if (isPalindrome(tmpStr) && tmpStr.length > max) {
                ans = s.substring(i, r)
                max = Math.max(max, tmpStr.length)
            }
        }
    }
    return ans;

}

// var longestPalindrome = function(s) {
//     if (!s || !s.trim()) return '';
//     if (s.length === 1) return s;
//     if (s.length === 2) return s[0] === s[1] ? s[0] + s[1] : s[1];
//     let result = '';
//     /**
//     *扩散坐标
//     */
//     var calPalindromeIndex = function(left,right,s){
//         let len = s.length;
//         while(left>=0&&right<len&&s[left] == s[right]){
//             left--;
//             right++;
//         }
//         return {left:left+1,right:right}
//     }
//     for(let i = 0,len = s.length;i<len;i++){
//         let even = '';
//         let odd = '';
//         if(s[i] == s[i+1]){
//             //经过当前位与下一位判断已构成回文，扩散位直接从下一位开始，可以提速
//             let evenIndex = calPalindromeIndex(i-1,i+2,s);
//             even = s.slice(evenIndex.left,evenIndex.right);
//         }
//         let oddIndex = calPalindromeIndex(i-1,i+1,s);
//         odd = s.slice(oddIndex.left,oddIndex.right);
//         let re = odd.length>even.length?odd:even;
//         result = result.length>re.length?result:re;
//     }
//     return result;
// };


var longestPalindrome = function (s) {
    if (!s || s.length == 0 || s.length == 1) {
        return s;
    }
    var s_f = s.split('').reverse().join('');
    var resultStr = s[0];
    var maxLen = 1;
    var tmpLen = 1;
    var len = s.length;
    //判断字符串是否回文
    function isPalinerome(i, r) {
        if (len - i - 1 == r - tmpLen + 1) {
            return true
        }
        return false;
    }
    //初始化二维数组
    var len = s.length;
    var arr = new Array(len);
    for (var i = 0; i < len; i++) {
        arr[i] = [];
        for (var r = 0; r < len; r++) {
            arr[i][r] = 0
        }
    }
    for (var i = 0; i < len; i++) {
        for (var r = 0; r < len; r++) {
            if (s[i] == s_f[r]) {
                if (i == 0 || r == 0) {
                    arr[i][r] = 1
                } else {
                    arr[i][r] = arr[i - 1][r - 1] + 1
                    tmpLen = arr[i][r]
                }
                if (tmpLen > maxLen && isPalinerome(i, r)) {
                    maxStrIndex = r;
                    maxLen = tmpLen;
                    resultStr = s.substring(i - tmpLen + 1, i + 1);
                }
            }
        }
    }
    return resultStr;
};

var s = 'aacdefcaa';
var s2 = 'babad';
var s3 = 'cbbd';
var result = longestPalindrome(s);
var result2 = longestPalindrome(s2);
var result3 = longestPalindrome(s3);
console.log('result', result);
console.log('result2', result2);
console.log('result3', result3);