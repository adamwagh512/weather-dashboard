var apiKey = "6692802445dbaaea43e5918963dbc940";
var bigCity = document.getElementById("cityName");
//declaring temp variables
var tempNow = document.getElementById("temp");
var temp1 = document.getElementById("t1");
var temp2 = document.getElementById("t2");
var temp3 = document.getElementById("t3");
var temp4 = document.getElementById("t4");
var temp5 = document.getElementById("t5");
//declaring wind variables
var windNow = document.getElementById("wind");
var wind1 = document.getElementById("w1");
var wind2 = document.getElementById("w2");
var wind3 = document.getElementById("w3");
var wind4 = document.getElementById("w4");
var wind5 = document.getElementById("w5");

//declaring humidity variables
var humidityNow = document.getElementById("humidity");
var hum1 = document.getElementById("h1");
var hum2 = document.getElementById("h2");
var hum3 = document.getElementById("h3");
var hum4 = document.getElementById("h4");
var hum5 = document.getElementById("h5");
// UV for today only
var uvNow = document.getElementById("uv");
// declaring icon variables
var iconNow = document.getElementById("icon");
var icon1 = document.getElementById("i1");
var icon2 = document.getElementById("i2");
var icon3 = document.getElementById("i3");
var icon4 = document.getElementById("i4");
var icon5 = document.getElementById("i5");
// declaring date variables
var dateNow = document.getElementById("todayDate");
var date1 = document.getElementById("dateday1");
var date2 = document.getElementById("dateday2");
var date3 = document.getElementById("dateday3");
var date4 = document.getElementById("dateday4");
var date5 = document.getElementById("dateday5");
//Creates an empty JavaScript Array
var recentSearches = [];
// ===============================================================
// This section of code deals with dates
dateNow.textContent = moment().format("MMM Do YYYY");
date1.textContent = moment().add(1, "days").format("MMM Do");
date2.textContent = moment().add(2, "days").format("MMM Do");
date3.textContent = moment().add(3, "days").format("MMM Do");
date4.textContent = moment().add(4, "days").format("MMM Do");
date5.textContent = moment().add(5, "days").format("MMM Do");
// ================================================================
//This function loads recent searches from local storage when page is loaded
function loadRecentSearches() {
  // parses the stringified data back into an array
  var storedSearches = JSON.parse(localStorage.getItem("recentSearches"));
  // Console log for testing purposes
  console.log(storedSearches);
  // For each item in the array,
  for (i = 0; i < storedSearches.length; i++) {
    // A new button is revealed
    var button = $(`#rs${i + 1}`);
    button.show();
    // The button displays the search term
    button.text(storedSearches[i]);
    //on click calls a function defined below, figured we would need it later
    button.on("click", onclickhandler);
  }
}

//this function is called every time the submit button is clicked.
function searchFunction(data) {
  // pushes eaten value into an empty array
  recentSearches.unshift($("#city").val());

  // If there are more than 4 recent searches, the oldest one is removed from the array
  if (recentSearches.length > 4) {
    recentSearches.pop();
  }
  //Converts recentSearches array into something that can be stored in local storage.
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
}

//This function was made to try to make it easier to wire everything up later
function onclickhandler(event) {
  // console log for testing purposes
  console.log(event.target);
}

// Sets buttons display to a default of hide
$("#buttonsContainer").children().hide();

