// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。



// 示例:

// 输入："23"
// 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
// 说明:
// 尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。


// /**
//  * @param {string} digits
//  * @return {string[]}
//  */
// var letterCombinations = function(digits) {
//     const phonenumMap = {
//         '2':['a','b','c'],
//         '3':['d','e','f'],
//         '4':['g','h','i'],
//         '5':['j','k','l'],
//         '6':['m','n','o'],
//         '7':['p','q','r','s'],
//         '8':['t','u','v'],
//         '9':['w','x','y','z']
//     }
//     if(digits.length === 0) {
//         return []
//     };
//     if(digits.length === 1) {
//         return phonenumMap[digits]
//     }

//     let lettersArr = [];
//     for(let item of digits){
//         lettersArr.push(phonenumMap[item])
//     }
    
//     let res = lettersArr.reduce((pre,cur)=>{
//         let temp = [];
//         pre.map(item=>cur.map(itemj=>temp.push(item+itemj)))
//         return temp;
//     })
//     return res;
// };

/**
 * @param {string} digits
 * @return {string[]}
  */
var letterCombinations = function(digits) {
    if (digits.length === 0) {
        return []
     }
    // 号码盘字典 数组下标对应号码
    let dict = [[],[],['a','b','c'],['d','e','f'],['g','h','i'],['j','k','l'],['m','n','o'],['p','q','r','s'],['t','u','v'],['w','x','y','z']]
    // 初始化结果
    let result = dict[digits[0]]
    // 求两个数组的笛卡尔积组合
    let helper = function (arr1, arr2) {
      let result = []
      for (let i=0; i<arr1.length; i++) {
        for (let j=0; j<arr2.length; j++) {
          result.push(arr1[i] + arr2[j])
        }
      }
      return result
    }
    // 因为用第一个数字初始化 从第二个数字循环到最后
    for (let i=1; i<digits.length; i++) {
      result = helper(result, dict[digits[i]])
    }
    
    return result
  };
  