[![CI](https://img.shields.io/badge/CI-configured-blue)](#) [![Nightly](https://img.shields.io/badge/Nightly-usage%20alert-blue)](#) [![Codecov](https://img.shields.io/badge/Codecov-report-blue)](#)

# MeetingHub

> AI-Powered Meeting Intelligence Platform with Automatic Transcription, OCR, and Smart Conversation

[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Features

- 🎤 **Audio Transcription**: Automatic transcription with speaker identification (AssemblyAI)
- 🖼️ **OCR**: Extract text from images (SiliconFlow DeepSeek-OCR)
- 🤖 **AI Chat**: Context-aware conversations about your meetings (Gemini 2.5 Pro via Yunwu)
- 💬 **Real-time Streaming**: Server-Sent Events (SSE) for instant AI responses
- 📁 **File Management**: Upload and manage audio, images, and documents
- 🔐 **Secure Authentication**: JWT-based auth with email verification
- 🎨 **Modern UI**: React 19 + Tailwind CSS with responsive layout spanning `/dashboard`, the new `/meetings` workspace, and admin `/settings`.

## 📋 Delivery Plan

`CONTINUATION_PLAN.md` is the single source of truth for Milestone A/B/C scope, replacing older `SECOND_PHASE_DEV_PLAN.md` and `IMPLEMENTATION_PLAN.md` checklists. Every route in the app links back to this plan, so keep it updated as you deliver backend filters, workspace UI, and QA coverage.

## 📊 Observability & Budget Tracking

`OBSERVABILITY.md` documents how `UsageTracker`, the `usage_logs` table, and the cron-friendly `backend/app/jobs/usage_alert.py` entry point work together. Follow it to configure API budget limits, run daily alert checks, and monitor attachment processing status via the new frontend polling helper.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **PostgreSQL** 14+

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/MeetingHub.git
cd MeetingHub
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your configuration (see Configuration section)

# Run database migrations
alembic upgrade head

# Start backend server
uvicorn app.main:app --reload --port 8000
```

Backend will be available at: http://localhost:8000
API Documentation: http://localhost:8000/docs

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

Frontend will be available at: http://localhost:5173

## ⚙️ Configuration

### Backend Environment Variables

Create `backend/.env`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/meetinghub

# Security
SECRET_KEY=your-secret-key-here-minimum-64-characters-long-random-string
ACCESS_TOKEN_EXPIRE_MINUTES=10080  # 7 days

# API Keys
ASSEMBLYAI_API_KEY=your-assemblyai-api-key
SILICONFLOW_API_KEY=your-siliconflow-api-key
YUNWU_API_KEY=your-yunwu-api-key
YUNWU_LLM_MODEL=gemini-2.5-pro-thinking
YUNWU_BASE_URL=https://yunwu.ai/v1  # optional; try https://yunwu.ai if your client needs it
# Optional fallback (not needed if using Yunwu/Gemini)
DEEPSEEK_API_KEY=
RESEND_API_KEY=your-resend-api-key

# CORS
CORS_ORIGINS=http://localhost:5173

# App
APP_NAME=MeetingHub
DEBUG=True
ENVIRONMENT=development
```

### Frontend Environment Variables

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_ATTACHMENT_STREAM_MODE=sse # optional: set to 'polling' to disable SSE uploads
```

- `VITE_ATTACHMENT_STREAM_MODE` toggles between the SSE-powered attachment stream (`sse`, default) and the legacy polling fallback (`polling`).

### Getting API Keys

1. **AssemblyAI**: Sign up at [assemblyai.com](https://www.assemblyai.com/)
2. **SiliconFlow**: Sign up at [siliconflow.cn](https://siliconflow.cn/)
3. **Yunwu (OpenAI 兼容，Gemini 2.5 Pro)**: 在 [yunwu.ai](https://yunwu.ai) 后台创建令牌；`base_url` 可尝试 `https://yunwu.ai/v1` 或 `https://yunwu.ai/v1/chat/completions`
4. **Resend** (Email): Sign up at [resend.com](https://resend.com/)

## ⚡ Performance tips for OCR/LLM
- Run multiple workers to avoid long OCR/LLM calls blocking: `uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 2` (or gunicorn with uvicorn workers).
- Frontend API timeout is set to 90s (`frontend/src/lib/api.ts`) to tolerate heavy requests; adjust if needed.
- Upload前后都可对图片做压缩，前端已自动将最长边压缩到约 1600px、JPEG 85 质量，能显著减少上传与推理时间。

## 📁 Project Structure

```
MeetingHub/
├── backend/
│   ├── alembic/                    # Database migrations
│   ├── app/
│   │   ├── api/v1/                # API endpoints
│   │   │   ├── auth.py           # Authentication
│   │   │   ├── meetings.py       # Meeting management
│   │   │   └── conversations.py  # AI conversations
│   │   ├── core/                 # Core config
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── db/                   # Database
│   │   ├── models/               # SQLAlchemy models
│   │   │   ├── user.py
│   │   │   ├── meeting.py
│   │   │   ├── attachment.py
│   │   │   └── conversation.py
│   │   ├── schemas/              # Pydantic schemas
│   │   ├── services/             # Business logic
│   │   │   ├── audio_service.py      # AssemblyAI
│   │   │   ├── ocr_service.py        # SiliconFlow OCR
│   │   │   ├── llm_service.py        # Gemini AI
│   │   │   └── storage_service.py    # File storage
│   │   └── main.py               # App entry point
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── auth/             # Auth components
    │   │   ├── layout/           # Layout components
    │   │   │   ├── sidebar.tsx
    │   │   │   ├── meeting-list.tsx
    │   │   │   └── ai-chat.tsx
    │   │   ├── meeting/          # Meeting components
    │   │   │   ├── meeting-card.tsx
    │   │   │   ├── meeting-detail-view.tsx
    │   │   │   ├── audio-upload.tsx
    │   │   │   └── file-upload.tsx
    │   │   └── ui/               # Base UI components
    │   ├── lib/                  # Utilities
    │   │   ├── api.ts           # Axios client
    │   │   ├── auth-api.ts
    │   │   ├── meeting-api.ts
    │   │   ├── conversation-api.ts
    │   │   └── attachment-api.ts
    │   ├── store/                # Zustand stores
    │   │   ├── auth.ts
    │   │   ├── meeting.ts
    │   │   ├── conversation.ts
    │   │   └── ui.ts
    │   ├── pages/                # Pages
    │   └── types/                # TypeScript types
    └── package.json
```

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI 0.109
- **Database**: PostgreSQL + SQLAlchemy
- **Authentication**: JWT (python-jose)
- **AI Services**:
  - Google Gemini 2.0 Flash (LLM)
  - AssemblyAI (Audio transcription)
  - SiliconFlow DeepSeek-OCR (OCR)
- **File Storage**: Local / AWS S3 (boto3)
- **Email**: Resend

### Frontend
- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router 6
- **Forms**: React Hook Form + Zod
- **File Upload**: react-dropzone
- **HTTP Client**: Axios

## 📚 API Documentation

### Authentication

```
POST   /api/v1/auth/register           Register new user
POST   /api/v1/auth/login              Login
POST   /api/v1/auth/forgot-password    Request password reset
POST   /api/v1/auth/reset-password     Reset password
```

### Meetings

```
GET    /api/v1/meetings                List meetings
POST   /api/v1/meetings                Create meeting
GET    /api/v1/meetings/{id}           Get meeting
PUT    /api/v1/meetings/{id}           Update meeting
DELETE /api/v1/meetings/{id}           Delete meeting
POST   /api/v1/meetings/{id}/upload-audio   Upload audio file
POST   /api/v1/meetings/{id}/upload-image   Upload image file
GET    /api/v1/meetings/{id}/attachments    List attachments
```

### Conversations (AI Chat)

```
POST   /api/v1/conversations/get-or-create  Get or create conversation
GET    /api/v1/conversations                List conversations
GET    /api/v1/conversations/{id}           Get conversation with messages
POST   /api/v1/conversations/{id}/chat      Chat with AI (SSE streaming)
DELETE /api/v1/conversations/{id}           Delete conversation
```

## 🎯 Usage Guide

### 1. Create Your First Meeting

1. Click "New" button in the meeting list
2. Enter meeting title and description
3. Click "Create Meeting"

### 2. Upload Audio for Transcription

1. Click on a meeting to view details
2. Click "Add Audio" button
3. Select or drag-drop an audio file (MP3, WAV, M4A)
4. Wait for automatic transcription with speaker labels

### 3. Upload Images for OCR

1. Open meeting details
2. Click "Add Image" button
3. Drag-drop image files or click to select
4. View extracted text automatically

### 4. Chat with AI About Your Meetings

1. Click the checkbox icon in meeting list header (multi-select mode)
2. Select one or more meetings
3. Type your question in the chat input
4. Receive real-time streaming AI responses based on meeting content

## 🧪 Development

### Backend

```bash
# Run tests
pytest

# Run with auto-reload
uvicorn app.main:app --reload

# Format code
black .

# Lint
flake8
```

### Frontend

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint

# Type check
npx tsc --noEmit

# Run all tests (backend + frontend) from repo root
./run-tests.sh
```

## 📦 Database Migrations

```bash
# Create a new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## 🔒 Security Features

- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ CORS protection
- ✅ SQL injection protection (SQLAlchemy ORM)
- ✅ File type and size validation
- ✅ User data access authorization
- ✅ Environment variable configuration

## 📈 Performance

- **API Response Time**: < 500ms
- **Audio Upload**: Up to 200MB
- **Image Upload**: Up to 10MB
- **AI Streaming**: First chunk < 2s
- **Database**: Connection pooling enabled

## 🐛 Known Issues

See [PROJECT_STATUS.md](PROJECT_STATUS.md) for current project status and known issues.

## 📖 Documentation

- **IMPLEMENTATION_PLAN.md**: Complete development plan (15 days)
- **PROJECT_STATUS.md**: Current implementation status
- **FRONTEND_DESIGN.md**: UI design specifications
- **CONVERSATION_THREAD_ISOLATION.md**: Conversation isolation design

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [React](https://react.dev/) - JavaScript library for building UIs
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [AssemblyAI](https://www.assemblyai.com/) - Audio transcription API
- [SiliconFlow](https://siliconflow.cn/) - OCR API
- [Google Gemini](https://ai.google.dev/) - Large Language Model

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Status**: ✅ MVP Core Features Complete

**Current Phase**: 3/6 (Core Development Complete)
