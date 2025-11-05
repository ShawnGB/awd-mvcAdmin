# Express TypeScript Template

Minimal TypeScript Express.js starter template with Nunjucks templating and HTMX.

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
- **Nodemon** - Development auto-reload

## Project Structure

```
src/
├── db/                          # Database layer
├── handler/                     # Route handlers
├── middleware/                  # Express middleware
├── templates/                   # Nunjucks templates
└── index.ts                     # Server entry point

public/
└── styles/                      # Static CSS files
```

## Configuration

- Server port: Set `PORT` in `.env` file (defaults to 3030)
- Request logs: Written to `logs/requests.log`
