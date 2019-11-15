# leetcode-practice(争取每日1题1024)

## 1. 算法

### 1.1. 两数之和

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例：
```text
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

我当时的解法：

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var arr;
    nums.map((item1,index1)=>{
      nums.map((item2,index2)=>{
        if((item1+item2===target) && (index1 !==index2)){
          arr = [Math.min(index1,index2),Math.max(index1,index2)];
        }
      })
    })
    console.log(arr);
    return arr;
};
```

其他题解1
```js
// 暴力法
// 使用两层循环，外层循环计算当前元素与 targettarget 之间的差值，内层循环寻找该差值，若找到该差值，则返回两个元素的下标。
// 时间复杂度：O(n^2)


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for (var i = 0; i < nums.length; i++) {
        var dif = target - nums[i];
        // j = i + 1 的目的是减少重复计算和避免两个元素下标相同
        for (var j = i + 1; j < nums.length; j++) {
            if(nums[j] == dif)
                return [i,j];
        }
    }
};
```

// 其他题解2
```js
// 利用数组减少查询时间
// 在暴力法中，内层循环查找差值很浪费时间，那么如何减少查询时间呢？利用数组就可以减少查询时间。
// 使用一层循环，每遍历到一个元素就计算该元素与 targettarget 之间的差值 difdif，然后以 difdif 为下标到数组temp中寻找，如果 temp[dif] 有值(即不是 undefinedundefined)，则返回两个元素在数组 numsnums 的下标，如果没有找到，则将当前元素存入数组 temptemp 中(下标: nums[i], Value: inums[i],Value:i) 。
// 时间复杂度：O(n)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var temp = [];
    for(var i=0;i<nums.length;i++){
        var dif = target - nums[i];
        if(temp[dif] != undefined){
            return [temp[dif],i];
        }
        temp[nums[i]] = i;
    }
};
```

### 1.2. 两数相加

给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var l1 = [2,4,3];
var l2 = [5,6,4];
var addTwoNumbers = function(l1, l2) {
  let p1 = l1, p2 = l2, carry = 0;
  const dummy = new ListNode()
  let pointer = dummy
  while (p1 || p2 || carry) {
    const num1 = p1 ? p1.val : 0;
    const num2 = p2 ? p2.val : 0;
    const sum = num1 + num2 + carry;
    if (sum >= 10) {
      pointer.next = new ListNode(sum % 10)
      carry = 1
    } else {
      pointer.next = new ListNode(sum)
      carry = 0
    }
    if (p1) {p1 = p1.next}
    if (p2) {p2 = p2.next}
    pointer = pointer.next
  }
  return dummy.next
};
```

### 1.3. 无重复字符的最长子串  

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

```js
// 我的答案
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
     let i = 0, res = 0, n = 0;
     for (let j = 0; j < s.length; j++) {
      let sliceStr = s.slice(i, j);
      n = sliceStr.indexOf(s[j]);
      if (n === -1) {
        res = Math.max(res, j + 1 - i);
      } else {
        i += n + 1;
      }
    }
    console.log('res===>', res);
    return res;
};
```

// 其他题解1

```js
var lengthOfLongestSubstring = function(s) {
  let num = 0,res = 0;
  let m = '';
  for (n of s) {
    if (m.indexOf(n) == -1) {
      m += n;
      num++;
      res = res < num ? num: res;
    } else {
      m += n;
      m = m.slice(m.indexOf(n)+1);
      num = m.length;
    }
  }
  return res;
};

