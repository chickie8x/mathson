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
        text: '+',
        func: (arr) => {
            return arr.reduce((prevValue, currValue) => prevValue + currValue,0)
        }
    }
}
