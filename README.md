# Express TypeScript Template

Minimal TypeScript Express.js starter template with Nunjucks templating and HTMX.

## Preview

![Admin Panel](Screenshot%202025-11-10%20at%2009.16.24.png)

The admin panel provides a clean interface for managing posts with status controls, edit capabilities, and a responsive table view.

## Getting Started

```bash
# Install dependencies
npm install

# Run in development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Express.js 5** - Web framework
- **Nunjucks** - Templating engine
- **HTMX 2.0** - Dynamic interactions
- **Pico CSS 2** - Semantic styling
- **Quill 2.0** - Rich text editor
- **Nodemon** - Development auto-reload

## Project Structure

```
src/
├── controller/                  # Route handlers and routes
│   ├── handlers.ts
│   ├── postHandlers.ts
│   └── routes.ts
├── middleware/                  # Express middleware
│   └── loggerMiddleware.ts
├── model/                       # Data layer and database
│   ├── config.ts
│   ├── init.ts
│   ├── posts.ts
│   └── seed.json
├── types/                       # TypeScript type definitions
│   └── types.d.ts
├── view/                        # Nunjucks templates
│   ├── admin/
│   │   ├── admin.njk
│   │   └── components/
│   └── index.njk
└── index.ts                     # Server entry point

public/
├── js/                          # Client-side JavaScript
│   └── admin.js
└── styles/                      # Static CSS files
    └── custom.css
```

## Configuration

- Server port: Set `PORT` in `.env` file (defaults to 3030)
- Request logs: Written to `logs/requests.log`
