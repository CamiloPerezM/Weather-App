const container = document.querySelector('.container')
const search = document.querySelector('.search_box button')
const weatherBox = document.querySelector('.weather_box')
const weatherInfo = document.querySelector('.weather_info')
const error404 = document.querySelector('.not_found')

search.addEventListener('click', () => {
    
    const APIKey = '6ca6d324c5af27375f53a90f96fe89a6'
    const city = document.querySelector('.search_box input').value

    if (city === '') 
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            
            if(json.cod === '404'){
                container.style.height = '400px'
                weatherBox.style.display = 'none'
                weatherInfo.style.display = 'none'
                error404.style.display = 'block'
                error404.classList.add('fadeIn')
                return;
            }

            error404.style.display = 'none'
            error404.classList.remove('fadeIn')

            const image = document.querySelector('.weather_box img')
            const temperature = document.querySelector('.weather_box .temperature')
            const description = document.querySelector('.weather_box .description')
            const humidity = document.querySelector('.weather_info .humidity span')
            const wind = document.querySelector('.weather_info .wind span')

            switch (json.weather[0].main){
                case 'Clear' :
                    image.src = 'assets/img/Clear.png'
                    break;

                case 'Rain' :
                    image.src = 'assets/img/Rain.png'
                    break;

                case 'Snow' :
                    image.src = 'assets/img/Snow.png'
                    break;
                
                case 'Clouds' :
                    image.src = 'assets/img/Clouds.png'
                    break;
                
                case 'Haze' :
                    image.src = 'assets/img/Haze.png'
                    break;

                default :
                    image.src = ''       
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = ''
            weatherInfo.style.display = ''
            weatherBox.classList.add('fadeIn')
            weatherInfo.classList.add('fadeIn')
            container.style.height = '590px'

            

    })
})