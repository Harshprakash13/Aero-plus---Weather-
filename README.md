# AeroPlus - Weather App

A responsive, visually appealing weather application that provides real-time weather information for cities around the world. Built with HTML, CSS, and JavaScript, this app features dynamic background videos that change based on weather conditions and a clean, modern user interface.

## Features

- **Real-time Weather Data**: Get current weather information including temperature, wind speed, and humidity
- **Dynamic Backgrounds**: Background videos change based on weather conditions (sunny, cloudy, rainy, foggy, snowy)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dual Search Options**: Search for cities using either the top navigation bar or the card-based search
- **Theme Toggle**: Switch between light and dark modes
- **Weather Condition Icons**: Visual representation of current weather conditions

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Styling with modern features like Flexbox and Grid
- **JavaScript**: Asynchronous API calls and DOM manipulation
- **WeatherAPI**: Real-time weather data service
- **Video Backgrounds**: Dynamic video backgrounds based on weather conditions

## Project Structure

```
weather-app/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # JavaScript functionality
├── fevicon/
│   └── storm.png       # Website favicon
├── Img/
│   └── logo.png        # Application logo
└── Video/              # Background videos for different weather conditions
    ├── Cloud.mp4
    ├── Fogg.mp4
    ├── Rain.mp4
    ├── snow.mp4
    └── Sunny.mp4
```

## How It Works

1. **Search for a City**: Enter a city name in either search field (top navigation or card-based search)
2. **Get Weather Data**: The app fetches real-time weather information from WeatherAPI
3. **Dynamic UI Updates**: 
   - Weather information is displayed in card-based layout
   - Background video changes based on weather conditions
   - Weather condition icon is displayed
4. **Responsive Design**: Layout automatically adjusts for different screen sizes

## Key Components

### Navigation Bar
- Brand logo and name (AeroPlus)
- City search input with search button
- Theme toggle button (sun/moon icon)

### Weather Cards
- **Search Card**: Secondary search option
- **City Card**: Displays city name and country
- **Condition Card**: Shows weather condition with icon
- **Temperature Card**: Displays current temperature
- **Wind Card**: Shows wind speed
- **Humidity Card**: Displays humidity percentage

### Footer
- Copyright information
- Data attribution to WeatherAPI

## API Integration

This app uses the [WeatherAPI](https://www.weatherapi.com/) service to fetch real-time weather data. The API provides:
- Current weather conditions
- Temperature in Celsius
- Wind speed in kilometers per hour
- Humidity percentage
- Weather condition icons and descriptions

## Responsive Design

The app features a fully responsive design that adapts to different screen sizes:
- **Desktop**: Multi-column card layout with spacious elements
- **Tablet**: Adjusted spacing and sizing for medium screens
- **Mobile**: Single-column layout with optimized touch targets

## Customization

To customize this app:
1. Replace the API key in `script.js` with your own WeatherAPI key
2. Modify color schemes in `style.css` (CSS variables)
3. Add or replace video backgrounds in the `Video/` directory
4. Update the logo in the `Img/` directory

## Setup Instructions

1. Clone or download the repository
2. Replace the API key in `script.js` with your own WeatherAPI key:
   ```javascript
   const API_KEY = 'your_api_key_here';
   ```
3. Open `index.html` in a web browser
4. Start searching for cities to see weather information

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript to be enabled
- Supports modern CSS features (Flexbox, Grid)

## Development Notes

- The app uses localStorage to remember theme preference
- Background videos are muted and set to loop for better user experience
- Error handling for API requests and network issues
- Debug logs are included in the JavaScript for development purposes

## Future Enhancements

- 5-day weather forecast
- Location detection using geolocation API
- Additional weather metrics (UV index, visibility, etc.)
- Favorite cities feature
- Weather alerts and notifications

## Credits

- Weather data provided by [WeatherAPI](https://www.weatherapi.com/)
- Background videos sourced from various creators
- Icons from standard SVG libraries

## License

This project is open source and available under the [MIT License](LICENSE).
