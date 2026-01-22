class WeatherDashboard {
    constructor() {
        this.menuOptions = ["Display Weather", "Display Forecast", "Exit"];
    }

    displayMenu() {
        console.log("Weather Dashboard Menu:");
        this.menuOptions.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
        });
    }

    displayWeather(weatherData) {
        console.log("Current Weather:");
        console.log(`Temperature: ${weatherData.temperature}°C`);
        console.log(`Condition: ${weatherData.condition}`);
    }

    displayForecast(forecastData) {
        console.log("Weather Forecast:");
        forecastData.forEach((day) => {
            console.log(`Date: ${day.date}, Forecast: ${day.forecast}`);
        });
    }

    handleUserInput(input) {
        switch (input) {
            case '1':
                // Call displayWeather method
                break;
            case '2':
                // Call displayForecast method
                break;
            case '3':
                console.log("Exiting...");
                break;
            default:
                console.log("Invalid option. Please try again.");
        }
    }
}

// Example usage:
const dashboard = new WeatherDashboard();
dashboard.displayMenu();