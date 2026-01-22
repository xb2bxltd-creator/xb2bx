const axios = require('axios');
class WeatherService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.openweathermap.org/data/2.5';
        this.units = 'metric';
    }
    async getCurrentWeather(city) {
        try {
            const response = await axios.get(`${this.baseURL}/weather`, {
                params: {
                    q: city,
                    appid: this.apiKey,
                    units: this.units,
                },
            });
            return {
                success: true,
                data: this.formatWeatherData(response.data),
            };
        } catch (error) {
            return this.handleError(error, `Failed to fetch weather for ${city}`);
        }
    }
    async getWeatherByCoordinates(lat, lon) {
        try {
            const response = await axios.get(`${this.baseURL}/weather`, {
                params: {
                    lat,
                    lon,
                    appid: this.apiKey,
                    units: this.units,
                },
            });
            return {
                success: true,
                data: this.formatWeatherData(response.data),
            };
        } catch (error) {
            return this.handleError(error, 'Failed to fetch weather by coordinates');
        }
    }
    async getForecast(city) {
        try {
            const response = await axios.get(`${this.baseURL}/forecast`, {
                params: {
                    q: city,
                    appid: this.apiKey,
                    units: this.units,
                },
            });
            const forecastData = response.data.list
                .filter((_, index) => index % 8 === 0)
                .map((item) => ({
                    date: new Date(item.dt * 1000).toLocaleDateString(),
                    temp: item.main.temp,
                    feelsLike: item.main.feels_like,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon,
                    humidity: item.main.humidity,
                    windSpeed: item.wind.speed,
                    pressure: item.main.pressure,
                }));
            return {
                success: true,
                city: response.data.city.name,
                country: response.data.city.country,
                forecast: forecastData,
            };
        } catch (error) {
            return this.handleError(error, `Failed to fetch forecast for ${city}`);
        }
    }
    formatWeatherData(data) {
        return {
            city: data.name,
            country: data.sys.country,
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            windDegree: data.wind.deg,
            pressure: data.main.pressure,
            cloudiness: data.clouds.all,
            sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
            visibility: data.visibility,
            uvIndex: data.uvi || 'N/A',
            timezone: data.timezone,
        };
    }
    handleError(error, message) {
        if (error.response) {
            if (error.response.status === 404) {
                return { success: false, error: 'City not found' };
            }
            if (error.response.status === 401) {
                return { success: false, error: 'Invalid API key' };
            }
        }
        console.error(message, error.message);
        return { success: false, error: message };
    }
}
module.exports = WeatherService;