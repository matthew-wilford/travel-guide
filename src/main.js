const U_ACCESS_KEY = "wqtX19pGrcGDoUJjU-wXgOuGOMQGmjA1e4bSmh4k5N8"; // replace with your Unsplash key
const BW_ACCESS_KEY = "bw_live_6db1254f2a36f10f6b3dc8fa32fd7ccfY"; // replace with your Bamwor key

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const factsOutput = document.getElementById("facts-output");

// Function to pull photos from Unsplash
function getPhoto(cityName) {
  let imgUrl = `https://api.unsplash.com/search/photos/?page1&query=${cityName}&client_id=${U_ACCESS_KEY}`;
  // console.log(imgUrl);
  fetch(imgUrl)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.results[0].urls);
      const imgSrc = data.results[0].urls.regular;

      // 1. Create a new <img> element in memory
      const imgElement = document.createElement("img");

      // 2. Set the image attributes
      imgElement.src = imgSrc;
      imgElement.alt = "Dynamically loaded image";
      imgElement.style.maxHeight = "60vh";

      // 3. Find the placeholder div and insert the image into it
      const container = document.getElementById("img-container");
      container.innerHTML = ""; // clear any previous image
      container.appendChild(imgElement);
    });
}

// Asynchronous function to pull location data from Bamwor
async function getFacts(cityName) {
  const res = await fetch(
    `https://bamwor.com/api/v1/search?q=${cityName}&lang=en&limit=1`,
    {
      headers: { "X-API-Key": BW_ACCESS_KEY },
    },
  );
  const { data } = await res.json();
  console.log(data[0]);
  const population = data[0].population;
  const country_code = data[0].country_code;

  factsOutput.innerHTML =
    "<h2>Population: " +
    population +
    "</h2>" +
    "<h2>Country Code: " +
    country_code +
    "</h2>";
}

// Execute the call
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  getPhoto(cityInput.value);
  getFacts(cityInput.value);
  cityInput.value = ""; // clears the search bar after I press searchBtn for good UI
});
