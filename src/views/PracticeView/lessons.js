import baseop from '@/assets/lottiefiles/baseop.json'
import flashcardAnimation from '@/assets/lottiefiles/fruits.json'
import comingSoon from '@/assets/lottiefiles/coming-soon.json'

export const lessonType = [
  {
    id: 0,
    pathName: 'baseop',
    animation: baseop,
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
  },

  {
    id: 2,
    pathName: 'logic',
    animation: comingSoon,
    sectionTitle: 'Logic',
    tag: 'coming soon',
    difficulty: false
  }
]
