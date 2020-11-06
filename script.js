// $(document).ready(function() {
    // search button event
    $("#searchBtn").on("click", function () {
    var cityInput = $("#searchBox").val();
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityInput + "&units=imperial&APPID=7455a546f39f9c232db77780672611f7";
    var date = moment().format("MM/DD/YYYY");
    // today weather call
    $.ajax({
        url: currentWeather,
        method: "GET",
    }).then(function (response) {
        // console.log(response);
        var imgIcon = "https://api.openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        var todayIcon = $("<img>").attr("src", imgIcon);
        var city = $("#cityInput").text(cityInput+" ("+date+") ");
        city.append(todayIcon);
        $("#currentTemp").text("Temperture: " + response.main.temp + " F");
        $("#currentHumidity").text("Humidity: " + response.main.humidity + " %");
        $("#currentWind").text("Wind: " + response.wind.speed + " mph");
        // lat, lon, uv call
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=7455a546f39f9c232db77780672611f7";
        $.ajax({
            url: uvUrl,
            method: "GET",
        }).then(function (responseUV) {
            if (responseUV.value <= 2) {
                $("#uv").text("UV index: "+responseUV.value).addClass("green");
            } else if (responseUV.value <= 5) {
                $("#uv").text("UV index: "+responseUV.value).addClass("yellow");
            } else if (responseUV.value <= 7) {
                $("#uv").text("UV index: "+responseUV.value).addClass("orange");
            } else {
                $("#uv").text("UV index: "+responseUV.value).addClass("red");
            }
        })

        // five day forecast
        var fivedayWeather =
        "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+
        "&exclude=hourly,minutely&units=imperial&appid=7455a546f39f9c232db77780672611f7";
        $.ajax({
            url: fivedayWeather,
            method: "GET",
        }).then(function (response5) {
            console.log(response5);
            for (i=1;i<6;i++){
            var fiveDayIcon = "https://api.openweathermap.org/img/w/"+response5.daily[i].weather[0].icon+".png";
            var divCard = $("<div>").attr("class", "card col bg-primary m-2");
            var divCardBody = $("<div>").attr("class", "card-body");
            divCardBody.append(moment().add(i, "days").format("L"));
            divCardBody.append($("<img>").attr("src", fiveDayIcon));
            divCardBody.append($("<p>").attr("class", "text-white").text("Temp: "+response5.daily[i].temp.day+" F"));
            divCardBody.append($("<p>").attr("class", "text-white").text("Humidity: "+response5.daily[i].humidity+" %"));
            divCard.append(divCardBody);
            $("#fiveDay").append(divCard);

        
        }
        })
    })
})
