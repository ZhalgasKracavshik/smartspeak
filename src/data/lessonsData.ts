// Lessons database for progression system - 200 levels with unique questions per user

export interface Lesson {
  id: number;
  title: string;
  description: string;
  level: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  topic: string;
  xpReward: number;
  questions: LessonQuestion[];
}

export interface LessonQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Question banks by topic
const questionBanks = {
  'Present Simple': [
    { q: "She ___ to school every day.", opts: ["go", "goes", "going", "gone"], correct: 1, exp: "Use 'goes' for 3rd person singular." },
    { q: "They ___ football on Sundays.", opts: ["play", "plays", "playing", "played"], correct: 0, exp: "Use base form for plural subjects." },
    { q: "I ___ coffee in the morning.", opts: ["drink", "drinks", "drinking", "drank"], correct: 0, exp: "Use base form for 'I'." },
    { q: "He ___ his homework daily.", opts: ["do", "does", "doing", "did"], correct: 1, exp: "Use 'does' for 3rd person singular." },
    { q: "We ___ English at school.", opts: ["study", "studies", "studying", "studied"], correct: 0, exp: "Use base form for 'we'." },
    { q: "The sun ___ in the east.", opts: ["rise", "rises", "rising", "rose"], correct: 1, exp: "Facts use Present Simple with 's' for 3rd person." },
    { q: "My parents ___ in London.", opts: ["live", "lives", "living", "lived"], correct: 0, exp: "Plural subject uses base form." },
    { q: "She ___ her teeth twice a day.", opts: ["brush", "brushes", "brushing", "brushed"], correct: 1, exp: "Regular action, 3rd person singular." },
    { q: "I ___ music every day.", opts: ["listen to", "listens to", "listening to", "listened to"], correct: 0, exp: "First person uses base form." },
    { q: "He ___ very fast.", opts: ["run", "runs", "running", "ran"], correct: 1, exp: "3rd person singular needs 's'." },
  ],
  'Present Continuous': [
    { q: "I ___ TV right now.", opts: ["watch", "am watching", "watches", "watched"], correct: 1, exp: "Use 'am/is/are + -ing' for actions happening now." },
    { q: "She ___ a book.", opts: ["read", "reads", "is reading", "reading"], correct: 2, exp: "Use 'is reading' for 3rd person singular." },
    { q: "They ___ football.", opts: ["play", "are playing", "plays", "played"], correct: 1, exp: "Use 'are playing' for plural subjects." },
    { q: "We ___ dinner now.", opts: ["cook", "are cooking", "cooks", "cooked"], correct: 1, exp: "Current action requires Present Continuous." },
    { q: "He ___ to music.", opts: ["listen", "listens", "is listening", "listened"], correct: 2, exp: "Use 'is listening' for current action." },
    { q: "I ___ my homework at the moment.", opts: ["do", "am doing", "does", "did"], correct: 1, exp: "At the moment signals Present Continuous." },
    { q: "The children ___ in the garden.", opts: ["play", "plays", "are playing", "played"], correct: 2, exp: "Current activity uses am/is/are + -ing." },
    { q: "She ___ on the phone.", opts: ["talk", "talks", "is talking", "talked"], correct: 2, exp: "Ongoing action right now." },
    { q: "We ___ for the bus.", opts: ["wait", "waits", "are waiting", "waited"], correct: 2, exp: "Waiting now = Present Continuous." },
    { q: "You ___ too fast!", opts: ["drive", "drives", "are driving", "drove"], correct: 2, exp: "Action happening now." },
  ],
  'Past Simple': [
    { q: "I ___ to the cinema yesterday.", opts: ["go", "goes", "went", "gone"], correct: 2, exp: "'went' is the past form of 'go'." },
    { q: "She ___ a beautiful dress.", opts: ["buy", "buys", "bought", "buying"], correct: 2, exp: "'bought' is the past form of 'buy'." },
    { q: "They ___ football last week.", opts: ["play", "plays", "played", "playing"], correct: 2, exp: "Regular verb: play + ed = played." },
    { q: "We ___ our homework yesterday.", opts: ["do", "does", "did", "done"], correct: 2, exp: "'did' is the past form of 'do'." },
    { q: "He ___ his keys.", opts: ["lose", "loses", "lost", "losing"], correct: 2, exp: "'lost' is the irregular past form." },
    { q: "I ___ breakfast at 8 AM.", opts: ["have", "has", "had", "having"], correct: 2, exp: "Past time marker requires Past Simple." },
    { q: "She ___ to Paris last year.", opts: ["travel", "travels", "travelled", "travelling"], correct: 2, exp: "Last year = Past Simple." },
    { q: "They ___ the movie.", opts: ["enjoy", "enjoys", "enjoyed", "enjoying"], correct: 2, exp: "Regular past: enjoy + ed." },
    { q: "We ___ late yesterday.", opts: ["arrive", "arrives", "arrived", "arriving"], correct: 2, exp: "Yesterday = Past Simple." },
    { q: "He ___ me a gift.", opts: ["give", "gives", "gave", "giving"], correct: 2, exp: "'gave' is irregular past." },
  ],
};