```

### 1.4. 寻找两个有序数组的中位数

给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。

请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

你可以假设 nums1 和 nums2 不会同时为空。

示例 1:

nums1 = [1, 3]
nums2 = [2]

则中位数是 2.0
示例 2:

nums1 = [1, 2]
nums2 = [3, 4]

则中位数是 (2 + 3)/2 = 2.5

```js
// 自己答案
var findMedianSortedArrays = function (nums1, nums2) {
    let arr = nums1.concat(nums2)
    if (!arr || !arr.length) {
        return 0;
    }
    arr.sort(function (a, b) { return a - b; });
    let l = arr.length - 1;
    let n = Math.floor(l / 2);
    let mid = (arr[n] + arr[l - n]) / 2;
    return mid;
};
```

```js
// 双指针排序法，时间复杂度为O(m + n)。
var findMedianSortedArrays = function(nums1, nums2) {
    let reIndex = nums2.length - 1;
    for (let i = nums1.length - 1; i >= 0; i--) {
        while (nums1[i] <= nums2[reIndex] && reIndex > -1) {
            nums1.splice(i + 1, 0, ...(nums2.splice(reIndex, 1)));
            reIndex--;
        }
    }
    const arr = nums2.concat(nums1);
    const { length } = arr;
    return length % 2 ? arr[Math.floor(length / 2)] : (arr[length / 2] + arr[length / 2 - 1]) / 2;
};
```

```js
// 二分查找法（官方推荐），时间复杂度O(log(min(m, n)))。

var findMedianSortedArrays = function (nums1, nums2) {
    if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];

    const length1 = nums1.length;
    const length2 = nums2.length;
    let min = 0;
    let max = length1;
    let half = Math.floor((length1 + length2 + 1) / 2);
    while (max >= min) {
        const i = Math.floor((max + min) / 2);
        const j = half - i;
        if (i > min && nums1[i - 1] > nums2[j]) {
            max = i - 1;
        } else if (i < max && nums1[i] < nums2[j - 1]) {
            min = i + 1;
        } else {
            let left, right;
            if (i === 0) left = nums2[j - 1];
            else if (j === 0) left = nums1[i - 1];
            else left = Math.max(nums1[i - 1], nums2[j - 1]);

            if (i === length1) right = nums2[j];
            else if (j === length2) right = nums1[i];
            else right = Math.min(nums1[i], nums2[j]);
            return (length1 + length2) % 2 ? left : (left + right) / 2;
        }
    }
    return 0;
}
```

### 1.5. 最长回文子串
给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：

输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。

示例 2：

输入: "cbbd"
输出: "bb"


- 暴力法 提交时直接超出时间限制
```js
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
```

- 中心扩散法

```js
var longestPalindrome = function(s) {
    if (!s || !s.trim()) return '';
    if (s.length === 1) return s;
    if (s.length === 2) return s[0] === s[1] ? s[0] + s[1] : s[1];
    let result = '';
    /**
    *扩散坐标
    */
    var calPalindromeIndex = function(left,right,s){
        let len = s.length;
        while(left>=0&&right<len&&s[left] == s[right]){
            left--;
            right++;
        }
        return {left:left+1,right:right}
    }
    for(let i = 0,len = s.length;i<len;i++){
        let even = '';
        let odd = '';
        if(s[i] == s[i+1]){
            //经过当前位与下一位判断已构成回文，扩散位直接从下一位开始，可以提速
            let evenIndex = calPalindromeIndex(i-1,i+2,s);
            even = s.slice(evenIndex.left,evenIndex.right);
        }
        let oddIndex = calPalindromeIndex(i-1,i+1,s);
        odd = s.slice(oddIndex.left,oddIndex.right);
        let re = odd.length>even.length?odd:even;
        result = result.length>re.length?result:re;
    }
    return result;
};

