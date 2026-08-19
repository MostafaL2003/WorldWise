# WorldWise

WorldWise is an interactive web application designed to track user travels, visited cities, and location notes using dynamic geolocation, custom map routing, and local persistent state.

## Core Features
- **Interactive Map Interface:** Uses Leaflet and React Leaflet to handle map navigation, geolocation clicks, and dynamic pin placements.
- **URL-Based State Management:** Utilizes React Router URL parameters and query strings to synchronize UI components with active map coordinates.
- **City & Country Tracking:** Offers real-time search, country flag rendering, and custom notes logging for selected destinations.
- **Global Context Architecture:** Manages application-wide data and user notes via React Context API to maintain centralized state.

## Tech Stack
- **Framework:** React.js (Vite)
- **Routing:** React Router v6
- **Styling:** CSS Modules
- **Mapping:** Leaflet / React Leaflet API
- **Data Persistence:** JSON Server / Local Storage
