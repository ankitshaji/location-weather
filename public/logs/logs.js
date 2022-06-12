//Client-side

//Get Request to server
getData();
async function getData() {
  const response = await fetch("/api");
  const data = await response.json();
  for (item of data) {
    const rootdiv = document.createElement("p");
    const geodiv = document.createElement("div");
    const timestamp = document.createElement("div");

    //textContent over innerHtml for security
    geodiv.textContent = ` ${item.lat}*, ${item.lon}*`;
    const dateString = new Date(item.timestamp).toLocaleDateString();
    timestamp.textContent = `${dateString}`;

    //append takes multiple arguments
    rootdiv.append(geodiv, timestamp);
    document.body.append(rootdiv);
  }
  console.log(data);
}
