# CreatorOS Navigator

An AI-powered business strategist for content creators. Connect your social platforms, get AI-driven insights, and receive personalized growth roadmaps.

## Features

- 🔐 **Secure Authentication** - JWT-based login and registration
- 🔗 **Platform Integration** - Connect YouTube, X/Twitter, Substack, and more
- 🤖 **AI Analysis** - Get personalized growth strategies powered by AI
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🚀 **Modern Stack** - Built with React, Vite, and modern web technologies

## Tech Stack

- **Frontend**: React 19, Vite, React Router DOM
- **Styling**: Modern CSS with CSS Variables
- **HTTP Client**: Axios
- **Markdown**: React Markdown for roadmap display
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd creatorOS-navigator
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and set your backend API URL:
```
VITE_API_URL=http://localhost:3000
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.jsx    # Main dashboard with integrations
│   ├── LandingPage.jsx  # Public landing page
│   ├── Login.jsx        # Login form
│   ├── Register.jsx     # Registration form
│   ├── PrivacyPolicy.jsx # Privacy policy page
│   ├── Notification.jsx # Notification component
│   └── NotificationContainer.jsx # Notification container
├── hooks/               # Custom React hooks
│   └── useNotification.js # Notification management hook
├── App.jsx             # Main app component with routing
├── App.css             # Global styles
└── main.jsx            # App entry point
```

## Key Features

### Authentication Flow
- Protected routing with JWT tokens
- Automatic redirects for authenticated/unauthenticated users
- Form validation and error handling

### Dashboard
- Dynamic connection status for social platforms
- AI roadmap generation with loading states
- Responsive design for all screen sizes

### Notification System
- Toast-style notifications for user feedback
- Multiple notification types (success, error, warning, info)
- Auto-dismiss with manual close option

## API Integration

The frontend communicates with a backend API for:
- User authentication (`/api/auth/login`, `/api/auth/register`)
- Connection status (`/api/user/status`)
- Platform integrations (`/api/integrations/*`)
- AI roadmap generation (`/api/analysis/generate-roadmap`)

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Set the environment variable:
   - `VITE_API_URL`: Your backend API URL
3. Deploy!

The `vercel.json` configuration handles SPA routing and security headers.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Environment Variables

- `VITE_API_URL`: Backend API base URL (required)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.