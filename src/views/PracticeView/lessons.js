import mathAnimation from '@/assets/lottiefiles/math.json'
import flashcardAnimation from '@/assets/lottiefiles/fruits.json'

export const lessonType = [
  {
    id: 0,
    pathName: 'baseop',
    animation: mathAnimation,
    sectionTitle: 'Phép toán cơ sở',
    tag: 'active',
    difficulty: true
  },

  {
    id: 1,
    pathName: 'flashcard',
    animation: flashcardAnimation,
    sectionTitle: 'Flashcard',
    tag: 'active',
    difficulty: true
  }
]
