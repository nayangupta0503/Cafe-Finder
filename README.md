# Cafe Finder

An interactive, responsive web application for finding cafes, powered by React, Tailwind CSS, and OpenStreetMap.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

-   **Interactive Map**: Explore cafes on a dynamic map powered by [OpenStreetMap](https://www.openstreetmap.org/) and `react-leaflet`.
-   **Real-time Data**: Fetches live cafe data using the [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API).
-   **Geolocation**: "Locate Me" button to find cafes near your current position.
-   **Search & Filter**: Find cafes by name, location, or minimum rating.
-   **Responsive Design**: optimized for mobile (map at top) and desktop (split view).
-   **Smooth UI**: Transitions and animations using `framer-motion`.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite)
-   **Styling**: Tailwind CSS
-   **Maps**: React Leaflet, Leaflet
-   **Icons**: Lucide React
-   **Animations**: Framer Motion
-   **Routing**: React Router DOM

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/cafe-finder.git
    cd cafe-finder
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173`.

## 📖 Usage

1.  **Allow Location Access**: When prompted, allow the browser to access your location to see cafes around you instantly.
2.  **Explore**: Drag the map or use the search bar to find cafes in other areas (search by city name or cafe name).
3.  **Filter**: Use the rating dropdown to filter for top-rated spots.
4.  **View Details**: Click on a cafe card or map marker to see more details.

## 📦 Deployment

### Vercel (Recommended)

This project is optimized for deployment on Vercel.

1.  Push your code to a GitHub repository.
2.  Import the repository into Vercel.
3.  Vercel will automatically detect the Vite settings.
4.  Deploy!

Alternatively, deploy directly from the CLI:
```bash
npm install -g vercel
vercel
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Data © OpenStreetMap contributors.*
