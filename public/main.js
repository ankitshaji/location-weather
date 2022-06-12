//client-side
//button
document.getElementById("b1").addEventListener("click", (event) => {
  if ("geolocation" in navigator) {
    console.log("gelocation available");

    //async callback function
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      document.getElementById("lat").textContent = lat;
      document.getElementById("lon").textContent = lon;

      // Get Request to server - proxy - openweathermapAPI
      const api_url = `/weather/${lat},${lon}`;
      const response1 = await fetch(api_url);
      const json1 = await response1.json();
      console.log(json1);

      //POST Request to server
      const data = { lat, lon };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response2 = await fetch("/api", options);
      const json2 = await response2.json();
      //console.log(json2);
    });
  } else {
    console.log("geolocation not available");
  }
});
