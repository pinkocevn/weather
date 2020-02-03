// main page
function loadCoords() {
  const loadedCoords = localStorage.getItem("coords");
  if (loadedCoords === null) {
    const currentCoords = navigator.geolocation.getCurrentPosition(function(
      geo
    ) {
      const lat = geo.coords.latitude;
      const lon = geo.coords.longitude;
      const coordsObj = {
        lat,
        lon
      };
      localStorage.setItem("coords", JSON.stringify(coordsObj));
      getCurrentWeather(lat, lon);
      getWeeklyWeather(lat, lon);
      getCurrentUV(lat, lon);
      // getCurrentDust(city);
      getCurrentDust("seoul");
    });
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getCurrentWeather(parseCoords.lat, parseCoords.lon);
    getWeeklyWeather(parseCoords.lat, parseCoords.lon);
    getCurrentUV(parseCoords.lat, parseCoords.lon);
    // getCurrentDust(city);
    getCurrentDust("seoul");
  }
}
loadCoords();

// current weather
function getCurrentWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b4b745506e8e239cd263749221560315&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var nowTemp = Math.round(json.main.temp);
      var humidity = json.main.humidity;
      var wind = json.wind.speed;
      var icon = json.weather[0].icon;
      var sunrise = json.sys.sunrise;
      var sunset = json.sys.sunset;
      var sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
      sunriseTime = sunriseTime.split(" ");
      var sunriseTimeSet = sunriseTime[1];
      sunriseTimeSet = sunriseTimeSet.split(":");
      sunriseTimeSet = `0${sunriseTimeSet[0]}:${sunriseTimeSet[1]}`;
      var sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
      sunsetTime = sunsetTime.split(" ");
      var sunsetTimeSet = sunsetTime[1];
      sunsetTimeSet = sunsetTimeSet.split(":");
      sunsetTimeSet = `${parseInt(sunsetTimeSet[0])+12}:${sunsetTimeSet[1]}`;

      $(".main-of-slide .weather-info .weather-temp").text(nowTemp + "°");
      $(".main-of-slide .weather-today-detail")
        .find(".humidity")
        .text(humidity + "%");
      $(".main-of-slide .weather-today-detail")
        .find(".wind")
        .text(wind + "m/s");
      $(".main-of-slide .weather-info")
        .find(".weather-high")
        .text(nowTemp + 3);
      $(".main-of-slide .weather-info")
        .find(".weather-low")
        .text(nowTemp - 3);
      $(".main-of-slide .weather-img img:nth-child(1)").attr(
        "src",
        `img/weather/${icon}.svg`
      );
      $(".main-of-slide .today-sun span:nth-child(1)").text(sunriseTimeSet);
      $(".main-of-slide .today-sun span:nth-child(2)").text(sunsetTimeSet);
      $(".main-of-slide .tomorrow-sun div span:nth-child(1)>span").text(
        sunriseTimeSet
      );
      $(".main-of-slide .tomorrow-sun div span:nth-child(2)>span").text(
        sunsetTimeSet
      );
    });
}

// weekly weather
function getWeeklyWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b4b745506e8e239cd263749221560315&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {      
      printWeeklyData(json,'#weather-tab')
      saveHourlyData(json, '#weather-tab')
  
    });
}

// current UV
function getCurrentUV(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=b4b745506e8e239cd263749221560315&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var currentUV = json.value;
      $(".main-of-slide .weather-today-detail")
        .find(".uv")
        .text(currentUV);
    });
}

