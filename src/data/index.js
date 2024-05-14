export const numSet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const opSum = (arr, op) => {
  let ret = {}
  let exp = ''

  for (let i = 0; i < arr.length; i++) {
    if (i != arr.length - 1) {
      if (op === 'sum') {
        exp += arr[i] + ' + '
      } else {
        exp += arr[i] + ' - '
      }
    } else {
      exp += arr[i] + ' = '
    }
  }
  ret.strShow = exp
  if (op === 'sum') {
    ret.result = arr.reduce((prevValue, currValue) => prevValue + currValue, 0)
  } else {
    ret.result = arr.reduce((prevValue, currValue) => prevValue - currValue)
  }
  return ret
}

export const sortNums = (arr) => {
  return arr.sort((a, b) => a - b)
}

export const sortNumsReversed = (arr) => {
  return arr.sort((a, b) => b - a)
}

export const generateNums = (arr, k) => {
  const result = []

  function generatePermutations(currentPermutation, remainingElements) {
    if (currentPermutation.length === k) {
      result.push(currentPermutation.slice())
      return
    }

    for (let i = 0; i < remainingElements.length; i++) {
      const updatedPermutation = currentPermutation.concat(remainingElements[i])
      const remainingElementsCopy = remainingElements
        .slice(0, i)
        .concat(remainingElements.slice(i + 1))
      generatePermutations(updatedPermutation, remainingElementsCopy)
    }
  }

  generatePermutations([], arr)
  return result
}

export const opCompare = (numsArr, elemArr) => {
  let arr = []
  while (arr.length < numsArr) {
    let subArr = []
    while (subArr.length < elemArr) {
      let num = Math.floor(Math.random() * 10)
      if (!subArr.includes(num)) {
        subArr.push(num)
      }
    }
    arr.push(subArr)
  }

  return arr
}

export const toMinnute = (countdown) => {
  return Math.floor(countdown / 60) >= 10
    ? Math.floor(countdown / 60)
    : `0${Math.floor(countdown / 60)}`
}

export const toSeconds = (countdown) => {
  return countdown % 60 >= 10 ? countdown % 60 : `0${countdown % 60}`
}

export const genCompareSet = (item) => {
  let ret = []
  if (item.length > 2) {
    let randomPair = Math.floor(Math.random() * 10)
    if (randomPair % 2 === 0) {
      ret.push(item.slice(0, Math.floor(item.length / 2)))
      ret.push(item.slice(Math.floor(item.length / 2), item.length))
    } else {
      ret.push(item.slice(0, Math.floor(item.length / 2) + 1))
      ret.push(item.slice(Math.floor(item.length / 2) + 1, item.length))
    }
  } else {
    ret.push(item.slice(0, Math.floor(item.length / 2)))
    ret.push(item.slice(Math.floor(item.length / 2), item.length))
  }

  return ret
}

export const compareExp = (arr) => {
  let ret = {}
  let exp1 = ''
  let exp2 = ''
  arr[0].map((item, idx) => {
    if (idx < arr[0].length - 1) {
      exp1 += `${item} + `
    } else {
      exp1 += `${item}`
    }
  })

  arr[1].map((item, idx) => {
    if (idx < arr[1].length - 1) {
      exp2 += `${item}+`
    } else {
      exp2 += `${item}`
    }
  })

  if (
    arr[0].reduce((prev, curr) => prev + curr, 0) > arr[1].reduce((prev, curr) => prev + curr, 0)
  ) {
    ret.result = '>'
  } else if (
    arr[0].reduce((prev, curr) => prev + curr, 0) < arr[1].reduce((prev, curr) => prev + curr, 0)
  ) {
    ret.result = '<'
  } else {
    ret.result = '='
  }

  ret.strExp = [exp1, exp2]

  return ret
}

export const language = [
  {
    id: 1,
    text: 'Tiếng Việt',
    icon: '/icons/VN.svg',
    value: 'vie'
  },

  {
    id: 2,
    text: 'English',
    icon: '/icons/UK.webp',
    value: 'eng'
  }
]

