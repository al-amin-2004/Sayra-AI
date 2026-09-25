# Sayra AI

> A modern, full-stack AI chat application built with Next.js, MongoDB, and OpenRouter.

Sayra is a modern AI conversational platform designed to provide a clean, fast, and intuitive chat experience. It includes authentication, Google Sign-In, persistent conversations, streaming AI responses, chat management, profile management, and a responsive interface.

---

## ✨ Features

### 🤖 AI Chat

- Real-time AI conversations
- Streaming assistant responses
- Conversation history
- Context-aware responses
- Markdown rendering
- GitHub Flavored Markdown support
- Syntax-highlighted code blocks
- Code copy functionality
- Automatic chat title generation

### 💬 Chat Management

- Create conversations automatically when the first message is sent
- Persistent chat history
- Rename conversations
- Pin/unpin conversations
- Delete conversations
- Automatically sort pinned and recently updated chats
- Dynamic chat URLs using MongoDB Object IDs

### 🔐 Authentication

- Email/password authentication
- Email verification with OTP
- Google OAuth authentication
- Secure HTTP-only authentication cookies
- Custom JWT-based authentication
- Sign in / sign out
- Account linking with Google

### 👤 User Profile

- View profile information
- Update user information
- Profile image upload
- Cloudinary image storage
- Google profile image support

### 🎨 UI / UX

- Responsive design
- Desktop and mobile support
- Modern SaaS-style interface
- Dark mode support
- Sidebar navigation
- Loading states
- Toast notifications
- Smooth chat experience
- Accessible UI components

### 📄 Legal Pages

- Privacy Policy
- Terms of Service

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 16**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React**
- **React Markdown**
- **Remark GFM**
- **React Syntax Highlighter**

### Backend

- **Next.js Route Handlers**
- **MongoDB**
- **Mongoose**
- **JWT**
- **bcrypt**

### AI

- **Vercel AI SDK**
- **OpenRouter**
- Streaming AI responses

### Authentication

- Custom authentication system
- Google OAuth 2.0
- JWT-based sessions
- OTP email verification

### Storage

- **Cloudinary** for profile images

---

## 🏗️ Architecture

Sayra follows a full-stack Next.js architecture where the frontend, backend API routes, authentication, and database integration live inside the same application.

```text
┌─────────────────────────────────────┐
│              Sayra UI               │
│       Next.js + React + Tailwind    │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│          Next.js API Routes         │
│                                     │
│  Auth │ Chat │ User │ Cloudinary    │
└───────────────┬─────────┬───────────┘
                │         │
                ▼         ▼
        ┌────────────┐  ┌──────────────┐
        │  MongoDB   │  │  OpenRouter  │
        │  Mongoose  │  │      AI      │
        └────────────┘  └──────────────┘
```

---

## 📁 Project Structure

```text
sayra/
├── public/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── layout.tsx
│   │   │   ├── signin/
│   │   │   ├── signup/
│   │   │   └── verification/
│   │   │
│   │   ├── (routes)/
│   │   │   ├── chat/
│   │   │   ├── privacy-policy/
│   │   │   └── terms-service/
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   ├── cloudinaryUpload/
│   │   │   └── user/
│   │   │
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── chat/
│   │   ├── shared/
│   │   └── ui/
│   │
│   ├── constants/
│   ├── helpers/
│   ├── hooks/
│   ├── icons/
│   ├── lib/
│   ├── models/
│   ├── providers/
│   ├── styles/
│   └── types/
│
├── .env.local
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗄️ Database

Sayra uses **MongoDB with Mongoose** for persistent application data.

### Main Collections

```text
User
 ├── id
 ├── name
 ├── googleId
 ├── email
 ├── isVerifiedEmail
 ├── avatar
 ├── avatarId
 └── role

Chat
 ├── id
 ├── userId
 ├── title
 ├── isPinned
 └── timestamps

Message
 ├── id
 ├── chatId
 ├── role
 ├── content
 └── timestamps

OTPVerification
 ├── id
 ├── userId
 ├── verificationType
 ├── verificationCode
 ├── expiresAt
 └── attempts
```

Messages are associated with a chat using the MongoDB Chat `_id`.

---

## 🔄 Chat Flow

A new conversation does not create an empty database record.

The flow is:

```text
User opens Sayra
       │
       ▼
   New Chat
       │
       ▼
User sends first message
       │
       ▼
Create Chat document
       │
       ▼
Generate MongoDB _id
       │
       ▼
Save user message
       │
       ▼
Send conversation to AI
       │
       ▼
Stream AI response
       │
       ▼
Save assistant message
       │
       ▼
Redirect to /chat/[mongodb_id]
```

This keeps the database clean by avoiding empty conversations.

---

## 🔐 Authentication Flow

### Email Authentication

```text
Sign Up
   │
   ▼
Create User
   │
   ▼
Send OTP
   │
   ▼
Verify OTP
   │
   ▼
Account Activated
   │
   ▼
JWT Authentication Cookie
```

### Google Authentication

```text
Login with Google
       │
       ▼
