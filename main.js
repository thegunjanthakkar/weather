    document.addEventListener("DOMContentLoaded", function () {
    const citySelect = document.getElementById("inputGroupSelect04");
    const cardContainer = document.querySelector(".card-container");
    var divContainer = document.querySelector(".top");
    const weatherImages = {
        "mcloudyday":"images/mcloudy.png",
        "mcloudynight":"images/mcloudy.png",
        "cloudyday":"images/cloudy.png",
        "cloudynight":"images/cloudy.png",
        "ishowerday":"images/ishower.png",
        "ishowernight":"images/ishower.png",
        "lightrainnight":"images/lightrain.png",
        "lightrainday":"images/lightrain.png",
        "clearday":"images/clear.png",
        "clearnight":"images/clear.png",
        "pcloudyday":"images/pcloudy.png",
        "pcloudynight":"images/pcloudy.png",
        "oshowerday":"images/oshower.png",
        "oshowernight":"images/oshower.png",
        "lightsnowday":"images/lightsnow.png",
        "lightsnownight":"images/lightsnow.png",
        "rainday":"images/rain.png",
        "rainnight":"images/rain.png",
        "rainsnowday":"images/rainsnow.png",
        "rainsnownight":"images/rainsnow.png",
        "snowday":"images/snow.png",
        "snownight":"images/snow.png",
        "tsday":"images/tsrain.png",
        "tsnight":"images/tsrain.png",
        "tsday":"images/tstorm.png",
        "tsnight":"images/tstorm.png",
        "humidday":"images/humid.png",
        "humidnight":"images/humid.png",
        "windy":"images/windy.png",
        "windyday":"images/windy.png",
        "windynight":"images/windy.png",
        "foggy":"images/fog.png",
        "foggyday":"images/fog.png",
        "foggynight":"images/fog.png",
        "fogy":"images/fog.png",
        "fogyday":"images/fog.png",
        "fogynight":"images/fog.png"
    };

    citySelect.addEventListener("change", function () {
        const selectedValue = citySelect.value;
        if (selectedValue) {
            const [latitude, longitude] = selectedValue.split(",");
            const apiUrl = `https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civil&output=json`;
            console.log(apiUrl);

            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const forecasts = data.dataseries;
                
                cardContainer.innerHTML = "";
                divContainer.style.padding = "3%";
                
                let dateString = data.init;
                let day = dateString.substring(6, 8);
                    forecasts.slice(0, 7).forEach((weatherData, index) => {
                const temperature = weatherData.temp2m;
                const weatherDescription = weatherData.weather;
                const weatherImgData = weatherData.weather;
                const year = dateString.substring(0, 4);
                
                const month = dateString.substring(4, 6);
                const date = new Date(year, month - 1, day);
                const dayName = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
                const formattedDate = date.toLocaleString("en-US", {
                  dayOfWeek: "short",
                  month: "short",
                });
                const finalDate = dayName + " " + day + " " + formattedDate;

                const card = document.createElement("div");
                card.className = "card";
                card.style = "width: 18rem;";
                const weatherImageSrc = weatherImages[weatherImgData.toLowerCase()] || "images/default.jpg";
                card.innerHTML = `
                <p class="card-text dateText">${finalDate}</p>
                <img src="${weatherImageSrc}" class="card-img-top" alt="Weather Image">
                <div class="card-body">
                <p class="card-text">Temperature: ${temperature}°C</p>
                <p class="card-text">Weather: ${weatherDescription}</p>
                    </div>
                    `;
                    cardContainer.appendChild(card);
                    day = parseInt(day);
                    day++;
                });
            })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            cardContainer.innerHTML = "<p class='err'>Error fetching weather data.</p>";
        });
        } else {
            weatherReport.innerHTML = "";
        }
    });
});