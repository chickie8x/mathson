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

export const classSelect = [
  {
    id: 1,
    text: 'Lớp 1',
    value: '1stClass'
  },
  {
    id: 2,
    text: 'Lớp 2',
    value: '2ndClass'
  },
  {
    id: 3,
    text: 'Lớp 3',
    value: '3rdClass'
  }
]

export const difficultyLevel = [
  {
    id: 1,
    text: 'Dễ',
    value: 'easy'
  },

  {
    id: 2,
    text: 'Bình thường',
    value: 'medium'
  },

  {
    id: 3,
    text: 'Khó',
    value: 'hard'
  }
]

export const exerciseType = {
  sum: {
    value: 'sumNums',
    title: 'Tính tổng',
    sub: 'Điền số thích hợp vào dấu ba chấm để hoàn thành các phép tính sau',
    desc: ['1 + 2 = ....', '... + 4 = 7', '3 + ... = 4']
  },

  compareNum: {
    value: 'compareNums',
    title: 'So sánh ',
    sub: 'Điền dấu >  =  < vào ô trống',
    desc: ['1 ... 2  ==>  1 < 2', '7 ... 4  ==>  7 > 4', '3 ... 3  ==>  3 = 3']
  }
}
