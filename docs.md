# Church Kids Coding Aptitude Quiz - Complete Documentation

## 10 Assessment Questions (Multiple Choice)

### Questions

- Reading & Writing Skills (1 & 2)
- Computing Basics (3, 4 & 5)
- Interest & Curiousity (6, 7, 8, 9 & 10)

1. Reading Comprehension "Read this sentence: 'The smart robot can scan books, help people find books, and read stories to children.' How many different things can this robot do?"

    a. 1 thing
    b. 2 things
    c. 3 things ✓
    d. 4 things

2. Following Instructions "If someone asked you to 'Save your work, close the program, then turn off the computer' - what should you do FIRST?"

    a. Turn off the computer
    b. Close the program
    c. Save your work ✓
    d. Do nothing

3. File Organization "What's the BEST way to save a school project on a computer?"

    a. Save it in the trash folder
    b. Save it in a clearly named folder like 'School Projects' ✓
    c. Save it anywhere without naming it
    d. Don't save it at all

4. Basic Computer Knowledge "What does it mean when a computer 'crashes' or 'freezes'?"

    a. It falls down and breaks
    b. It gets very cold
    c. It stops working properly and won't respond ✓
    d. It starts making loud noises

5. Problem Solving with Technology "Your tablet is running very slowly. What should you try FIRST?"

    a. Buy a new tablet
    b. Close apps you're not using ✓
    c. Hit it gently
    d. Use it anyway and ignore the problem
    Interest & Curiosity

6. Learning Motivation "When you see something cool on a computer or phone that you don't understand, what do you usually do?"

    a. Ignore it completely
    b. Ask someone or try to learn about it ✓
    c. Get frustrated and give up
    d. Pretend I understand it

7. Technology Interest "Which of these sounds most exciting to you?"

    a. Learning how apps are made ✓
    b. Just using apps without thinking about them
    c. Avoiding technology completely
    d. Only playing games

8. Problem-Solving Curiosity "If your favorite app stopped working, what would you want to do?"

    a. Never use apps again
    b. Find out why it's not working and how to fix it ✓
    c. Just use a different app and forget about it
    d. Ask someone else to fix it but not learn how

9. Learning Approach "When you want to learn something new about computers or technology, what's the BEST approach?"

    a. Give up if it seems hard
    b. Ask good questions and practice ✓
    c. Just guess and hope for the best
    d. Wait for someone to teach you everything

10. Growth Mindset "If you make a mistake while learning something new on a computer, what should you do?"

    a. Stop trying immediately
    b. Learn from the mistake and try again ✓
    c. Get angry and quit
    d. Blame the computer

### Scoring Guidelines

- 7+ correct answers = Strong candidate
- 5-6 correct answers = Good candidate
- Below 5 = Needs more preparation

## Product Requirements Document (PRD)

Church Kids Coding Aptitude Quiz App

### 1. Project Overview**

Build a web-based quiz application to assess 9-13 year old children for a church coding training program focused on prompt engineering skills.

### 2. Core Requirements**

**Functional Requirements:**

- 10 multiple-choice questions testing reading/writing, computing basics, and curiosity
- User information collection (name, age)
- Automatic scoring and immediate results display
- 15-minute time limit with visual timer
- Data persistence to Google Sheets
- Mobile-responsive design
- Simple, kid-friendly UI

**Technical Requirements:**

- Next.js 14+ (App Router)
- TypeScript for type safety
- Shadcn/ui + Magic UI components
- Google Sheets API integration
- Vercel deployment ready

### 3. User Flow

- Landing page with quiz introduction
- User info collection (name, age)
- Quiz instructions and start button
- 10 questions with progress indicator and timer
- Auto-submit when complete or time expires
- Results page with score and feedback
- Data automatically saved to Google Sheets

### 4. Technical Architecture

**Frontend:**

- Next.js with App Router
- Shadcn/ui for base components
- Magic UI for enhanced animations
- Tailwind CSS for styling
- React Hook Form for form handling
- Zustand for state management

**Backend:**

- Next.js API routes
- Google Sheets API integration
- Input validation and sanitization

**Data Storage:**

- Google Sheets with columns: Timestamp, Name, Age, Q1-Q10 Answers, Score, Duration

### 5. Key Features

**Quiz Interface:**

- Clean, colorful, kid-friendly design
- Large buttons and readable fonts
- Progress bar showing completion
- Countdown timer (15 minutes)
- Auto-save progress
- Confirmation before submission

**Results Display:**

- Immediate score calculation
- Encouraging feedback messages
- Breakdown of correct/incorrect answers
- Motivational messaging regardless of score

**Admin Features:**

- Google Sheets integration for easy data review
- Automatic timestamping
- Export capabilities

## Development Prompt

Create a `Next.js` quiz application for church kids (ages 9-13) with the following specifications:

TECH STACK:

- Next.js 14 with App Router and TypeScript
- Shadcn/ui components
- Magic UI for animations
- Tailwind CSS
- Google Sheets API integration

FEATURES NEEDED:

- Landing page with welcoming design
- User info form (name, age validation)
- Quiz with 10 multiple-choice questions
- 15-minute timer with visual countdown
- Progress indicator
- Auto-scoring and immediate results
- Google Sheets data storage
- Mobile-responsive design

DESIGN REQUIREMENTS:

- Kid-friendly, colorful interface
- Large, easily clickable buttons
- Clear, readable fonts (minimum 16px)
- Encouraging, positive messaging
- Simple navigation
- Loading states and success feedback

API INTEGRATION:

- Google Sheets API for data storage
- Environment variables for API keys
- Error handling for API failures
- Data validation and sanitization

QUESTIONS TO IMPLEMENT:

Use the 10 multiple-choice questions provided above with the correct answers marked (✓). Each question should be worth 1 point.

SCORING LOGIC:

- 1 point per correct answer
- Display score as X/10
- Provide encouraging feedback for all score ranges:
    1. 7-10: "Excellent! You're ready for our coding program!"
    2. 5-6: "Good job! You show great potential for learning coding!"
    3. 0-4: "Great effort! Keep exploring technology and come back to try again!"
- Save: timestamp, name, age, all answers, final score, completion time

PROJECT STRUCTURE:

```text
bb-quiz/
├── app/
│   ├── page.tsx (landing)
│   ├── info/page.tsx (user info collection)
│   ├── quiz/page.tsx (main quiz)
│   ├── results/page.tsx (results display)
│   └── api/
│       └── submit/route.ts (Google Sheets integration)
├── components/
│   ├── ui/ (shadcn components)
│   ├── Timer.tsx
│   ├── ProgressBar.tsx
│   └── QuestionCard.tsx
├── lib/
│   ├── utils.ts
│   ├── store.ts (Zustand store)
│   └── sheets.ts (Google Sheets API)
└── types/
    └── quiz.ts
```

Please create a complete, production-ready application with proper error handling, loading states, and deployment configuration for Vercel. Include setup instructions for Google Sheets API integration and environment variables needed.
