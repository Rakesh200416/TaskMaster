# TaskMaster Pro

TaskMaster Pro is a full-stack task management application built with React, TypeScript, and Express. It provides a modern interface for creating, organizing, and tracking tasks with a clean and intuitive user experience.

## Features

- **Modern UI**: Clean and responsive interface built with React and Tailwind CSS
- **Full CRUD Operations**: Create, Read, Update, and Delete tasks
- **Real-time Updates**: Instant feedback when adding, editing, or removing tasks
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Type Safety**: Built with TypeScript for enhanced reliability and maintainability
- **RESTful API**: Well-structured API endpoints for data management
- **Modular Architecture**: Separation of concerns with dedicated client, server, and shared directories

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Radix UI Components
- **Backend**: Node.js, Express, TypeScript
- **Build Tool**: Vite
- **Database**: PostgreSQL (via Drizzle ORM)
- **Package Manager**: npm

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- PostgreSQL database (if using persistent storage)

## Installation & Setup

1. Clone or download the repository
2. Navigate to the project directory:
```bash
cd Task-Master
```

3. Install dependencies:
```bash
npm install
```

4. Install cross-env for cross-platform environment variable support:
```bash
npm install --save-dev cross-env
```

5. Set up environment variables (optional):
Create a `.env` file in the root directory with the following variables:
```
PORT=5000
DATABASE_URL="your_postgres_connection_string"
```

## Running the Application

### Development Mode

To run the application in development mode:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5000`.

### Production Build

To build the application for production:

```bash
npm run build
```

To run the production build:

```bash
npm start
```

## Database Setup

This application uses Drizzle ORM for database operations. To set up your database:

1. Ensure you have PostgreSQL installed and running
2. Update your `DATABASE_URL` in the environment variables
3. Run the database migration:
```bash
npm run db:push
```

## Project Structure

```
Task-Master/
├── client/                 # Frontend source code
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components
│   │   └── App.tsx         # Main application component
│   ├── index.html          # HTML template
│   └── requirements.md     # Frontend requirements
├── server/                 # Backend source code
│   ├── index.ts            # Main server file
│   ├── routes.ts           # API route definitions
│   ├── static.ts           # Static file serving
│   ├── storage.ts          # Data storage logic
│   └── vite.ts             # Vite configuration for development
├── shared/                 # Shared code between client and server
│   ├── routes.ts           # Shared route definitions
│   └── schema.ts           # Shared data schemas
├── script/                 # Build scripts
├── public/                 # Static assets
└── ...
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run check` - Type-check TypeScript files
- `npm run db:push` - Push database schema changes

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. The project includes a `vercel.json` configuration file and API route handlers that properly set up the full-stack application for serverless deployment

3. Run the deployment command:
```bash
vercel
```

4. Follow the prompts to configure your project settings

### GitHub Repository Setup

1. Initialize Git repository:
```bash
git init
git add .
git commit -m "Initial commit: TaskMaster Pro application"
```

2. Add your remote repository:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please file an issue in the GitHub repository.