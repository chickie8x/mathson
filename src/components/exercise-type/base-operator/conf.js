export const conf = [
  {
    text: 'Dễ',
    val: 2,
    range: [0, 9]
  },

  {
    text: 'Trung bình',
    val: 3,
    range: [5, 15]
  },

  {
    text: 'Khó',
    val: 4,
    range: [10, 20]
  }
]

export const operators = {
  sum: {
    id: 'opSum',
    text: 'Phép cộng',
    mark: '+',
    func: (arr) => {
      return arr.reduce((prevValue, currValue) => prevValue + currValue, 0)
    }
  },

  sub: {
    id: 'opSub',
    text: 'Phép trừ',
    mark: '-',
    func: (a, b) => {
      return a - b
    }
  },

  multiply: {
    id: 'opMul',
    text: 'Phép nhân',
    mark: 'x',
    func: (arr) => {
      return arr.reduce((prevValue, currValue) => currValue * prevValue, 1)
    }
  },

  divide: {
    id: 'opDev',
    text: 'Phép chia',
    mark: ':',
    func: (arr) => {
      return arr.reduce((prevValue, currValue) => prevValue / currValue)
    }
  }
}

export const opSum = (numOfElement) => {
  let ret = {}
  let nums = []
  let exp = ''
  for (let i = 0; i < numOfElement; i++) {
    let num = Math.floor(Math.random() * 10)
    nums.push(num)
  }
  for (let i = 0; i < nums.length; i++) {
    if (i != nums.length - 1) {
      exp += nums[i] + ' + '
    } else {
      exp += nums[i] + ' = ...'
    }
  }
  ret.strShow = exp
  ret.result = nums.reduce((prevValue, currValue) => prevValue + currValue, 0)
  return ret
}

export const sortNums = (arr) => {
  return arr.sort((a, b) => a - b)
}

export const sortNumsReversed = (arr) => {
  return arr.sort((a, b) => a - b)
}