```

- 动态规划

```js
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
```

### 1.6. Z字形变换

将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：

L   C   I   R
E T O E S I I G
E   D   H   N
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："LCIRETOESIIGEDHN"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);
示例 1:

输入: s = "LEETCODEISHIRING", numRows = 3
输出: "LCIRETOESIIGEDHN"
示例 2:

输入: s = "LEETCODEISHIRING", numRows = 4
输出: "LDREOEIIECIHNTSG"
解释:

L     D     R
E   O E   I I
E C   I H   N
T     S     G

```js
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    let arr = [], count = 0, add = true;
    if (numRows === 1) {
        return s;
    }
    for (let i = 0; i < s.length; i++) {
        arr[count] = arr[count] ? arr[count] + s[i] : s[i];
        if (count === 0) {
            add = true;
        } else if (count === numRows - 1) {
            add = false;
        }
        count = add ? count + 1 : count - 1;
    }
    return arr.join('');
};
```
### 1.7. 整数反转

给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

示例 1:

输入: 123
输出: 321
 示例 2:

输入: -123
输出: -321
示例 3:

输入: 120
输出: 21

```js
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
```


### 1.8. 字符串转换整数 (atoi)

请你来实现一个 atoi 函数，使其能将字符串转换成整数。
说明：

假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。

示例 1:

输入: "42"
输出: 42
示例 2:

输入: "   -42"
输出: -42
解释: 第一个非空白字符为 '-', 它是一个负号。
     我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
示例 3:

输入: "4193 with words"
输出: 4193
解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
示例 4:

输入: "words and 987"
输出: 0
解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
     因此无法执行有效的转换。
示例 5:

输入: "-91283472332"
输出: -2147483648
解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 
     因此返回 INT_MIN (−231) 。

```js
var myAtoi = function(str) {
     let reg = /^[+|-]?\d+/;
     str = str.trim();
     if(!reg.test(str)) {
          return 0
     };
     let val = parseInt(str.match(reg)[0]);
     let base = Math.pow(2,31)
     let min = -base;
     let max = base-1;
     return Math.max(Math.min(val, max), min)
 };
```

### 1.9. 回文数

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:

输入: 121
输出: true
示例 2:

输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
示例 3:

输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。

```js
var isPalindrome = function(x) {
    let str = x.toString();
    let reverseStr = str.split('').reverse().join('') ;
    return reverseStr=== str;
};
```

### 1.10. 正则表达式匹配

给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

说明:

s 可能为空，且只包含从 a-z 的小写字母。
p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
示例 1:

输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
示例 2:

输入:
s = "aa"
p = "a*"
输出: true
解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
示例 3:

输入:
s = "ab"
p = ".*"
输出: true
解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
示例 4:

输入:
s = "aab"
p = "c*a*b"
输出: true
解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
示例 5:

输入:
s = "mississippi"
p = "mis*is*p*."
输出: false

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    if (s === null || p === null) {
        return false;
    }
    let m = s.length + 1, n = p.length + 1;
    let dp = new Array(m);
    for (let i = 0; i < m; i++) {
        dp[i] = new Array(n)
        for (let j = 0; j < n; j++) {
            dp[i][j] = false;
        }
    }
    dp[0][0] = true;
    for (let j = 2; j < n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }
    let curS = 0, curP = 0,preCurP = 0;
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            curS = s[i - 1];
            curP = p[j - 1];
            preCurP = p[j - 2];
            if (curP === '.' || curS === curP) {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (curP === '*') {
                if (preCurP !== '.' && preCurP !== curS) {
                    dp[i][j] = dp[i][j - 2]
                }
                else {
                    dp[i][j] = dp[i - 1][j - 2] || dp[i - 1][j] || dp[i][j - 2]
                }
            }
        }
    }
    return dp[m - 1][n - 1];
}
```


### 1.11. 盛最多水的容器

给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。

![盛最多水的容器](/images/question_11.jpg)

示例:

输入: [1,8,6,2,5,4,8,3,7]
输出: 49


```js
// 第一直觉的解法，暴力遍历，还是缺乏算法思维啊😢😢😢😢


/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let res = 0;
    for (let i = 0; i < height.length - 1; i++) {
        for (let j = i + 1; j < height.length; j++) {
            let temp = (j - i) * Math.min(height[i], height[j]);
            res = Math.max(temp, res);
        }
    }
    return res;
};
```

