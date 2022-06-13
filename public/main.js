//client-side

if ("geolocation" in navigator) {
  console.log("gelocation available");

  //async callback function
  navigator.geolocation.getCurrentPosition(async (position) => {
    try {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      document.getElementById("lat").textContent = lat;
      document.getElementById("lon").textContent = lon;

      // Get Request to server - proxy
      // returned json also includes Get request data from openaqAPI
      const api_url = `/weather/${lat},${lon}`;
      const response1 = await fetch(api_url);
      const json1 = await response1.json();
      const weather = json1.weather;
      const air = json1.air.results[0].measurements[0];

      //Display on webpage
      document.getElementById("summary").textContent =
        weather.weather[0].description;
      document.getElementById("temperature").textContent = weather.main.temp;
      document.getElementById("aq_parameter").textContent = air.parameter;
      document.getElementById("aq_value").textContent = air.value;
      document.getElementById("aq_unit").textContent = air.unit;
      document.getElementById("aq_date").textContent = air.lastUpdated;

      //POST Request to server -update database
      const data = { lat, lon, weather, air };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response2 = await fetch("/api", options);
      const json2 = await response2.json();
      console.log(json2);
    } catch (err) {
      console.log("Error found :", err.message);
    }
  });
} else {
  console.log("geolocation not available");
}
