import { Question } from '@/types/quiz';

export const quizQuestions: Question[] = [
  {
    id: 1,
    category: 'reading',
    text: "Read this sentence: 'The smart robot can scan books, help people find books, and read stories to children.' How many different things can this robot do?",
    options: {
      a: '1 thing',
      b: '2 things', 
      c: '3 things',
      d: '4 things'
    },
    correctAnswer: 'c'
  },
  {
    id: 2,
    category: 'reading',
    text: "If someone asked you to 'Save your work, close the program, then turn off the computer' - what should you do FIRST?",
    options: {
      a: 'Turn off the computer',
      b: 'Close the program',
      c: 'Save your work',
      d: 'Do nothing'
    },
    correctAnswer: 'c'
  },
  {
    id: 3,
    category: 'computing',
    text: "What's the BEST way to save a school project on a computer?",
    options: {
      a: 'Save it in the trash folder',
      b: 'Save it in a clearly named folder like "School Projects"',
      c: 'Save it anywhere without naming it',
      d: "Don't save it at all"
    },
    correctAnswer: 'b'
  },
  {
    id: 4,
    category: 'computing',
    text: "What does it mean when a computer 'crashes' or 'freezes'?",
    options: {
      a: 'It falls down and breaks',
      b: 'It gets very cold',
      c: "It stops working properly and won't respond",
      d: 'It starts making loud noises'
    },
    correctAnswer: 'c'
  },
  {
    id: 5,
    category: 'computing',
    text: 'Your tablet is running very slowly. What should you try FIRST?',
    options: {
      a: 'Buy a new tablet',
      b: "Close apps you're not using",
      c: 'Hit it gently',
      d: 'Use it anyway and ignore the problem'
    },
    correctAnswer: 'b'
  },
  {
    id: 6,
    category: 'curiosity',
    text: "When you see something cool on a computer or phone that you don't understand, what do you usually do?",
    options: {
      a: 'Ignore it completely',
      b: 'Ask someone or try to learn about it',
      c: 'Get frustrated and give up',
      d: 'Pretend I understand it'
    },
    correctAnswer: 'b'
  },
  {
    id: 7,
    category: 'curiosity',
    text: 'Which of these sounds most exciting to you?',
    options: {
      a: 'Learning how apps are made',
      b: 'Just using apps without thinking about them',
      c: 'Avoiding technology completely',
      d: 'Only playing games'
    },
    correctAnswer: 'a'
  },
  {
    id: 8,
    category: 'curiosity',
    text: 'If your favorite app stopped working, what would you want to do?',
    options: {
      a: 'Never use apps again',
      b: 'Find out why it\'s not working and how to fix it',
      c: 'Just use a different app and forget about it',
      d: 'Ask someone else to fix it but not learn how'
    },
    correctAnswer: 'b'
  },
  {
    id: 9,
    category: 'curiosity',
    text: 'When you want to learn something new about computers or technology, what\'s the BEST approach?',
    options: {
      a: 'Give up if it seems hard',
      b: 'Ask good questions and practice',
      c: 'Just guess and hope for the best',
      d: 'Wait for someone to teach you everything'
    },
    correctAnswer: 'b'
  },
  {
    id: 10,
    category: 'curiosity',
    text: 'If you make a mistake while learning something new on a computer, what should you do?',
    options: {
      a: 'Stop trying immediately',
      b: 'Learn from the mistake and try again',
      c: 'Get angry and quit',
      d: 'Blame the computer'
    },
    correctAnswer: 'b'
  }
];

export const getFeedbackMessage = (score: number, totalQuestions: number): string => {
  const percentage = (score / totalQuestions) * 100;
  
  if (percentage >= 70) {
    return "Excellent! You're ready for our coding program!";
  } else if (percentage >= 50) {
    return "Good job! You show great potential for learning coding!";
  } else {
    return "Great effort! Keep exploring technology and come back to try again!";
  }
};

export const getCategoryBreakdown = (answers: Array<{ questionId: number; selectedAnswer: string | null }>) => {
  const categories = {
    reading: { correct: 0, total: 2 },
    computing: { correct: 0, total: 3 },
    curiosity: { correct: 0, total: 5 }
  };

  answers.forEach(answer => {
    const question = quizQuestions.find(q => q.id === answer.questionId);
    if (question && answer.selectedAnswer === question.correctAnswer) {
      categories[question.category].correct++;
    }
  });

  return categories;
};
