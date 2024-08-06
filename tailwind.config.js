/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Mode
        'primary-light': '#3b82f6', // blue-500
        'primary-dark': '#1d4ed8', // blue-700
        'secondary-light': '#10b981', // green-500
        'secondary-dark': '#047857', // green-700
        'background-light': '#f3f4f6', // gray-100
        'text-light': '#1f2937', // gray-800
        'border-light': '#d1d5db', // gray-300
        'success-light': '#10b981', // green-500
        'warning-light': '#f59e0b', // yellow-500
        'error-light': '#ef4444', // red-500
        'info-light': '#60a5fa', // blue-400
        'link-light': '#3b82f6', // blue-500
        'hover-link-light': '#1d4ed8', // hover:text-blue-700

        // Dark Mode
        'primary-light-dark': '#60a5fa', // blue-400
        'primary-dark-dark': '#2563eb', // blue-600
        'secondary-light-dark': '#34d399', // green-400
        'secondary-dark-dark': '#059669', // green-600
        'background-dark': '#1f2937', // gray-900
        'text-dark': '#f3f4f6', // gray-100
        'border-dark': '#374151', // gray-700
        'success-dark': '#34d399', // green-400
        'warning-dark': '#fbbf24', // yellow-400
        'error-dark': '#f87171', // red-400
        'info-dark': '#93c5fd', // blue-300
        'link-dark': '#60a5fa', // blue-400
        'hover-link-dark': '#2563eb', // hover:text-blue-600
      },
    },
  },
  plugins: [],
}

