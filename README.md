# Weather Dashboard

A modern, responsive weather dashboard built with Vue 3, TypeScript, and Tailwind CSS. Search for any city to view current weather conditions and a 5-day forecast with dynamic theming based on weather conditions.

![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat&logo=tailwindcss)
![Vitest](https://img.shields.io/badge/Vitest-4.0-6E9F18?style=flat&logo=vitest)

## Features

- 🔍 **City Search** - Search any city with debounced auto-search
- 🌡️ **Current Weather** - Temperature, humidity, wind speed, and conditions
- 📅 **5-Day Forecast** - Daily forecasts with min/max temperatures
- 🎨 **Dynamic Theming** - Background and colors change based on weather (sunny, rainy, stormy, etc.)
- 📱 **Responsive Design** - Works on desktop and mobile
- ✅ **85 Unit Tests** - Comprehensive test coverage

---

## Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **OpenWeatherMap API Key** ([Get one free here](https://openweathermap.org/api))

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd weather-app-prep
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Configure the API Key

Create a `.env` file in the project root:

```bash
touch .env
```

Add your OpenWeatherMap API key to the `.env` file:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

> ⚠️ **Important**: Replace `your_api_key_here` with your actual API key from [OpenWeatherMap](https://openweathermap.org/api). The free tier is sufficient for this project.

### 4. Run the development server

```bash
yarn dev
# or
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn test` | Run tests in watch mode |
| `yarn test:run` | Run tests once |
| `yarn test:coverage` | Run tests with coverage report |

---

## Project Structure

```
src/
├── components/           # Vue components
│   ├── CurrentWeather.vue
│   ├── EmptyState.vue
│   ├── ForecastDay.vue
│   ├── ForecastList.vue
│   └── SearchBar.vue
├── composables/          # Vue composables (hooks)
│   ├── useWeather.ts     # Weather state management
│   └── useWeatherTheme.ts # Dynamic theming logic
├── services/             # API services
│   └── weatherService.ts
├── utils/                # Utility functions
│   ├── dateUtils.ts      # Date formatting (date-fns)
│   └── forecastUtils.ts  # Forecast data transformation
├── constants/            # App constants
│   └── index.ts
├── types/                # TypeScript types
│   └── weather.ts
├── App.vue               # Root component
├── main.ts               # Entry point
└── style.css             # Global styles
```

---

## Tech Stack

- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Full type safety
- **Tailwind CSS v4** - Utility-first styling
- **Vite** - Fast development and build
- **date-fns** - Date formatting
- **Vitest** - Unit testing
- **@vue/test-utils** - Component testing

---

## API

This project uses the [OpenWeatherMap API](https://openweathermap.org/api):

- `/data/2.5/weather` - Current weather data
- `/data/2.5/forecast` - 5-day / 3-hour forecast

The free tier provides 1,000 API calls per day, which is sufficient for development and testing.

---

## License

MIT
