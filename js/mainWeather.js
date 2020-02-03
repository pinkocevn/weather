const weatherAPI='b4b745506e8e239cd263749221560315';
const waqiAPI='f042f2bcc0a019fe2954094798a64289fb1200e2';

loadCoords();
// 현재 위치 기준 슬라이드 적용
function loadCoords() {
    navigator.geolocation.getCurrentPosition(function(geo){
    const lat = geo.coords.latitude;
    const lon = geo.coords.longitude;
    const $swiperSlide=$('.swiper-slide').eq(0);
    getCurrentWeather($swiperSlide, lat, lon);
    getWeeklyWeather($swiperSlide, lat, lon);
    getCurrentUV($swiperSlide, lat, lon);
    getCurrentDust($swiperSlide, lat, lon);
    mainLocation(lat, lon);
  });
}

function getArea(){
  var area=localStorage.getItem('area');
  return JSON.parse(area);
}

function setArea(area){
  var area=JSON.stringify(area);
  localStorage.setItem('area', area);
}

var swiper;
var area=getArea();
if(area!=null){
  var swiperSlide=$('.swiper-wrapper').html();
  area.forEach((obj, index) => {
    if(obj.id!="main"){
      $('.swiper-wrapper').append(swiperSlide);
      const lat=obj.lat;
      const lon=obj.lon;
      const $swiperSlide=$('.swiper-slide').eq(index);
      getCurrentWeather($swiperSlide, lat, lon);
      getWeeklyWeather($swiperSlide, lat, lon);
      getCurrentUV($swiperSlide, lat, lon);
      getCurrentDust($swiperSlide, lat, lon);
    }
  })
  swiper = new Swiper(".swiper-container");
  swiper.on('slideChange', function () {
    var index=swiper.realIndex;
    var placeName=$('.popup-place li').eq(index+1).find('button').text();
    $('.header-place span').text(placeName);
    $('.popup-place li').eq(0).find('span').text(placeName);
    var currentDust = $('.dust-info').eq(index).text();
    var dustColor;
    if(currentDust === '좋음'){
      dustColor = 'body-blue';
    }else if(currentDust === '보통'){
      dustColor = 'body-green';
    }else if(currentDust === '나쁨'){
      dustColor = 'body-yellow';
    }else if(currentDust === '매우나쁨'){
      dustColor = 'body-red';
    }
    $('body').removeClass(function(i, className){
      var className = className.split(' ');
      $(this).removeClass(className[1]);
    })
    $('body').addClass(dustColor);
  });
}

$(".popup-place").on("click", "li:not(.default) button", function() {
  var index=$(this).index('li:not(.default) button');
  swiper.slideTo(index);
  $(".popup-bg").hide();
  $(".popup-place").hide();
});


