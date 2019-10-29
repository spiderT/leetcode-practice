// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

// 示例：
// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]
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



// 其他题解1
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

// 其他题解2
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
