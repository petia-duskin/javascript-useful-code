const isAnagrams = (str1, str2) => {
    const map = {}

    if (str1.length !== str2.length) {
        return false;
    }

    for (let ch of str1) {
        map[ch] = map[ch] + 1 || 1
    }

    for (let ch of str2) {
        if (map[ch] === 0 || map[ch] == null) return false;

        map[ch] = map[ch] - 1;
    }

    return true;
}

const groupAnagrams = strings => {
    return strings.reduce((acc, cur) => {
        const sortedStr = cur.split('').sort().join('');
        if (acc[sortedStr] == null) acc[sortedStr] = []
        acc[sortedStr].push(cur);

        return acc;
    }, {})
}

const removeAnagrams = strings => {
    const set = new Set();

    return strings.filter(str => {
        const sortedStr = str.split('').sort().join('');
        if (set.has(sortedStr)) return false;
        set.add(sortedStr);
        return true;
    })
}

const twoSum = (nums, target) => {
    const map = {}
    const result = []

    nums.forEach((num, index) => {
        const diff = target - num;
        if (map[diff] != null) {
            result.push([map[diff], index])
            return;
        }

        map[num] = index;
    })

    return result;
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
console.log(removeAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
console.log(twoSum([1, 2, 3, 4, 5, 6], 5))