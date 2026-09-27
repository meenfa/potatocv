# PotatoCV

PotatoCV is a playful AI-powered resume reviewer. Upload a PDF or DOCX, paste resume text, and get a sharp three-line roast—or practical improvement suggestions through the analyze API.

## Features

- Roast a resume or request improvement feedback.
- Upload PDF and DOCX files (up to 3 MB) or paste text directly.
- No account is required.
- Responsive interface with privacy, terms, about, and contact pages.

## Tech stack

- Next.js 16 App Router and React 19
- TypeScript and Tailwind CSS
- Google Gemini API through its OpenAI-compatible chat completions endpoint
- pdf-parse and Mammoth for resume text extraction
- Vercel Analytics

## Getting started

### Requirements

- Node.js 20.9 or later
- npm
- A Google Gemini API key

### Install and run locally

```bash
npm install
```

Create .env.local in the project root:

```bash
GEMINI_API_KEY=your_gemini_api_key
# Optional: defaults to gemini-3.1-flash-lite-preview
AI_MODEL=gemini-3.1-flash-lite-preview
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev    # Start the development server
npm run lint   # Run ESLint
npm run build  # Create a production build
npm run start  # Serve the production build
```

## API routes

| Route | Method | Purpose |
| --- | --- | --- |
| /api/upload | POST | Extract text from a PDF or DOCX multipart upload. Send the file in the file form field. |
| /api/analyze | POST | Generate resume feedback. Send JSON with resume and mode (roast or improve). |

Example analyze request:

```json
{
  "resume": "Resume text goes here",
  "mode": "roast"
}
```

The analyze endpoint trims input to 8,000 characters. The upload endpoint accepts PDF and DOCX files up to 3 MB.

## Privacy

Resume text submitted for feedback is sent to the configured Gemini API to generate a result. Uploaded files are parsed by the app to extract text. The app does not require an account or store resumes in a persistent application database. Google Gemini and Vercel Analytics process data under their own terms; see the [Privacy Policy](/privacy) for more information.

Never submit information you do not have permission to share.

## Deployment

Deploy as a Next.js application (for example, on Vercel) and configure GEMINI_API_KEY in the deployment environment. Set AI_MODEL only if you want to use a model other than the default.

## Release

Current application version: **2.0.0**.