// Once the submit button is clicked, take the input from textbox and save it to local storage. The functions on the end will help populate the recent searches bar and clear the text from the search bar.
$("#submitBtn").on("click", async function () {
  console.log("bit");
  var typed = $("#city").val();
  localStorage.setItem("searchValue", typed);
  // Console log for testing purposes
  console.log(typed);
  bigCity.textContent = `${typed}`;
  // calls searchFunction from above
  searchFunction();
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${typed.replace(
        " ",
        "%20"
      )}&appid=${apiKey}&units=imperial`
    );
    const data = await response.json();
    console.log(data.city.coord);
    const { lat, lon } = data.city.coord;
    console.log(lat);
    const response2 = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial`
    );
    const data2 = await response2.json();
    // populate temp fields
    var currentTemp = `${data2.current.temp}`;
    tempNow.textContent = `Current Temperature: ${currentTemp}F`;

    temp1.textContent = `Temp High: ${data2.daily[1].temp.max}F / Temp Low ${data2.daily[1].temp.min}F`;

    temp2.textContent = `Temp High: ${data2.daily[2].temp.max}F / Temp Low ${data2.daily[2].temp.min}F`;

    temp3.textContent = `Temp High: ${data2.daily[3].temp.max}F / Temp Low ${data2.daily[3].temp.min}F`;

    temp4.textContent = `Temp High: ${data2.daily[4].temp.max}F / Temp Low ${data2.daily[4].temp.min}F`;

    temp5.textContent = `Temp High: ${data2.daily[5].temp.max}F / Temp Low ${data2.daily[5].temp.min}F`;

    //Populate wind fields
    windNow.textContent = `Current Wind: ${data2.current.wind_speed} mph`;
    wind1.textContent = `Wind Speed: ${data2.daily[1].wind_speed} mph`;
    wind2.textContent = `Wind Speed: ${data2.daily[2].wind_speed} mph`;
    wind3.textContent = `Wind Speed: ${data2.daily[3].wind_speed} mph`;
    wind4.textContent = `Wind Speed: ${data2.daily[4].wind_speed} mph`;
    wind5.textContent = `Wind Speed: ${data2.daily[5].wind_speed} mph`;

    //  populate humidity fields
    console.log(`current humidity: ${data2.current.humidity} %`);
    humidityNow.textContent = `Current Humidity: ${data2.current.humidity}%`;
    hum1.textContent = `Humidity: ${data2.daily[1].humidity}%`;
    hum2.textContent = `Humidity: ${data2.daily[2].humidity}%`;
    hum3.textContent = `Humidity: ${data2.daily[3].humidity}%`;
    hum4.textContent = `Humidity: ${data2.daily[4].humidity}%`;
    hum5.textContent = `Humidity: ${data2.daily[5].humidity}%`;
    //UVI for today only
    uvNow.textContent = `current UV Index: ${data2.current.uvi}`;
    //Populates icons
    var iconHolder = `${data2.current.weather[0].icon}`;
    iconNow.src = `http://openweathermap.org/img/wn/${iconHolder}@2x.png`;

    var iconholder1 = `${data2.daily[1].weather[0].icon}`;
    icon1.src = `http://openweathermap.org/img/wn/${iconholder1}@2x.png`;

    var iconholder2 = `${data2.daily[2].weather[0].icon}`;
    icon2.src = `http://openweathermap.org/img/wn/${iconholder2}@2x.png`;

    var iconholder3 = `${data2.daily[3].weather[0].icon}`;
    icon3.src = `http://openweathermap.org/img/wn/${iconholder3}@2x.png`;

    var iconholder4 = `${data2.daily[4].weather[0].icon}`;
    icon4.src = `http://openweathermap.org/img/wn/${iconholder4}@2x.png`;

    var iconholder5 = `${data2.daily[5].weather[0].icon}`;
    icon5.src = `http://openweathermap.org/img/wn/${iconholder5}@2x.png`;
  } catch (err) {
    console.error(err);
  }

  //clears the text from the search bar
  $("#city").val("");
  // refreshes load receent searches function
  loadRecentSearches();
});
//loads recent searches from local storage when page is loaded
loadRecentSearches();

//Saving this for later in case I screw this up
// try {
//   const response = await fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?q=${typed.replace(
//       " ",
//       "%20"
//     )}&appid=${apiKey}&units=imperial`
//   );
//   const data = await response.json();
//   console.log(`temp: ${data.list[0].main.temp}`)
//   console.log(`wind speed: ${data.list[0].wind.speed}`)
//   console.log(`Humidity : ${data.list[0].main.humidity}%`)
//   console.log(data.city.coord)
//   const{lat,lon} = data.city.coord
// } catch (err) {
//   console.error(err);
// }