// Shuffle array utility
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Generate unique question set for a user
const generateUniqueQuestions = (topic: string, count: number, userSeed: string): LessonQuestion[] => {
  const bank = questionBanks[topic as keyof typeof questionBanks];
  if (!bank) {
    // Fallback for topics without question banks
    return Array.from({ length: count }, (_, i) => ({
      question: `${topic} - Question ${i + 1}: Choose the correct answer.`,
      options: shuffleArray(["Option A", "Option B", "Option C", "Option D"]),
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: `This tests your knowledge of ${topic}.`
    }));
  }

  // Create deterministic randomness based on user seed + topic
  const hash = (userSeed + topic).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Select unique questions based on user seed
  const selectedIndices = new Set<number>();
  let seed = hash;
  
  while (selectedIndices.size < Math.min(count, bank.length)) {
    const index = Math.floor(seededRandom(seed++) * bank.length);
    selectedIndices.add(index);
  }

  return Array.from(selectedIndices).map(index => {
    const q = bank[index];
    // Shuffle options uniquely for this user
    const optionIndices = [0, 1, 2, 3];
    const shuffled = shuffleArray(optionIndices);
    const newCorrect = shuffled.indexOf(q.correct);
    
    return {
      question: q.q,
      options: shuffled.map(i => q.opts[i]),
      correctAnswer: newCorrect,
      explanation: q.exp
    };
  });
};

// Generate 200 lessons
export const generateLessons = (userSeed?: string): Lesson[] => {
  const lessons: Lesson[] = [];
  const seed = userSeed || localStorage.getItem('user-seed') || Math.random().toString(36);
  
  // Save user seed if not exists
  if (!localStorage.getItem('user-seed')) {
    localStorage.setItem('user-seed', seed);
  }

  const topics = [
    'Present Simple', 'Present Continuous', 'Past Simple', 'Past Continuous',
    'Present Perfect', 'Past Perfect', 'Future Simple', 'Future Continuous',
    'Conditionals', 'Vocabulary', 'Phrasal Verbs', 'Irregular Verbs',
    'Articles', 'Prepositions', 'Modal Verbs', 'Passive Voice'
  ];
  
  const difficulties: ('easy' | 'medium' | 'hard' | 'extreme')[] = ['easy', 'medium', 'hard', 'extreme'];
  
  for (let i = 1; i <= 200; i++) {
    const topicIndex = (i - 1) % topics.length;
    const difficultyIndex = Math.floor((i - 1) / 50) % 4;
    const difficulty = difficulties[difficultyIndex];
    
    let questionCount = 5;
    let xpReward = 10;
    
    if (difficulty === 'medium') {
      questionCount = 7;
      xpReward = 20;
    } else if (difficulty === 'hard') {
      questionCount = 10;
      xpReward = 30;
    } else if (difficulty === 'extreme') {
      questionCount = 12;
      xpReward = 50;
    }
    
    lessons.push({
      id: i,
      title: `${topics[topicIndex]} - Уровень ${i}`,
      description: `Освойте ${topics[topicIndex]} на уровне ${i}`,
      level: i,
      difficulty,
      topic: topics[topicIndex],
      xpReward,
      questions: generateUniqueQuestions(topics[topicIndex], questionCount, seed + i)
    });
  }
  
  return lessons;
};

export const getLessonById = (id: number, userSeed?: string): Lesson | undefined => {
  const lessons = generateLessons(userSeed);
  return lessons.find(l => l.id === id);
};

export const getLessonsByDifficulty = (difficulty: string, userSeed?: string): Lesson[] => {
  const lessons = generateLessons(userSeed);
  return lessons.filter(l => l.difficulty === difficulty);
};

export const getNextLesson = (currentLevel: number, userSeed?: string): Lesson | undefined => {
  const lessons = generateLessons(userSeed);
  return lessons[currentLevel] || lessons[0];
};

// Get user's unique seed
export const getUserSeed = (): string => {
  let seed = localStorage.getItem('user-seed');
  if (!seed) {
    seed = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('user-seed', seed);
  }
  return seed;
};
