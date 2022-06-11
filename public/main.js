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

      //POST Request
      const data = { lat, lon };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch("/api", options);
      const json = await response.json();
      console.log(data);
    });
  } else {
    console.log("geolocation not available");
  }
});
