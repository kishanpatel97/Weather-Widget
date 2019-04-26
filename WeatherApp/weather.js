"strict mode";

let imageArray = [];
let count = 0;
let imageCounter = 0;
let first_time = true;
let DEFAULT_URL =
  "http://api.openweathermap.org/data/2.5/forecast/hourly?q=davis,ca,US&units=imperial&APPID=53c8645907d8866df3b9537d722afba2";
let DEFAULT_CURR_URL = "http://api.openweathermap.org/data/2.5/weather?q=davis,us&units=imperial&APPID=53c8645907d8866df3b9537d722afba2"
//Current Weather API
//http://api.openweathermap.org/data/2.5/weather?q=davis,us&units=imperial&APPID=53c8645907d8866df3b9537d722afba2

var dict = {"01d": "assets/clearsky.svg",
"02d": "assets/fewclouds-day.svg",
"03d": "assets/scatteredclouds.svg",
"04d": "assets/brokencloud.svg",
"09d": "assets/showerrain.svg",
"10d": "assets/rain-day.svg",
"11d": "assets/thunderstorms.svg",
"13d": "assets/snow.svg",
"50d": "assets/mist.svg",
"01n": "assets/clear-night.svg",
"02n": "assets/fewclouds-night.svg",
"03n": "assets/scatteredclouds.svg",
"04n": "assets/brokencloud.svg",
"09n": "assets/showerrain.svg",
"10n": "assets/rain-night.svg",
"11n": "assets/thunderstorms.svg",
"13n": "assets/snow.svg",
"50n": "assets/mist.svg"}


// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true); // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(url = DEFAULT_URL) {
  let xhr = createCORSRequest("GET", url);

  // checking if browser does CORS
  if (!xhr) {
    alert("CORS not supported");
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
    let responseStr = xhr.responseText; // get the JSON string
    let object = JSON.parse(responseStr); // turn it into an object

    var lat = object.city.coord.lat;
     var long = object.city.coord.lon;

     var d = distance(lat, long, 38.5816, -121.4944, "M")

     if(d > 150){
       alert("City not found");
       return;
     }



     console.log(lat);
     console.log(long);
     console.log(d);
    var timeElements = document.getElementsByClassName("time");
    var tempElements = document.getElementsByClassName("temperature");



    for (i = 0; i < 5; i++) {
      var d = new Date(object.list[i].dt * 1000);

      var hour = d.getHours();

      var ending = ":00 am";
      if (hour >= 12) {
        ending = ":00 pm";
      }
      if (hour > 12) {
        hour = hour - 12;
      }

      if (hour == 0) {
        hour = 12;
      }

      var iconID = object.list[i].weather[0].icon
      console.log(iconID);

      console.log(dict[iconID]);

      document.getElementById("icon" + i).src = dict[iconID];


      var temp = object.list[i].main.temp;
      tempElements[i].innerHTML = Math.floor(temp) + "°";

      timeElements[i].innerHTML = hour + ending;
      console.log(object);



    }
  };

  xhr.onerror = function() {
    alert("Woops, there was an error making the request.");
  };

  // Actually send request to server
  xhr.send();
}

// run this code to make request when this script file gets executed
makeCorsRequest();


///HIIIII

// Create the XHR object.
function createCORSRequestCurr(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequestCurr(url = DEFAULT_CURR_URL) {

  let xhr = createCORSRequestCurr('GET', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      let responseStr = xhr.responseText;  // get the JSON string
      let object = JSON.parse(responseStr);  // turn it into an object
      console.log("Current Weather Data")
      console.log(object);  // print it out as a string, nicely formatted

      document.getElementById("leftImage").src = dict[object.weather[0].icon];

      var d = new Date();

      var hour = d.getHours();

      console.log("Date RN!!! " + hour);



      var ending = ":00 am";
      if (hour >= 12) {
        ending = ":00 pm";
      }
      if (hour > 12) {
        hour = hour - 12;
      }

      if (hour == 0) {
        hour = 12;
      }

      document.getElementById("currTime").innerHTML= "current<br>" + hour + ending;
      var temp = object.main.temp
      console.log(temp);
      document.getElementById("currTemp").innerHTML =  Math.floor(temp)+ "°";


  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

// run this code to make request when this script file gets executed
makeCorsRequestCurr();

//HIIII






document.getElementById("submitBox").addEventListener("click", function() {
  let loc = document.getElementById("typeInBox").value;
  console.log(loc);
  let newURL =
    "http://api.openweathermap.org/data/2.5/forecast/hourly?q=" +
    loc +
    ",US&units=imperial&APPID=53c8645907d8866df3b9537d722afba2";
  makeCorsRequest(newURL);


  let urlCur = "http://api.openweathermap.org/data/2.5/weather?q=" + loc + ",us&units=imperial&APPID=53c8645907d8866df3b9537d722afba2"
  makeCorsRequestCurr(urlCur);
});


document.getElementById("upArrowID").addEventListener("click", function() {
  console.log("pressed");
  window.scrollTo({ top: 1200, behavior: 'smooth' });
;


});


document.getElementById("downArrowID").addEventListener("click", function() {
  console.log("pressed");
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


//doppler image


function setImages(){
	  var image = document.getElementById("img3a");
    var imageB = document.getElementById("img3b");
	  image.src = imageArray[imageCounter].src;
    imageB.src = imageArray[imageCounter].src;
	  if(imageCounter == 9){
		imageCounter = 0;
	  }else{
		imageCounter++;
	  }


}


function addToArray(newImage) {
	if (count < 10) {
		newImage.id = "doppler_"+count;
		newImage.style.display = "none";
		imageArray.push(newImage);
		count = count+1;
		if (count >= 10) {
			console.log("Got 10 doppler images");
			setInterval(setImages,80);
		}
	}
}


function tryToGetImage(dateObj) {
	let dateStr = dateObj.getUTCFullYear();
	dateStr += String(dateObj.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
	dateStr += String(dateObj.getUTCDate()).padStart(2, '0');

	let timeStr = String(dateObj.getUTCHours()).padStart(2,'0');
	timeStr += String(dateObj.getUTCMinutes()).padStart(2,'0');

	let filename = "DAX_"+dateStr+"_"+timeStr+"_N0R.gif";
	let newImage = new Image();
	newImage.onload = function () {
		// console.log("got image "+filename);
		addToArray(newImage);
    console.log(newImage);
	}
	newImage.onerror = function() {
		// console.log("failed to load "+filename);
	}
	newImage.src = "http://radar.weather.gov/ridge/RadarImg/N0R/DAX/"+filename;
}


function getTenImages() {
	let dateObj = new Date();  // defaults to current date and time
	// if we try 150 images, and get one out of every 10, we should get enough
	for (let i = 0; i < 150; i++) {
		newImage = tryToGetImage(dateObj);
		dateObj.setMinutes( dateObj.getMinutes()-1 ); // back in time one minute
	}

}
getTenImages();


//Distance Calc  GeoDataSource.com (C) All Rights Reserved 2018
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		return dist;
	}
}
