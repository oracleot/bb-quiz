# Church Kids Coding Aptitude Quiz

A comprehensive coding aptitude assessment tool designed specifically for young learners interested in computer programming. This interactive quiz evaluates fundamental programming concepts, logical thinking, and problem-solving skills across multiple categories.

## 🎯 Purpose

This quiz helps identify young talent with coding aptitude by testing:

- **Logical Thinking** - Pattern recognition and sequential reasoning
- **Problem Solving** - Breaking down complex problems into manageable parts
- **Basic Programming Concepts** - Variables, loops, conditions, and functions
- **Mathematical Logic** - Number patterns and computational thinking
- **Debugging Skills** - Identifying and fixing code issues

## ✨ Features

- **📱 Mobile-Responsive Design** - Works seamlessly on all devices
- **⏱️ Timed Assessment** - Configurable timer with real-time countdown
- **📊 Progress Tracking** - Visual progress bar and question navigation
- **🔄 Question Navigation** - Move between questions freely during the quiz
- **💾 Auto-Save Progress** - State persistence using Zustand with localStorage
- **📈 Instant Results** - Immediate scoring and category breakdown
- **📋 Google Sheets Integration** - Automatic submission of results for analysis
- **🔒 Privacy-First** - Local storage cleanup after submission
- **⚙️ Admin Panel** - Configure quiz settings (timer duration, etc.)
- **🔐 Secure Timer** - Quiz locked until timer is started

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs)
- **Form Handling**: [React Hook Form](https://react-hook-form.com) with [Zod](https://zod.dev) validation
- **Data Storage**: Google Sheets API via [googleapis](https://www.npmjs.com/package/googleapis)
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Google Service Account for Sheets API access

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bb-quiz
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_SHEET_ID=your_google_sheet_id_here
   GOOGLE_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----"
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Google Sheets Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing one

2. **Enable Google Sheets API**
   - Navigate to APIs & Services > Library
   - Search for "Google Sheets API" and enable it

3. **Create Service Account**
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "Service Account"
   - Download the JSON key file

4. **Set up your Google Sheet**
   - Create a new Google Sheet
   - Share it with your service account email (with Editor permissions)
   - Copy the Sheet ID from the URL
   - Set up headers: Name, Email, School, Age, Score, Category Scores, Timestamp

## 📁 Project Structure

```
bb-quiz/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page with quiz overview
│   ├── info/page.tsx      # User information collection
│   ├── quiz/page.tsx      # Main quiz interface
│   ├── results/page.tsx   # Results display and submission
│   └── api/               # API routes
│       ├── submit/        # Quiz submission endpoint
│       └── test/          # Google Sheets connection test
├── components/            # Reusable UI components
│   ├── Timer.tsx         # Countdown timer component
│   ├── ProgressBar.tsx   # Quiz progress indicator
│   └── QuestionCard.tsx  # Individual question display
├── lib/                  # Utility libraries
│   ├── store.ts         # Zustand state management
│   ├── sheets.ts        # Google Sheets integration
│   └── utils.ts         # General utilities
└── public/              # Static assets
```

## 🎮 How to Use

1. **Start the Quiz**
   - Read the welcome information and category breakdown
   - Click "Start Quiz" to begin

2. **Provide Information**
   - Enter your name, email, school, and age
   - Click "Start Quiz" to proceed

3. **Take the Assessment**
   - Answer 25 questions across 5 categories
   - Use "Previous" and "Next" buttons to navigate
   - Monitor your progress with the progress bar
   - Complete within the configured time limit

4. **View Results**
   - See your overall score and category breakdown
   - Results are automatically submitted to Google Sheets
   - Local storage is cleaned up for privacy

## 🧪 Testing

### Test Google Sheets Connection

Visit `/api/test` to verify your Google Sheets integration is working correctly.

### Run Development Tests

```bash
# Start development server
pnpm dev

# Test the complete quiz flow
# Navigate through: Landing → Info → Quiz → Results
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

- Ensure Node.js 18+ support
- Set environment variables
- Build command: `pnpm build`
- Start command: `pnpm start`

## 🔒 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GOOGLE_SHEET_ID` | Google Sheet ID from URL | `1t3gcDO6qy...` |
| `GOOGLE_CLIENT_EMAIL` | Service account email | `quiz-app@project.iam.gserviceaccount.com` |
| `GOOGLE_PRIVATE_KEY` | Service account private key | `"-----BEGIN PRIVATE KEY-----\n..."` |

## 📊 Quiz Categories

1. **Logical Thinking** (5 questions) - Pattern recognition and sequential reasoning
2. **Problem Solving** (5 questions) - Breaking down complex problems
3. **Basic Programming** (5 questions) - Variables, loops, and conditions
4. **Mathematical Logic** (5 questions) - Number patterns and computation
5. **Debugging** (5 questions) - Identifying and fixing code issues

## ⚙️ Admin Panel

The quiz includes an admin panel for managing quiz settings:

### Features

- **Timer Configuration**: Set quiz duration (1-60 minutes) with robust input handling (clearing the field is allowed, no leading zeros)
- **Secure Authentication**: Password-protected access
- **Real-time Updates**: Changes apply to new quiz sessions immediately
- **Activity Logging**: Track configuration changes with timestamps

### Access

1. Navigate to `/admin` or click the "Admin" link on the homepage
2. Enter the admin password (configured via `ADMIN_PASSWORD` environment variable)
3. Adjust timer settings as needed

### Security Notes

- Admin password should be changed from the default in production
- Authentication tokens are stored locally for session management
- Configuration changes are logged for audit purposes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or support, please open an issue in the repository or contact the development team.

---

Built with ❤️ for nurturing young coding talent
