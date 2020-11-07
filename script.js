$(document).ready(function() {

   // search button event
$("#searchBtn").on("click", function () {
    weather();
    save();
});

// var emptyArray = [];
// var historyArr = JSON.parse(localStorage.getItem("data"));
// if (!historyArr){
//     localStorage.setItem("data", JSON.stringify(emptyArr));
//     historyArr = emptyArr;
// } else {
//     weather ();
// }


// $(document).on("click",".list-group-item btn btn-light text-left", function(){
    $("#historyBtn").on("click", function () {
    console.log("help");
    console.log($(this).text());
    var cityInput = $("#historyBtn").val();
    weather();
})
 
    function save() {
    var newData = $("#searchBox").val();

        // if there's nothing saved then save an empty array
        if (localStorage.getItem("data") == null) {
            localStorage.setItem("data", "[]");
        }
        // get old data and add it to the new data
        var oldData = JSON.parse(localStorage.getItem("data"));
        // console.log(oldData);
        oldData.push(newData);
        localStorage.setItem("data", JSON.stringify(oldData));
        var savedData = localStorage.getItem("data");
        // console.log(savedData);

        if (savedData != null) {
            var parseData = JSON.parse(savedData);
            var history = $("#history");
            history.empty();
            for (i = 0; i < parseData.length; i++) {
                var output = $("<button>").attr("type", "button").attr("id", "historyBtn").attr("class", "list-group-item btn btn-light text-left").text(parseData[i]);
                history.append(output);
            }
        }
    }

    function weather(){ 
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
        var city = $("#cityInput").text(cityInput + " (" + date + ") ");
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
            for (i = 1; i < 6; i++) {
                var fiveDayIcon = "https://api.openweathermap.org/img/w/" + response5.daily[i].weather[0].icon + ".png";
                var card = $("<div>").attr("class", "card col bg-primary m-2 pad5");
                var cardText = $("<div>").attr("class", "card-body");
                cardText.append($("<p>").attr("class", "text-white").text(moment().add(i, "days").format("L")));
                cardText.append($("<img>").attr("src", fiveDayIcon));
                cardText.append($("<p>").attr("class", "text-white").text("Temp: " + response5.daily[i].temp.day + " F"));
                cardText.append($("<p>").attr("class", "text-white").text("Humidity: " + response5.daily[i].humidity + " %"));
                card.append(cardText);
                $("#fiveDay").append(card);
            }
        })
    })}
})

