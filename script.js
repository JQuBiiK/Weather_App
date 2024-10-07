'use strict';

const APIKey = '4978e665f6845560c4639923ad015300',
      searchContainer = document.querySelector('.search_container'),
      searchBtn = document.querySelector('.search_btn'),
      weatherContainer = document.querySelector('.weather_container'),
      weatherDetails = document.querySelector('.weather_details'),
      notFound = document.querySelector('.not_found'),
      searchInput = document.querySelector('.search_input');

function updateWeatherInfo() {
    const city = document.querySelector('.search_input').value;

    if (city == '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=ru`)
    .then(response => response.json())
    .then(json => {

        if (json.cod == '404') {
            searchContainer.style.height = '410px';
            weatherContainer.classList.remove('active');
            weatherDetails.classList.remove('active');
            notFound.classList.add('active');
            return 0;
        } else {
            searchContainer.style.height = '555px';
            weatherContainer.classList.add('active');
            weatherDetails.classList.add('active');
            notFound.classList.remove('active');
        }

        const image = document.querySelector('.weather_img'),
              temperature = document.querySelector('.temperature'),
              description = document.querySelector('.description'),
              humidity = document.querySelector('.humidity span'),
              wind = document.querySelector('.wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;

            case 'Rain':
                image.src = 'images/rain.png';
                break;

            case 'Snow':
                image.src = 'images/snow.png';
                break;

            case 'Clouds':
                image.src = 'images/cloud.png';
                break;

            case 'Mist':
                image.src = 'images/mist.png';
                break;

            case 'Haze':
                image.src = 'images/mist.png';
                break;

            default:
                image.src = 'images/cloud.png';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} км/ч`;
    });
}

searchBtn.addEventListener('click', () => updateWeatherInfo());

searchInput.addEventListener('keydown', (e) => {
    if (e.code === "Enter") { 
        updateWeatherInfo();
    }
});
