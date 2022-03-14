const form = document.querySelector(".top-banner form");
const input = document.querySelector("div.container input");
const span = document.querySelector(".msg");
const cityList = document.querySelector(".ajax-section .cities");
localStorage.setItem(
  "apiKey",
  EncryptStringAES("97266bdb9a17f90131fb2073bd074c72")
);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getWeatherDataFromApi();
});

//! url de ? işaretinin sol tarafı base url ler sağ tarafı ise parametreler
const getWeatherDataFromApi = async () => {
  let apiKey = DecryptStringAES(localStorage.getItem("apiKey"));
  let inputVal = input.value;
  let units = "metric";
  let lang = "tr";
  // alert("apiKey : " + apiKey);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=${units}&lang=${lang}`;

  try {
    const response = await axios(url);
    console.log(response);
    const { main, name, sys, weather } = response.data;

    //image url
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    let createdCityCardLi = document.createElement("li");
    createdCityCardLi.classList.add("city");
    createdCityCardLi.innerHTML = ` <h2 class="city-name" data-name="Ankara, TR">
        <span>Ankara</span>
        <sup>TR</sup>
    </h2>
    <div class="city-temp">1<sup>°C</sup></div>
    <figure>
        <img class="city-icon" src="https://openweathermap.org/img/wn/03n@2x.png">
        <figcaption>scattered clouds</figcaption>
    </figure>`;
  } catch (error) {
    msg.innerText = error;
  }
};