// current Dust
function getCurrentDust(city) {
  fetch(
    `https://api.waqi.info/feed/${city}/?token=f042f2bcc0a019fe2954094798a64289fb1200e2`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var aqiValue = json.data.aqi;
      var dustValue;
      var dustKor;
      var dustIcon;
      if (aqiValue < 51) {
        dustValue = "dust-good";
        dustKor = "좋음";
        dustIcon = "dust1";
        dustColor="dustBlue";
        changeColors(
          "#9FCFEE",
          "#0A394B",
          "rgba(159,207,238,0.2)",
          1,
          dustColor
        );
      } else if (51 <= aqiValue && aqiValue < 101) {
        dustValue = "dust-soso";
        dustKor = "보통";
        dustIcon = "dust2";
        dustColor="dustGreen";
        changeColors(
          "#71CE9B",
          "#082C18",
          "rgba(113,206,155,0.1)",
          2,
          dustColor
        );
      } else if (101 <= aqiValue && aqiValue < 201) {
        dustValue = "dust-bad";
        dustKor = "나쁨";
        dustIcon = "dust3";
        dustColor="dustYellow";
        changeColors(
          "#FFD880",
          "#342709",
          "rgba(255,216,128,0.2)",
          3,
          dustColor
        );
      } else {
        dustValue = "dust-terrible";
        dustKor = "매우나쁨";
        dustIcon = "dust4";
        dustColor="dustRed";
        changeColors(
          "#F68383",
          "#3A0F0F",
          "rgba(246,131,131,0.1)",
          4,
          dustColor
        );
      }
      var aqiPerc = aqiValue / 3 + 16;
      if (aqiPerc > 95) {
        aqiPerc = 95;
      }

      $(".main-of-slide .dust-info").text(dustKor);
      $(".main-of-slide .weather-img img:nth-child(2)").attr(
        "src",
        `img/dust/${dustIcon}.svg`
      );
      $(".main-of-slide .dust-value-bar").css("left", `${aqiPerc}%`);
      printWeeklyData(json,"#dust-tab",dustKor,dustValue,dustColor);
      saveHourlyData(json,"#dust-tab",dustKor,dustValue,dustColor);
    });
}

function changeColors(bgColor, fontColor, opacityBg, colorNum, dustColor) {
  $("body").css({
    background: bgColor,
    color: fontColor
  });
  $(document)
    .find(".sprite-big")
    .addClass(dustColor);
  $(document)
    .find(".sprite-small")
    .addClass(dustColor);

  $(".sunrise-sunset img").attr("src", `img/sunrise-sunset-${colorNum}.svg`);
  $("button").css("color", fontColor);
  $("a").css("color", fontColor);
  $(".weather-today-detail").css("background", opacityBg);
  $(".sunrise-sunset").css("background", opacityBg);
  $(".weather-weekly ul li.active").css("background", bgColor);
  $('.popup-place li:first-child button').css("background", bgColor);
  $(document)
    .find($(".weather-weekly ul li"))
    .on("click", "a", function() {
      $(".weather-weekly ul li").css("background", "#fff");
      $(".weather-weekly ul li.active").css("background", bgColor);
    });
}

