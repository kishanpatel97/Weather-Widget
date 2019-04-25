"strict mode";

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {

  let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=sacramento,CA,US&units=imperial&APPID=53c8645907d8866df3b9537d722afba2"

  let xhr = createCORSRequest('GET', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function () {
    let responseStr = xhr.responseText;  // get the JSON string
    let object = JSON.parse(responseStr);  // turn it into an object
    let data = grabData(object.list);
  };

  xhr.onerror = function () {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

function grabData(list) {
  let ret = [];
  let times = document.getElementsByClassName("time");
  let temps = document.getElementsByClassName("temperature");
  console.log(list);
  for(let i = 0; i < 6; i++) {
    times[i].innerHTML = new Date(list[i].dt_txt).getHours() + ":00";
    temps[i].innerHTML = Math.floor(list[i].main.temp) + "°";
  }
}

document.getElementById("submitBox").addEventListener(function() {
  grabData();
})

// run this code to make request when this script file gets executed
makeCorsRequest();
