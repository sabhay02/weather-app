function getweather() {
    const apikey = '6bf5f14f993bf68fc001daad7d931df1';
    const city = document.getElementById('city').value.trim();

    if (!city) {
        alert("Please enter a city");
        return;
    }

    const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

    fetch(weatherurl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Fetching error:', error);
            alert('Please try again');
        });

    fetch(forecasturl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Fetching error:', error);
            alert('Please try again');
        });
}

function displayWeather(data) {
    const tempDiv = document.getElementById('temp-div');
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourly = document.getElementById('hourly-forecast');

    weatherInfo.innerHTML = '';
    tempDiv.innerHTML = '';
    hourly.innerHTML = '';

    if (data.cod === '404') {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
        const name = data.name;
        const temp = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
        const descrip = data.weather[0].description;
        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

        const tempHtml = `<p>${name}: ${temp}°C</p>`;
        const weatherHtml = `
            <p>${descrip}</p>
        `;
        
        tempDiv.innerHTML = tempHtml;
        weatherInfo.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = descrip;
        weatherIcon.style.display = 'block';
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyDiv = document.getElementById('hourly-forecast');
    const next24 = hourlyData.slice(0, 8); 

    hourlyDiv.innerHTML = ''; 

    next24.forEach(item => {
        const date = new Date(item.dt * 1000);
        const hours = date.getHours();
        const temp = Math.round(item.main.temp - 273.15);
        const icon = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hours}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temp}°C</span>
            </div>
        `;
        hourlyDiv.innerHTML += hourlyItemHtml;
    });
}
