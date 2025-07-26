
# Profit Center

A modern React application for real-time statistics calculation and visualization. Features include live data streaming via WebSocket, efficient statistics computation (mean, standard deviation, mode, median), mock data support, and a responsive UI. Built with React 19, Vite for a fast and seamless user experience.

## Tech Stack

- **[React](https://react.dev/)**: Modern UI library for building interactive interfaces
- **[Vite](https://vite.dev/)**: Next-generation frontend tooling for fast development and builds
- **[Jest](https://jestjs.io/)** & **[Testing Library](https://testing-library.com/)**: Unit and integration testing
- **[ESLint](https://eslint.org/)** & **[Prettier](https://prettier.io/)**: Code quality and formatting

## Features

### Statistics & Data
- **Live Data**: Real-time statistics from a WebSocket data stream
- **Statistics Calculation**: Mean, standard deviation, mode, median, lost quotes, and calculation time
- **Efficient Algorithms**: Uses Count-Min Sketch for fast mode estimation

### User Experience
- **Responsive Layout**: Optimized for both desktop and mobile
- **Accessible UI**: Keyboard navigation and ARIA roles
- **Performance**: Memoized calculations and event handlers

## Pages

### Main Page (`/`)
- Displays statistics block with live data
- Controls for starting data stream, viewing statistics,
- Responsive design for all devices

## Getting Started

Before starting 🏁, ensure you have [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/) installed.

```bash
# Clone this project
git clone https://github.com/mmazitov/profit-center

# Access the project directory
cd profit-center

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev

# Build for production
npm run build
# or
yarn build

# Preview production build
npm run preview
# or
yarn preview

# Run linting
npm run lint
# or
yarn lint

# Run tests
npm run test
# or
yarn test
```

Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to see the app.

## Project Structure

```
src/
├── components/         # Reusable UI and statistics display components
│   └── UI/             # Generic UI components (Button, etc.)
├── hooks/              # Custom React hooks (WebSocket, stats calculator)
├── utils/              # Utility functions (Count-Min Sketch, formatting)
├── tests/              # Unit and integration tests
├── App.jsx             # Main app component
├── main.jsx            # Entry point
├── index.css           # Tailwind CSS styles
└── assets/             # Static assets (images, icons)
```

## Performance Optimizations

- **useMemo**: Memoizes expensive calculations
- **useCallback**: Memoizes event handlers
- **Efficient Data Structures**: Count-Min Sketch for fast frequency estimation

## Future Enhancements

- **Custom Data Sources**: Support for different data streams
- **Export Data**: Download statistics as CSV/JSON
- **Dark Mode**: Theme toggle for better accessibility

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.

---
