const cityForm = document.querySelector("form");
const card = document.querySelector("#card");
const details = document.querySelector("#details");
const time = document.querySelector("#time");
const icon = document.querySelector("#icon img")

const updateUI = (data) => {

    //destructure properties
    const {cityDetails, weather} = data;

    //remove display: none; class
    if(card.classList.contains("hidden")){
        card.classList.remove("hidden");
    }

    //update details template
    details.innerHTML = `
        <h1 class="text-2xl">${cityDetails.EnglishName}</h1>
        <h2 class="mt-3 text-slate-400">${weather.WeatherText}</h2>
        <h3 class="text-6xl mt-8 font-light tracking-widest">${weather.Temperature.Metric.Value} &deg;C</h3>
    `;

};

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    //returns object (shorthand notation)
    return {cityDetails, weather};
}

cityForm.addEventListener("submit", item => {
    // prevent default action
    item.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the UI with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(error => console.log(error));
})