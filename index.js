const hum = document.getElementById('humidity');
const pres = document.getElementById('pressure');
let describe = document.getElementById('description');
const scribe = document.getElementById('description');

let weather = {
    apikey:"32c56f28fc30488f9afb9d1af75245a0",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apikey
            ).then((response) => response.json())
            .then((data) => this.displayWeather(data));
        },
        displayWeather: (data) => {
            const {name} = data;
            const {country}= data.sys;
            const {icon, description} = data.weather[0];
            const {temp,feels_like, humidity,pressure} = data.main;
            const {speed} = data.wind;
            document.querySelector(".place").innerText=`${name}, ${country}`;
            document.querySelector(".temp").innerText= Math.round(temp);
            describe.innerHTML= description;
            let myDate= new Date();
                day= myDate.getDay();
                switch(day){
                    case 0 :
                        day ="Sunday";
                        break;
                    case 1 :
                        day ="Monday";
                        break;
                    case 2 :
                        day ="Tuesday";
                        break;
                    case 3:
                        day ="Wednesday";
                        break;
                    case 4:
                        day ="Thursday";
                        break;
                    case 5 :
                        day ="Friday";
                        break;
                    case 6:
                        day ="Saturday";
                        break; 
                }
            document.querySelector(".day").innerHTML= day;
            let month = myDate.getMonth() + 1;
            let daa = myDate.getDate();
            let year = myDate.getFullYear();
            let date = `${daa}/${month}/${year}` ;
            document.querySelector(".date").innerText= date;
            document.querySelector(".img").src =
            `https://openweathermap.org/img/wn/${icon}.png`;
            document.querySelector(".scribe").innerText= description;
            hum.innerText="Humidity: " + humidity + "%";
            document.querySelector(".feels").innerHTML =`It feels like ${Math.round(feels_like)}`;
            pres.innerText= "Pressure: " + pressure+ "hbar";
            document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
        },
    };
    function displayTime() {
        let myDate = new Date();
        let hours = addZero(myDate.getHours());
        let minutes = addZero(myDate.getMinutes());
        let seconds = addZero(myDate.getSeconds());
        let time = `${hours}:${minutes}:${seconds}`;
        var oneSecond = 1000;
        document.querySelector(".time").innerText=time;
        setInterval(displayTime, oneSecond);
};
    displayTime();
    
    function addZero(num){
        return num < 10 ? `0${num}`:num;
    };
     
    function search(){
        const searchResult =  document.querySelector(".textArea").value;
        weather.fetchWeather(searchResult);
        
    };

    document.querySelector("i").addEventListener("click", search);
    
    
    document.querySelector(".textArea").addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
        search();
        }
    });
    weather.fetchWeather("lagos");



