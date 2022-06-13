//Client-side

//leaflet map+tiles creation
const map = L.map("weatherMap").setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution }).addTo(map);

//Get Request to server
getData();
async function getData() {
  const response = await fetch("/api");
  const data = await response.json();
  for (item of data) {
    const marker = L.marker([item.lat, item.lon]).addTo(map);
    let text = `The weather hear at (${item.lat}&deg; ,${item.lon}&deg;) is
     ${item.weather.weather[0].description} with a temperature of
    ${item.weather.main.temp}&deg; Celcius.`;
    if (item.air.value < 0) {
      text += " No air quality informtion available.";
    } else {
      text += `<br> The concentration of
      particulate matter (${item.air.parameter}) is
      ${item.air.value} ${item.air.unit}.Last read on
      ${item.air.lastUpdated}`;
    }
    marker.bindPopup(text);
  }
  console.log(data);
}
