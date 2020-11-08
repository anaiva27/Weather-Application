$(document).ready(function() {

   // search button event
$("#searchBtn").on("click", function () {
    var newData = $("#searchBox").val();
    weather(newData);
    save(newData);
});
// history button event
$("#history").on("click",".historyBtn", function(event) {
    var cityInput = $(event.target).text();
    weather(cityInput);
    //save(newData);
});

//get the last item in array and run weather
var lastCityInput = JSON.parse(localStorage.getItem("data"));
var lastCity = (lastCityInput[lastCityInput.length-1]);
weather(lastCity);

    // save search history to local storage
    function save(newData) {
        if (localStorage.getItem("data") == null) {
            localStorage.setItem("data", "[]");
        }
        // get old data and add it to the new data
        var oldData = JSON.parse(localStorage.getItem("data"));
        oldData.push(newData);
        localStorage.setItem("data", JSON.stringify(oldData));
        var savedData = localStorage.getItem("data");
        // bring  data back on the screen
        if (savedData != null) {
            var parseData = JSON.parse(savedData);
            var history = $("#history");
            history.empty();
            for (i = 0; i < parseData.length; i++) {
                var output = $("<button>").attr("type", "button").attr("class", "historyBtn list-group-item text-left").text(parseData[i]);
                history.append(output);
            }
        }
    }

    // weather forecast function
    function weather(cityInput){ 
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityInput + "&units=imperial&APPID=7455a546f39f9c232db77780672611f7";
    var date = moment().format("MM/DD/YYYY");
    // today's weather call
    $.ajax({
        url: currentWeather,
        method: "GET",
    }).then(function (response) {
        $("#currentTemp").text("Temperture: " + response.main.temp + " F");
        $("#currentHumidity").text("Humidity: " + response.main.humidity + " %");
        $("#currentWind").text("Wind: " + response.wind.speed + " mph");
        // add weather icon for today's weather
        var imgIcon = "https://api.openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        var todayIcon = $("<img>").attr("src", imgIcon);
        var city = $("#cityInput").text(cityInput + " (" + date + ") ");
        city.append(todayIcon);
        // get latitude and longitude to make a call to get UV index
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=7455a546f39f9c232db77780672611f7";
        $.ajax({
            url: uvUrl,
            method: "GET",
        }).then(function (responseUV) {
            // add UV color classes to indicate weather condition
            if (responseUV.value <= 2) {
                $("#uv").text(responseUV.value).addClass("green");
            } else if (responseUV.value <= 5) {
                $("#uv").text(responseUV.value).addClass("yellow");
            } else if (responseUV.value <= 7) {
                $("#uv").text(responseUV.value).addClass("orange");
            } else {
                $("#uv").text(responseUV.value).addClass("red");
            }
        })

        // five day forecast
        var fivedayWeather =
            "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude +
            "&exclude=hourly,minutely&units=imperial&appid=7455a546f39f9c232db77780672611f7";
        $.ajax({
            url: fivedayWeather,
            method: "GET",
        }).then(function (response5) {
            $("#fiveDay").empty();
            // loop through daily weather array, pick days from 2nd to 6th, add info and append to the card
            for (i = 1; i < 6; i++) {
                    // dinamically create div elements inside the card
                    var card = $("<div>").attr("class", "card col bg-primary m-2 pad5");
                    var cardText = $("<div>").attr("class", "card-body");
                    var fiveDayIcon = "https://api.openweathermap.org/img/w/" + response5.daily[i].weather[0].icon + ".png";
                    var fiveDate = ($("<p>").attr("class", "text-white").text(moment().add(i, "days").format("L")));
                    var fiveTemp = ($("<p>").attr("class", "text-white").text("Temp: " + response5.daily[i].temp.day + " F"));
                    var fiveHumid = ($("<p>").attr("class", "text-white").text("Humidity: " + response5.daily[i].humidity + " %"));
                    cardText.append(fiveDate).append($("<img>").attr("src", fiveDayIcon)).append(fiveTemp).append(fiveHumid);;
                    card.append(cardText);
                    $("#fiveDay").append(card);
            }
        })
    })}
})

