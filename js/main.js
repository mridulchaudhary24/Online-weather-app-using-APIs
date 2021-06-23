const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const temp_real_val = document.getElementById('temp_real_val');
const datahide = document.querySelector('.method_layer');

function date() {
    let curr = new Date();
    var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let hours = curr.getHours();
    let mins = curr.getMinutes();
    let periods = "AM";
    if (hours > 11) {
        periods = "PM";
        if (hours > 12)
            hours -= 12;
    }

    if (mins < 10)
        min = "0" + mins;
    let day = ` ${strArray[curr.getMonth()]} ${curr.getDate()} | ${hours}:${mins}${periods}`;
    return day;
}

const currDate = document.getElementById("today_data");
currDate.innerHTML = date();

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal == "") {
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=6043de92f66a024f87eded6f917d87c9`;
            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);
            const arrData = [data];
            console.log(`${arrData[0].name}, ${arrData[0].sys.country}`);
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = (arrData[0].main.temp - 273.15).toFixed(1);
            let tempMood = arrData[0].weather[0].main;
            console.log(tempMood);

            if (tempMood == "Clear") {
                temp_status.innerHTML =
                    "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                    "<i class='fas fa-sun' style='color: #f1f2f6;'></i>";
            }

            // datahide.classList.remove('data_hide');
        } catch {
            city_name.innerText = `Plz enter the city name properly`;
            temp_status.innerHTML = "";
            temp.innerText="";
        }
    }
}

submitBtn.addEventListener('click', getInfo);