function printWeeklyData(json,tab,dustKor,dustValue,dustColor){
  $(`.main-of-slide .weather-tab-contents ${tab} table tbody`).empty();
  //최대 7일치 정보 뽑기
  for (let index = 0; index < 6; index++) {
    //하루씩 더하기
    var today=new Date();          
    today.setDate(today.getDate()+Number(index));
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var date = today.getDate();      
    var day = today.getDay();  
    var dayKor = ["일", "월", "화", "수", "목", "금", "토"];
    if(month < 10){
      month = '0'+month;
    }
    if(date < 10){
      date = '0'+date;
    }
    var fullDate=year+'-'+month+'-'+date;
    var printDate = fullDate.split('-');
    printDate = printDate[1]+'/'+printDate[2]
    if(tab === '#weather-tab'){
      for (const i in json.list) {
        var obj=json.list;
        var findDay = obj[i].dt_txt.split(' ')[0];
        if(fullDate===findDay){
         var icon = obj[i].weather[0].icon;
         var humidity = obj[i].main.humidity;
         var temp = obj[i].main.temp;
         temp= Math.round(temp)
         var bgColor = $("body").css("background-color");
         if (bgColor === "rgb(159, 207, 238)") {
           dustColor = "dustBlue";
         } else if (bgColor === "rgb(113, 206, 155)") {
           dustColor = "dustGreen";
         } else if (bgColor === "rgb(255, 216, 128)") {
           dustColor = "dustYellow";
         } else if (bgColor === "rgb(246, 131, 131)") {
           dustColor = "dustRed";
         }
         $(`.main-of-slide .weather-tab-contents #weather-tab table tbody`).append(`
            <tr>
                <td>${printDate} (${dayKor[day]})</td>
                <td><i class="sprite-small sprite-${icon} ${dustColor}"></i></td>
                <td>${humidity}%</td>
                <td>${temp + 3}°/${temp - 3}°</td>
            </tr>`);
          break;
        }
      }        
    }else{
      for (let i = 0; i < 6; i++) { 
        $(`.main-of-slide .weather-tab-contents ${tab} table tbody`).append(`
          <tr>
            <td>${printDate} (${dayKor[day]})</td>
            <td>
              <div>
                <i class="sprite-small ${dustValue} ${dustColor}"></i>${dustKor}
              </div>
            </td >
            <td>
              <div>
                <i class="sprite-small ${dustValue} ${dustColor}"></i>${dustKor}
              </div>
          </td>
        </tr>`);
        break;
      } 
    }
  }
}

// hourly forecast

function saveHourlyData(json, tab,dustKor,dustValue,dustColor){
  $('.weather-time-list').empty();
  if(tab === '#weather-tab'){
    var tempList=[];
    var weatherIconList = [];
    for (let i = 0; i < 12; i++) {
      var temp=Math.round(json.list[i].main.temp);
      tempList.push(temp);
      var weatherIcon=json.list[i].weather[0].icon;
      weatherIconList.push(weatherIcon);
    }
    var hourlyWeather = {
      tempList : tempList,
      weatherIconList : weatherIconList
    };
    hourlyWeather = JSON.stringify(hourlyWeather);
    localStorage.setItem('hourlyWeather',hourlyWeather);
  }else{
    var dustKor = dustKor;
    var dustValue = dustValue;
    var dustColor = dustColor;
    var dustInfo=[dustKor,dustValue,dustColor]
    var getHourlyWeather = localStorage.getItem('hourlyWeather');
    getHourlyWeather = JSON.parse(getHourlyWeather);
    if(getHourlyWeather !== null){
      getHourlyWeather["dustInfo"] = dustInfo;
      var setHourlyWeather = JSON.stringify(getHourlyWeather);
      localStorage.setItem('hourlyWeather',setHourlyWeather);
    }
  }
  if(getHourlyWeather !== undefined){
    printHourlyData();  
  }
}

function printHourlyData(){
  var getHourlyWeather = localStorage.getItem('hourlyWeather');
  parseWeather = JSON.parse(getHourlyWeather);

  var weatherIconList = parseWeather.weatherIconList;
  var tempList = parseWeather.tempList;
  var dustList = parseWeather.dustInfo;
  var dustKor = dustList[0];
  var dustValue = dustList[1];
  var dustColor = dustList[2];
  
  for (let i = 0; i < 12; i++) { 
    var time = new Date().getHours(); 
    var time = time+i; 
    var ampm; 
    if(time === 24 || time<12){
      ampm = '오전'
    }else if(time === 12){
      ampm = '오후'
    }else{
      ampm = '오후'
      time= time-12;
    }
    $('.weather-time-list').append(`
      <li>
        ${ampm} ${time}시
        <div class="time-weather">
            <div class="sprite-big sprite-${weatherIconList[i]} ${dustColor}"></div>
            <span class="time-deg">${tempList[i]}°</span>
        </div>
        <div class="time-dust">
            <div class="sprite-big ${dustValue} ${dustColor}"></div>
            <span class="time-dust-value">${dustKor}</span>
        </div>
      </li>
  `)
  }
}