其他解法，双指针法

```js
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
```

### 1.12. 整数转罗马数字

罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。

字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。

示例 1:

输入: 3
输出: "III"
示例 2:

输入: 4
输出: "IV"
示例 3:

输入: 9
输出: "IX"
示例 4:

输入: 58
输出: "LVIII"
解释: L = 50, V = 5, III = 3.
示例 5:

输入: 1994
输出: "MCMXCIV"
解释: M = 1000, CM = 900, XC = 90, IV = 4.

```js
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
    let Q = ["", "M", "MM", "MMM"];
    let B = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    let S = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    let G = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    return Q[Math.floor(num / 1000)] + B[Math.floor((num % 1000) / 100)] + S[Math.floor((num % 100) / 10)] + G[num % 10];
};

```

其他题解 贪心算法

```js
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    var romanArr = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
    var arr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    var str = ''

    for (var i = 0; i < 13;) {
        if (num >= arr[i]) {
            num -= arr[i]
            str += romanArr[i]
        } else {
            i++
        }
    }
    return str
};
```

### 1.13. 罗马数字转整数

罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。

字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。

示例 1:

输入: "III"
输出: 3

```js
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    const map = {
        I: 1,
        IV: 4,
        V: 5,
        IX: 9,
        X: 10,
        XL: 40,
        L: 50,
        XC: 90,
        C: 100,
        CD: 400,
        D: 500,
        CM: 900,
        M: 1000
    };
    let ans = 0;
    for (let i = 0; i < s.length;) {
        const doubleRoman = map[s.substring(i, i + 2)];
        const singleRoman = map[s.substring(i, i + 1)];
        if (i + 1 < s.length && doubleRoman) {
            ans += doubleRoman;
            i += 2;
        } else {
            ans += singleRoman;
            i++;
        }
    }
    return ans;
};
```


### 1.14. 最长公共前缀

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1:

输入: ["flower","flow","flight"]
输出: "fl"
示例 2:

输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
说明:

所有输入只包含小写字母 a-z 。

1. 题解1

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    let result = '';
    if (!strs.length) return result;
    for (let j = 0; let < strs[0].length; j++) {
        for (let i = 1; i < strs.length; i++) {
            if (strs[i][j] != strs[0][j]) {
                return result;
            }
        }
        result += strs[0][j];
    }
    return result;
};
```

2. 题解2:递归解法

```js
var longestCommonPrefix = function (strs,re = '') {
    if (!strs.length) return re;
    if (strs.length == 1) return strs[0];
    for (var i = 1; i < strs.length; i++) {
        if (!strs[i][0]) return re
        if (strs[i][0] != strs[0][0]) return re
        strs[i] = strs[i].slice(1,strs[i].length);
    }
    re += strs[0][0];
    strs[0] = strs[0].slice(1,strs[0].length);
    return longestCommonPrefix(strs, re);
};

```
3. 题解3,和解一恰好相反，re初始化为数组中第一个元素，逐个比较，当比较通过时返回re，否则削去末位直至比较通过。这里的比较使用了正则表达式。

```js
var longestCommonPrefix = function(strs) {
    var re = strs[0] ? strs[0]:'';
    for (var i=1;i<strs.length;i++){
        var regex = new RegExp('^'+re);
        while (!regex.test(strs[i])&&re.length){
            re = re.slice(0,re.length-1);
            regex = new RegExp('^'+re);
        }
    }
    return re;
};

```
4. 官方题解1

- 时间复杂度：O(S)O(S)，S 是所有字符串中字符数量的总和。

- 空间复杂度：O(1)O(1)，我们只需要使用常数级别的额外空间。


```js
var longestCommonPrefix = function (strs) {
    if (strs.length == 0) return "";
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++)
        while (strs[i].indexOf(prefix) != 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (!prefix) return "";
        }
    return prefix;
}
```