# Read & Burn

A self-destructing message application built with TypeScript, Express.js, and HTMX. Send secure, one-time messages that automatically delete after being read.

## Getting Started

1. Install dependencies: `npm install`
2. Run in development mode: `npm run dev`
3. Build for production: `npm run build`
4. Start production server: `npm start`

## How It Works

1. Create a message with your name and content
2. Receive a unique shareable link
3. Share the link with the recipient
4. Message is displayed for 10 seconds and then self-destructs
5. Message is permanently deleted after being read once

## Project Structure

```
src/
├── db/
│   └── db.ts                    # File-based message storage
├── handler/
│   └── handlers.ts              # Route handlers for message CRUD
├── middleware/
│   └── loggerMiddleware.ts      # Request logging middleware
├── templates/
│   ├── forms/
│   │   ├── inputform.njk        # Message creation form
│   │   └── readMessage.njk      # Message display with countdown
│   ├── replies/
│   │   ├── success.njk          # Shareable link response
│   │   └── notAvailable.njk     # Error template for burned messages
│   └── index.njk                # Base layout template
└── index.ts                     # Express server configuration

public/
└── styles/
    └── custom.css               # Glassmorphic styling
```

## Features

- **Self-Destructing Messages**: Messages automatically delete after being read once
- **10-Second Countdown**: Recipients have 10 seconds to read the message
- **Unique Links**: Each message gets a UUID-based shareable link
- **File-Based Storage**: Simple JSON file storage for messages
- **HTMX Integration**: Dynamic form handling without full page reloads
- **Glassmorphic UI**: Modern frosted glass design with gradient background
- **Error Handling**: Clean error page when messages are already burned

## Tech Stack

- TypeScript for type safety
- Express.js web framework
- Nunjucks templating engine
- HTMX 2.0 for interactivity
- Pico CSS for semantic styling
- UUID for unique message identifiers
- File-based storage (JSON)

## Development

The `npm run dev` command uses nodemon to watch for changes in TypeScript files, JSON configs, and Nunjucks templates, automatically restarting the server on changes.

## Build Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Build and start production server

## Configuration

- Server port can be configured in `.env` file (defaults to 3030)
# awd-mvcAdmin