// current weather
function getCurrentWeather(el, lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPI}&units=metric`
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
      var weatherIconText = {
        '01d' : '맑음',
        '01n' : '맑음',
        '02d' : '구름 조금',
        '02n' : '구름 조금',
        '03d' : '흐림', 
        '03n' : '흐림',
        '04d' : '흐림',
        '04n' : '흐림',
        '09d' : '소나기',
        '09n' : '소나기',
        '10d' : '비',
        '10n' : '비',
        '11d' : '번개',
        '11n' : '번개',
        '13d' : '눈',
        '13n' : '눈',
        '50d' : '안개',
        '50n' : '안개'
      }
      el.find('.weather-textbox .weather-info').text(weatherIconText[icon])
      el.find(".weather-info .weather-temp").text(nowTemp + "°");
      el.find(".weather-today-detail")
        .find(".humidity")
        .text(humidity + "%");
      el.find(".weather-today-detail")
        .find(".wind")
        .text(wind + "m/s");
      el.find(".weather-info")
        .find(".weather-high")
        .text(nowTemp + 3);
      el.find(".weather-info")
        .find(".weather-low")
        .text(nowTemp - 3);
      el.find(".weather-img img:nth-child(1)").attr(
        "src",
        `img/weather/${icon}.svg`
      );
      el.find(".today-sun span:nth-child(1)").text(sunriseTimeSet);
      el.find(".today-sun span:nth-child(2)").text(sunsetTimeSet);
      el.find(".tomorrow-sun div span:nth-child(1)>span").text(
        sunriseTimeSet
      );
      el.find(".tomorrow-sun div span:nth-child(2)>span").text(
        sunsetTimeSet
      );
    });
}

// weekly weather
function getWeeklyWeather(el, lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPI}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {      
      printWeeklyData(el, json,'.weather-tab')
      saveHourlyData(el,json, '.weather-tab')
    });
}

// current UV
function getCurrentUV(el, lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${weatherAPI}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var currentUV = json.value;
      el.find(".weather-today-detail")
        .find(".uv")
        .text(currentUV);
    });
}

// current Dust
function getCurrentDust(el, lat, lon) {
  fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${waqiAPI}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    var dustValue;
    var dustKor;
    var dustIcon;

    var getDust = json.data.iaqi.pm10.v ;
    var getFineDust = json.data.iaqi.pm25.v;
    var dustValue;
    var fineDustValue;
    var dustPerc;
    
    if(getDust <= 30){
      dustValue = "dust-good";
      dustKor = "좋음";
      dustIcon = "dust1";
      dustColor="body-blue";
      changeColors(
        el,
        1,
        dustColor
      );  
      dustPerc = getDust;
      if(dustPerc > 25){
        dustPerc =25;
      }
    }else if(31 < getDust && getDust <= 50){
      dustValue = "dust-soso";
      dustKor = "보통";
      dustIcon = "dust2";
      dustColor="body-green";
      changeColors(
        el,
        2,
        dustColor
      );
      dustPerc = getDust;
    }else if(51 < getDust && getDust <= 100){
      dustValue = "dust-bad";
      dustKor = "나쁨";
      dustIcon = "dust3";
      dustColor="body-yellow";
      changeColors(
        el,
        3,
        dustColor
      );
      dustPerc = getDust;
      if(dustPerc > 75){
        dustPerc=75;
      }
    }else{
      dustValue = "dust-terrible";
      dustKor = "매우나쁨";
      dustIcon = "dust4";
      dustColor="body-red";
      changeColors(
        el,
        4,
        dustColor
      );
      dustPerc = getDust;
      if(dustPerc > 100 && dustPerc < 120){
        dustPerc = getDust-25;
      }else if(dustPerc >= 120){
        dustPerc=95;
      }
    } 

    if(getFineDust < 15){
        fineDustValue = 'dust-good';
        fineDustKor = '좋음';        
    }else if(16 <= getFineDust && getFineDust < 25){
        fineDustValue = 'dust-soso';
        fineDustKor = '보통';      
    }else if(26 <= getFineDust && getFineDust < 50){
        fineDustValue = 'dust-bad';
        fineDustKor = '나쁨';  
    }else{
        fineDustValue = 'dust-terrible';
        fineDustKor = '매우나쁨';  
    } 

    el.find(".dust-info").text(dustKor);
    el.find(".weather-img img:nth-child(2)").attr(
      "src",
      `img/dust/${dustIcon}.svg`
    );
    el.find(".dust-value-bar").css("left", `${dustPerc}%`);
    printWeeklyData(el, json,".dust-tab",dustKor,dustValue,fineDustKor,fineDustValue);
    saveHourlyData(el, json,".dust-tab",dustKor,dustValue);
  });
}

function changeColors(el, colorNum, dustColor) {
  if(el.hasClass('swiper-slide-active')){
    $('body').removeClass(function(i, className){
      var className = className.split(' ');
      $(this).removeClass(className[1]);
      
    })
    $('body').addClass(dustColor);
  }
  

  el.find(".sunrise-sunset img").attr("src", `img/sunrise-sunset-${colorNum}.svg`);
}

function printWeeklyData(el, json, tab, dustKor, dustValue,fineDustKor,fineDustValue){
  el.find(`.weather-tab-contents ${tab} table tbody`).empty();
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
    if(tab === '.weather-tab'){
      for (const i in json.list) {
        var obj=json.list;
        var findDay = obj[i].dt_txt.split(' ')[0];
        if(fullDate===findDay){
         var icon = obj[i].weather[0].icon;
         var humidity = obj[i].main.humidity;
         var temp = obj[i].main.temp;
         temp= Math.round(temp)
         el.find(`.weather-tab-contents ${tab} table tbody`).append(`
            <tr>
                <td>${printDate} (${dayKor[day]})</td>
                <td><i class="sprite-small sprite-${icon}"></i></td>
                <td>${humidity}%</td>
                <td>${temp + 3}°/${temp - 3}°</td>
            </tr>`);
          break;
        }
      }        
    }else{
      for (let i = 0; i < 6; i++) { 
        el.find(`.weather-tab-contents ${tab} table tbody`).append(`
          <tr>
            <td>${printDate} (${dayKor[day]})</td>
            <td>
              <div>
                <i class="sprite-small ${dustValue}"></i>${dustKor}
              </div>
            </td >
            <td>
              <div>
                <i class="sprite-small ${fineDustValue}"></i>${fineDustKor}
              </div>
          </td>
        </tr>`);
        break;
      } 
    }
  }
}

// hourly forecast
function saveHourlyData(el, json, tab, dustKor, dustValue){
  if(tab === '.weather-tab'){
    var tempList=[];
    var weatherIconList = [];
    for (let i = 0; i < 12; i++) {
      var temp=Math.round(json.list[i].main.temp);
      tempList.push(temp);
      var weatherIcon=json.list[i].weather[0].icon;
      weatherIconList.push(weatherIcon);
    }
    var weatherInfo = {
      tempList : tempList,
      weatherIconList : weatherIconList      
    };        
    printHourlyWeather(el, weatherInfo)
  }else{
    var dustKor = dustKor;
    var dustValue = dustValue;
    dustInfo=[dustKor,dustValue];
    printHourlyDust(el, dustInfo)
  }  
}

function printHourlyWeather(el, weatherInfo){
  var tempList = weatherInfo.tempList;
  var weatherIconList = weatherInfo.weatherIconList;
  
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
    el.find('.weather-time-list li').eq(i).find('.time').text(`${ampm} ${time}시`);
    el.find('.weather-time-list li').eq(i).find('.time-weather').append(`
      <div class="sprite-big sprite-${weatherIconList[i]}"></div>
      <span class="time-deg">${tempList[i]}°</span>
  `)  
  }
  
}

function printHourlyDust(el, dustInfo){
  var dustKor = dustInfo[0];
  var dustValue = dustInfo[1];
  for (let i = 0; i < 12; i++) { 
    el.find('.weather-time-list li').eq(i).find('.time-dust').append(`
      <div class="sprite-big ${dustValue}"></div>
      <span class="time-dust-value">${dustKor}</span>
    `)
  }
}

// main location
function mainLocation(lat, lon){
  var geocoder = new kakao.maps.services.Geocoder();
  var coord = new kakao.maps.LatLng(lat,lon);

  var callback = function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        var thisPlace = result[0].address.address_name;
        thisPlace = thisPlace.split(' ');
        thisPlace = thisPlace[1]+' '+thisPlace[2];
        $('.header-place span').text(thisPlace);
        var thisPlace = $('.header-place span').text();
        var getPlace = getArea();
        
        if(getPlace==null){
          getPlace=[];
          var mainPlace={
            id:'main',
            area: thisPlace,
            lat:lat,
            lon,lon
          }
          getPlace.push(mainPlace)
        }else{          
          getPlace.forEach(obj => {
            if(obj.id=='main'){
              obj.area=thisPlace;
              obj.lat=lat;
              obj.lon=lon;
            }
          });
        }
        setArea(getPlace);
        getPlace = getArea();
        if (getPlace.length === 1) {
          $(".header-place .arrow-down").hide();
        } else {
          $(".header-place .arrow-down").show();
          $(".popup-place ul").empty();
          $(".popup-place ul").append(`
                  <li class="default">
                      <button>
                          <i class="material-icons">room</i>
                          <span>${thisPlace}</span>
                          <i class="material-icons-round">keyboard_arrow_up</i>
                      </button>
                  </li>
              `);
          for (const i in getPlace) {
            $(".popup-place ul").append(`
              <li class="${getPlace[i].id}"><button>${getPlace[i].area}</button></li>
            `);
          }
        }
    }
  };
  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}