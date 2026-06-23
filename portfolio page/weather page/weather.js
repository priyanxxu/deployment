async function getWeather() {

    const city = document.getElementById("city").value;
    const apiKey = "2282ea26589357c3136ab2df35d7ecb3";

    if (city.trim() === "") {
        alert("Please enter city name");
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod == 200) {

            document.getElementById("temp").innerText =
                Math.round(data.main.temp) + "°C";

            document.getElementById("cityName").innerText =
                data.name;

            document.getElementById("condition").innerText =
                data.weather[0].main;

            document.getElementById("humidity").innerText =
                data.main.humidity + "%";

            document.getElementById("wind").innerText =
                data.wind.speed + " km/h";

        } else {
            alert("City not found!");
        }

    } catch (error) {
        alert("Error fetching weather data!");
    }
}