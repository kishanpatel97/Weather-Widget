"strict mode";

let DEFAULT_URL =
  "http://api.openweathermap.org/data/2.5/forecast/hourly?q=sacramento,CA,US&units=imperial&APPID=53c8645907d8866df3b9537d722afba2";

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

document.getElementById("submitBox").addEventListener("click", function() {
  let loc = document.getElementById("typeInBox").value;
  let newURL =
    "http://api.openweathermap.org/data/2.5/forecast/hourly?q=" +
    loc +
    ",US&units=imperial&APPID=53c8645907d8866df3b9537d722afba2";
  makeCorsRequest(newURL);
});
