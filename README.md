# Event Management App

A modern, full-stack event management application built with React, Next.js, Express API routes, Radix UI, and Tailwind CSS.

## Features

- **Event Management**: Create, edit, delete, and view events with detailed information
- **Image Support**: Add images to events via URL to make them more appealing
- **Attendee Tracking**: Manage attendees with status tracking (pending, confirmed, cancelled)
- **AI-Powered Descriptions**: Generate compelling event descriptions using Google Gemini AI
- **Authentication**: Secure user authentication with Supabase Auth
- **Modern UI**: Beautiful, responsive interface built with Radix UI and Tailwind CSS
- **Database**: PostgreSQL database with Row Level Security via Supabase

## Pages

- **Dashboard**: Overview of all your events with statistics
- **Event Details**: Full event information with attendee management
- **AI Suggestions**: Generate event descriptions with AI assistance
- **About Us**: Learn about the platform
- **Support**: Get help and contact support
- **FAQ**: Frequently asked questions

## Setup

### Prerequisites

- Node.js 18+ installed
- Supabase account and project
- Google Gemini API key

### Environment Variables

Add the following environment variable to your Vercel project:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your Gemini API key from: https://aistudio.google.com/app/apikey

### Database Setup

The database schema is automatically set up via the SQL scripts in the `scripts/` folder:

1. `001_create_events_schema.sql` - Creates events and attendees tables with RLS policies
2. `002_add_image_url_column.sql` - Adds image URL support to events

These scripts run automatically when you first use the app.

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Add environment variables in Vercel
4. Deploy to Vercel or run locally: `npm run dev`

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI Components**: Radix UI, shadcn/ui
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI**: Google Gemini API
- **Forms**: React Hook Form + Zod
- **Date Handling**: date-fns

## Project Structure

```
app/
├── dashboard/          # Main dashboard
├── events/[id]/        # Event detail pages
├── ai-suggestions/     # AI description generator
├── about/              # About page
├── support/            # Support page
├── faq/                # FAQ page
├── auth/               # Authentication pages
└── api/                # API routes

components/
├── app-header.tsx      # Global navigation header
├── app-footer.tsx      # Global footer
├── event-card.tsx      # Event card component
├── event-details.tsx   # Event detail view
├── create-event-dialog.tsx
├── edit-event-dialog.tsx
├── ai-suggestions-form.tsx
└── ui/                 # Radix UI components

scripts/
└── *.sql               # Database migration scripts
```

## Features in Detail

### Event Creation
Create events with title, description, location, dates, and an optional image URL to make your events visually appealing.

### AI Suggestions
Use Google Gemini to generate professional event descriptions. Simply provide:
- Event title
- Event type (conference, workshop, etc.)
- Key details about the event

The AI will generate a compelling 100-200 word description you can use or customize.

### Image Support
Add images to events by providing a publicly accessible image URL. Images are displayed on event cards and detail pages with fallback handling for unavailable images.

## Security

- Row Level Security (RLS) policies ensure users can only access their own events
- Secure authentication via Supabase
- Environment variables for sensitive data
- Input validation and sanitization

## License

MIT License - feel free to use this project for your own purposes.
