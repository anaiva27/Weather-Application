# Weather-Application

## Description 

The application needs to be created to check the weather information all around the world, such as temperature, humidity, UV index and same parameters for the next five days. The application has to save the search history and present the last requested city's weather.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Links](#links)
* [Credits](#credits)

## Installation

To complete this task we went to the openweathermap.org and requested an API key to use it to get the daily weather and a 5-day forecast. Using the key and the documentation on creating custom URLs and using the `jQuery ajax()` method, we were able to make a several API calls to get the required information. <br>
Also various libraries were installed, such as jQuery, Moment.js and Bootstrap to ensure the best functionality and implementation of the appropriate styles. Google Chrome Dev Tools were used to test the application and to make sure that everything is working properly. The file structure contains index, style and script files, written in HTML, CSS and JavaScript languages and with the description comments. 

## Usage

When the user launches the application, he is presented with an input field and a search button to find the weather for the city of his choice. Then the screen is populated with the temperature, humidity, wind strength and the UV index section, containing the colors green, yellow, orange and red, specifying the severity of the condition. And there's also an icon, representing the current weather (cloudy, rainy or sunny).
Down below, there's a container with a 5 day forecast for this city, also containing the same parameters. 
<br>
The searched city is added to the local storage, thus when the user will reopen the browser window, he will be presented with the today's forecast and the forecast for the next 5 days. Beside's that, every city the user has searched for will be presented to him on the screen in the list, underneath the search field.
<br><br>
Attached below the screenshots of the applicaton:<br>

![User's interface](Screenshot.png)

<br>

## Links

[Day Planner App](https://anaiva27.github.io/Weather-Application/) <br>
[GitHub repository](https://github.com/anaiva27/Weather-Application)<br>
Libraries:<br>
[jQuery](https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js) <br>
[Moment.js](https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js) <br>

## Credits

Useful articles about Javascript functions, statements and loops, local storage:<br>
[jQuery API](https://api.jquery.com/) <br>
[Moment.js tutorial](https://www.sitepoint.com/managing-dates-times-using-moment-js/) <br>
