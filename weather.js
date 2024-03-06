const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {

      
        getWeather(city);
        cityInput.value = '';
    } else {
    
        alert('Please enter a city name.');
    }
});

async function getWeather(city) {
    const apiKey = 'fc32773e6baec48862aae07baf311803'; // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === 200) {
            const weather = data.weather[0];
            const main = data.main;
            const cityName = data.name;
            const country = data.sys.country;

            const weatherHtml = `
                <h2>${cityName}, ${country}</h2>
                <div><strong>Weather:</strong> ${weather.main}</div>
                <div><strong>Description:</strong> ${weather.description}</div>
                <div><strong>Temperature:</strong> ${main.temp} °C</div>
                <div><strong>Feels like:</strong> ${main.feels_like} °C</div>
                <div><strong>Humidity:</strong> ${main.humidity}%</div>
                <div><strong>Pressure:</strong> ${main.pressure} hPa</div>
            `;
            weatherInfo.innerHTML = weatherHtml;
        } else {
            weatherInfo.innerHTML = `<p>City not found</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = `<p>Failed to fetch weather data</p>`;
    }
}