Google OAuth
       │
       ▼
Authorization Code
       │
       ▼
OAuth Callback
       │
       ▼
Verify Google Account
       │
       ▼
Find / Create User
       │
       ▼
Generate JWT
       │
       ▼
Set auth_token Cookie
```

---

## 🌐 Environment Variables

Create a `.env.local` file in the project root.

```env
# Database
MONGODB_URI=

# Resend Email
RESEND_API_KEY=

# Authentication
JWT_SECRET=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# OpenRouter
OPENROUTER_API_KEY=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/al-amin-2004/Sayra-AI.git
```

### 2. Enter the project

```bash
cd Sayra-AI
```

### 3. Install dependencies

Using npm:

```bash
npm install
```

Or using Bun:

```bash
bun install
```

### 4. Configure environment variables

Create:

```text
.env.local
```

Then add the required environment variables.

### 5. Start the development server

Using npm:

```bash
npm run dev
```

Or Bun:

```bash
bun dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Development

Run the development server:

```bash
npm run dev
```

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

## 🔑 Google OAuth Configuration

For local development, configure the Google OAuth redirect URI as:

```text
http://localhost:3000/api/auth/google/callback
```

For production, use your deployed domain:

```text
https://your-domain.com/api/auth/google/callback
```

The production redirect URI must also be configured in your Google Cloud OAuth credentials.

---

## 🖼️ Cloudinary

Sayra uses Cloudinary for profile image uploads.

The upload flow is:

```text
User selects image
       │
       ▼
Sayra API
       │
       ▼
Cloudinary
       │
       ▼
Image URL
       │
       ▼
MongoDB User Profile
```

Cloudinary credentials must be stored in environment variables.

---

## 🤖 AI Response Architecture

Sayra uses the Vercel AI SDK with OpenRouter.

```text
User Message
     │
     ▼
Next.js API Route
     │
     ▼
Load Conversation History
     │
     ▼
Build AI Messages
     │
     ▼
OpenRouter
     │
     ▼
streamText()
     │
     ▼
Stream Response
     │
     ▼
Sayra UI
     │
     ▼
Save Assistant Message
```

This allows the interface to display the assistant response progressively instead of waiting for the complete response.

---

## 🧠 Conversation Context

The AI receives previous conversation messages as context.

Messages are represented using their conversation roles:

```ts
{
  role: "user",
  content: "Hello"
}
```

and:

```ts
{
  role: "assistant",
  content: "Hello! How can I help?"
}
```

This allows Sayra to understand references such as:

```text
"আগের কথাটা বুঝিয়ে বলো"

"ওটার দ্বিতীয় অংশটা দেখাও"

"আমি যেটা আগে বলেছিলাম..."
```

The system prompt instructs the AI to use previous messages as context while treating the latest user request as the primary request.

---

## 🔒 Security Considerations

Sayra uses several security mechanisms:

- HTTP-only authentication cookies
- JWT authentication
- Password hashing with bcrypt
- OAuth state validation
- Authenticated API routes
- User-owned chat validation
- Environment variables for secrets
- Server-side database operations
- Protected profile updates

### Important

Never commit secrets such as:

```text
.env.local
API keys
JWT secrets
Database passwords
OAuth client secrets
Cloudinary secrets
SMTP passwords
```

Make sure `.gitignore` contains:

```gitignore
.env
.env.local
.env.*.local
node_modules
.next
```

---

## 📱 Responsive Design

Sayra is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The interface adapts the chat layout, sidebar, navigation, and input area according to screen size.

---

## 🎯 Current Project Goals

The project is being developed with a focus on:

- Clean architecture
- Maintainable TypeScript
- Scalable API structure
- Persistent conversations
- Fast AI streaming
- Secure authentication
- Responsive UI
- Production-ready foundations

---

## 🛣️ Roadmap

Planned improvements include:

- [ ] Conversation memory
- [ ] Better long-conversation context management
- [ ] AI usage tracking
- [ ] Message regeneration
- [ ] Edit and resend messages
- [ ] Stop generating response
- [ ] File uploads
- [ ] Image understanding
- [ ] Voice input
- [ ] Voice output
- [ ] Advanced search
- [ ] Conversation export
- [ ] Archive conversations
- [ ] Conversation folders
- [ ] Usage dashboard
- [ ] Improved mobile experience
- [ ] Production deployment
- [ ] Automated testing

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

### Development workflow

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Make your changes
4. Test the application
5. Commit your changes

```bash
git commit -m "feat: add your feature"
```

6. Push the branch

```bash
git push origin feature/your-feature
```

7. Open a Pull Request

---

## 📜 License

This project currently does not specify an open-source license.

If this repository is intended to be publicly reusable, add an appropriate license such as MIT before publishing it as an open-source project.

---

## 👨‍💻 Author

**Al Amin**

Built with ❤️ using Next.js, TypeScript, MongoDB, and modern AI technologies.

---

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

More improvements and features are coming to Sayra.
