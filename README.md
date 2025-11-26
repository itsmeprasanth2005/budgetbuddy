
# Budget Buddy

A comprehensive personal finance tracker built with React, TypeScript, and Tailwind CSS.

## Features
- **User Authentication**: Secure sign-up and login.
- **Expense Tracking**: Record Income and Expenses with support for Indian Rupee (₹).
- **Dashboard**: Visual summaries with charts and AI-powered insights (via Gemini API).
- **Reports**: Daily, Weekly, Monthly, and Yearly reports with CSV Export.
- **Custom Titles**: Flexible transaction titles instead of rigid categories.

## Setup Instructions

### 1. Install Dependencies
If running locally:
```bash
npm install
```

### 2. Run the Application
```bash
npm start
```

## How to Connect to Firebase

By default, this app uses `localStorage` (browser memory) to store data so you can test it immediately. To persist data to the cloud using Firebase, follow these steps:

### Step 1: Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and follow the prompts.

### Step 2: Enable Authentication & Firestore
1. In your project dashboard, go to **Build > Authentication**.
2. Click **Get Started**, select **Email/Password**, enable it, and save.
3. Go to **Build > Firestore Database**.
4. Click **Create database**, select a region, and choose **Start in test mode** (for development).

### Step 3: Get Configuration
1. Click the **Project settings** (gear icon) > **General**.
2. Scroll to "Your apps" and click the web icon (`</>`).
3. Register the app (e.g., "Budget Buddy").
4. Copy the `firebaseConfig` object (apiKey, authDomain, etc.).

### Step 4: Update Code
1. Open `services/firebaseConfig.ts` in this project.
2. Replace the placeholder values with your copied configuration.
3. Open `App.tsx`.
4. Change the import line:
   ```typescript
   // FROM:
   import { getCurrentSession, fetchTransactions } from './services/storageService';
   
   // TO:
   import { getCurrentSession, fetchTransactions } from './services/firebaseService';
   ```
5. Open `pages/Auth.tsx`, `pages/TransactionForm.tsx`, `pages/TransactionList.tsx`, and `components/Layout.tsx`.
6. Update imports in these files to use `../services/firebaseService` instead of `../services/storageService`.

Once done, your app will automatically save users and transactions to your Firebase cloud database!
