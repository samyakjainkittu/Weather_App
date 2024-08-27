const apikey = "94b21518ad4ce14468919e7bbe358bc1";

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;

            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=${apikey}`;
            console.log(url);


            fetch(url).then(res => {
                return res.json()
            }).then((data) => {
                console.log(data);
                weatherReport(data);

            })

        })

    }
})


document.getElementById('search').addEventListener('click', () => {

    var place = document.getElementById('input').value;
    if(place!=""){
        console.log(place);
        var urlsearch = `http://api.openweathermap.org/data/2.5/weather?q=${place}&` + `appid=${apikey}`;
        console.log(urlsearch);
    
        fetch(urlsearch).then(res => {
            return res.json()
        }).then((data) => {
            console.log(data);
            weatherReport(data);
    
        })

    }
})


document.getElementById("input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById('search').click();
        

    }
});





function weatherReport(data) {
    var urlcast = `http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` + `appid=${apikey}`;

    fetch(urlcast).then(res => {
        return res.json()
    }).then((forecast) => {
        console.log(forecast);
        hourForecast(forecast);
        dayForecast(forecast);

        document.getElementById('city').innerText = data.name + ', ' + data.sys.country;
        console.log(data.name, data.sys.country);

        console.log(Math.floor(data.main.temp - 273));
        document.getElementById('temperature').innerText = Math.floor(data.main.temp - 273) + ' °C';

        console.log(Math.floor(data.main.feels_like - 273));
        document.getElementById('feel').innerText = 'Feels like : ' + Math.floor(data.main.feels_like - 273) + ' °C';

        console.log(data.weather[0].description)
        document.getElementById('clouds').innerText = data.weather[0].description;

        let icon = data.weather[0].icon;
        let iconurl = "http://api.openweathermap.org/img/w/" + icon + ".png";
        console.log(iconurl);
        let myimg = document.getElementById('img');
        myimg.src = iconurl;

        console.log(Math.ceil(data.wind.speed));
        document.getElementById('sp').innerText = Math.ceil(data.wind.speed) + ' km/h'

        console.log(data.main.humidity);
        document.getElementById('hm').innerText = data.main.humidity + ' %';
        console.log(data.main.pressure);
        document.getElementById('pr').innerText = data.main.pressure + ' mBar';

    })
}

function hourForecast(forecast) {
    document.querySelector('.templist').innerHTML = '';
    for (let i = 0; i < 5; i++) {
        var date = new Date(forecast.list[i].dt * 1000);

        let hourR = document.createElement('div');
        hourR.setAttribute('class', 'next');


        let div = document.createElement('div');
        let time = document.createElement('p');
        time.setAttribute('class', 'time');
        time.innerText = (date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace(':00', '');


        let temp = document.createElement('p');
        temp.innerText = Math.floor((forecast.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';




        div.appendChild(time);
        div.appendChild(temp);



        let desc = document.createElement('p');
        time.setAttribute('class', 'desc');
        desc.innerText = forecast.list[i].weather[0].description;


        hourR.appendChild(div);
        hourR.appendChild(desc);
        document.querySelector('.templist').appendChild(hourR);



        // console.log(hourR);

    }

}


function dayForecast(forecast) {

    document.querySelector('.weekF').innerHTML = '';

    for (let i = 8; i < forecast.list.length; i += 8) {

        console.log(forecast.list[i]);


        let div = document.createElement('div');
        div.setAttribute('class', 'dayF');

        let day = document.createElement('p');
        day.setAttribute('class', 'date');
        day.innerText = new Date(forecast.list[i].dt * 1000).toDateString(undefined, 'Asia/Kolkata');
        div.appendChild(day);



        let temp = document.createElement('p');
        temp.innerText = Math.floor((forecast.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';
        div.appendChild(temp);


        let description = document.createElement('p');
        description.setAttribute('class', 'desc')
        description.innerText = forecast.list[i].weather[0].description;
        div.appendChild(description);


        document.querySelector('.weekF').appendChild(div);



    }



}