export const mathConfig = [
  {
    id: 0,
    text: 'Dễ',
    value: 'easy',
    config: {
      numsOfElement: 2,
      baseOperators: {
        calculateRange: 5
      },
      sortOperators: {
        sortLength: 3
      }
    }
  },

  {
    id: 1,
    text: 'Trung bình',
    value: 'medium',
    config: {
      numsOfElement: 3,
      baseOperators: {
        calculateRange: 10
      },
      sortOperators: {
        sortLength: 4
      }
    }
  },

  {
    id: 2,
    text: 'Khó',
    value: 'hard',
    config: {
      numsOfElement: 4,
      baseOperators: {
        calculateRange: 10
      },
      sortOperators: {
        sortLength: 5
      }
    }
  }
]

export const flashcardConfig = [
  {
    text: 'Trái cây',
    value: 'fruits'
  },

  {
    text: 'Động vật',
    value: 'animals'
  }
]

export const generateMatrix = (targetNum) => {
  let ret = []
  let arr = [[], [], []]
  const arrSize = 3
  //create first row of matrix
  while (arr[0].reduce((s, val) => s + val, 0) !== targetNum) {
    for (let i = 0; i < arrSize; i++) {
      arr[0][i] = Math.floor(Math.random() * 10)
    }
  }

  //create first colum of matrix
  while ([arr[0][0], arr[1][0], arr[2][0]].reduce((s, val) => s + val, 0) !== targetNum) {
    for (let i = 1; i < arrSize; i++) {
      arr[i][0] = Math.floor(Math.random() * 10)
    }
  }

  for (let i = 0; i <= targetNum - arr[0][1]; i++) {
    let z = [[...arr[0]], [...arr[1]], [...arr[2]]]
    z[1][1] = i
    z[1][2] = targetNum - i - z[1][0]
    z[2][1] = targetNum - i - z[0][1]
    z[2][2] = targetNum - z[2][0] - z[2][1]
    if (z[1][1] >= 0 && z[1][2] >= 0 && z[2][1] >= 0 && z[2][2] >= 0) {
      ret.push(z)
    }
  }

  return ret
}

export const checkExistArr = (arr2D, arr) => {
  if (arr2D.length === 0) {
    return false
  } else {
    for (let i = 0; i < arr2D.length; i++) {
      if (arr2D[i].toString() === arr.toString()) {
        return true
      }
    }
  }
  return false
}

export const tenSumOpGen = (n, conf) => {
  let ret = []
  if (conf === 'easy') {
    while (ret.length <= n) {
      let num1 = Math.floor(Math.random() * 10)
      let num2 = Math.floor(Math.random() * 10)
      if (num1 + num2 >= 10 && !checkExistArr(ret, [num1, num2])) {
        ret.push([num1, num2])
      }
    }
  } else if (conf === 'medium') {
    while (ret.length <= n) {
      let num1 = Math.floor(Math.random() * 99)
      let num2 = Math.floor(Math.random() * 99)
      if (
        num1 + num2 < 100 &&
        !checkExistArr(ret, [num1, num2]) &&
        (num1 % 10) + (num2 % 10) < 10 &&
        Math.floor(num1 / 10) + Math.floor(num2 / 10) < 10
      ) {
        ret.push([num1, num2])
      }
    }
  } else {
    while (ret.length <= n) {
      let num1 = Math.floor(Math.random() * 99)
      let num2 = Math.floor(Math.random() * 99)
      if (
        num1 + num2 < 100 &&
        !checkExistArr(ret, [num1, num2]) &&
        Math.floor(num1 / 10) + Math.floor(num2 / 10) < 10
      ) {
        ret.push([num1, num2])
      }
    }
  }

  return ret
}

export const tenSubOpGen = (n, conf) => {
  let ret = []
  if (conf === 'easy') {
    while (ret.length <= n) {
      let num1 = Math.floor(Math.random() * 20)
      let num2 = Math.floor(Math.random() * 20)
      if (num1 > 10 && num1 - num2 >= 0 && !checkExistArr(ret, [num1, num2])) {
        ret.push([num1, num2])
      }
    }
  } else if (conf === 'medium') {
    while (ret.length <= n) {
      let num1 = Math.floor(Math.random() * 99)
      let num2 = Math.floor(Math.random() * 99)
      if (num1 - num2 > 0 && !checkExistArr(ret, [num1, num2]) && (num1 % 10) - (num2 % 10) > 0) {
        ret.push([num1, num2])
      }
    }
  } else {
    while (ret.length <= n) {
      let num1 = Math.floor(Math.random() * 99)
      let num2 = Math.floor(Math.random() * 99)
      if (num1 - num2 > 10 && !checkExistArr(ret, [num1, num2])) {
        ret.push([num1, num2])
      }
    }
  }

  return ret
}
