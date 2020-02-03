// label check
$(document).on("click", ".onoff", function() {
  $(this)
    .find('[type="checkbox"]')
    .is(":checked")
    ? $(this).css("background", "#3492E9")
    : $(this).css("background", "#e3e3e3");
});

// section height
var sectionHeight = $(window).innerHeight() - 60;
var scheduleHeight = sectionHeight - 40;
if (scheduleHeight > 600) {
  scheduleHeight = 600;
}
$("section").css("height", sectionHeight);
$(".schedule-box").css("height", scheduleHeight);

function getSchedule() {
  var scheduleList = localStorage.getItem("schedule");
  return JSON.parse(scheduleList);
}

function setSchedule(scheduleObj) {
  var schedule = JSON.stringify(scheduleObj);
  localStorage.setItem("schedule", schedule);
}

// edit/del btn
$(document).on("click", ".schedule-title button", function() {
  $(this)
    .parents(".schedule-box")
    .find(".edit-popup")
    .show();

  // edit
  $(".edit-popup button:nth-of-type(1)").click(function() {
    var editSchedule = $(this)
      .parents(".schedule-box")
      .data("id");
    localStorage.setItem("editSchedule", editSchedule);
  });

  // delete
  $(".edit-popup button:nth-of-type(2)").click(function() {
    $(".popup-bg").show();
    $(".popup-delete").show();
    var delSchedule = $(this)
      .parents(".schedule-box")
      .data("id");
    $(".popup-delete .btn-group button").click(function() {
      if ($(this).hasClass("no")) {
        $(".popup-bg").hide();
        $(".popup-delete").hide();
        $(".edit-popup").hide();
      } else {
        var getScheduleList = getSchedule();
        for (const i in getScheduleList) {
          if (getScheduleList[i].id === delSchedule) {
            getScheduleList.splice(i, 1);
            break;
          }
        }
        setSchedule(getScheduleList);
        location.reload();
      }
    });
  });

  $(".edit-popup button:nth-of-type(3)").click(function() {
    $(".edit-popup").hide();
  });
});

// print schedule list
$(".swiper-wrapper").empty();
var scheduleList = getSchedule();
for (const i in scheduleList) {
  var placeCheck;
  if (scheduleList[i].addPlace === true) {
    placeCheck = "checked";
  } else {
    placeCheck = "";
  }
  var alarmCheck;
  if (scheduleList[i].alarmSet === "notifications") {
    alarmCheck = "checked";
  } else {
    alarmCheck = "";
  }

  $(".swiper-wrapper").append(`
        <div class="swiper-slide">
            <div class="schedule-box" data-id="${scheduleList[i].id}">
                <div class="edit-popup">
                    <button onclick="location.href='schedule-edit.html'">수정</button>
                    <button>삭제</button>
                    <button>닫기</button>
                </div>
                <div class="schedule-title">
                    <div>
                        <div class="schedule-color" style="background:${scheduleList[i].color}"></div>
                        <h2>${scheduleList[i].title}</h2>
                    </div>
                    <button class="material-icons">more_vert</button>
                </div>
                <span class="schedule-date">${scheduleList[i].date}</span>
                <span class="schedule-place">${scheduleList[i].place}</span>
                <div class="schedule-weather-box">
                    <span>(현재 날씨)</span>
                    <div class="place-title">
                        ${scheduleList[i].place}
                    </div>
                    <div class="weather-info-box">
                        <div class="weather-img">
                            <img src="img/weather/01d.svg"/>
                            <img src="img/dust/dust1.svg"/>
                        </div>
                        <div class="weather-data">
                            <span class="weather-temp">21°</span>
                            <span>날씨 <span class="weather-info">맑음</span></span>
                            <span>미세먼지 <span class="dust-info">좋음</span></span>
                        </div>
                    </div>
                </div>
                <div class="schedule-add-place">
                    <h3>메인에 장소 추가</h3>
                    <div class="switch">
                        <label class="onoff">
                        <input type="checkbox" ${placeCheck}/>
                        <span class="on"></span>
                        <span class="off"></span>
                        <span class="btn"></span>
                        </label>
                    </div>
                </div>
                <div class="alarm-setting">
                    <h3>알림 설정</h3>
                    <div class="switch">
                        <label class="onoff">
                        <input type="checkbox" ${alarmCheck}/>
                        <span class="on"></span>
                        <span class="off"></span>
                        <span class="btn"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
  `);
}
if (scheduleList.length === 0) {
  $("article").append(`
    <span>등록된 일정이 없습니다.</span>
  `);
}

// slide
var swiper = new Swiper(".swiper-container", {
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction"
  }
});

// activeSlide
for (const i in scheduleList) {
  var activeSchedule = localStorage.getItem("activeSchedule");
  if (scheduleList[i].id === activeSchedule) {
    swiper.activeIndex = i;
  }
}

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

swiper.on('slideChange',function(){
  var activeId = swiper.activeIndex
  // console.log(activeId);
  localStorage.setItem('activeSchedule',activeId);
  var scheduleList = JSON.parse(localStorage.getItem('schedule'));
  // console.log(activeId, scheduleList.length);
  
  for (let i = 0; i < scheduleList.length; i++) {
    if(i===activeId){
      var schedule = scheduleList[i];
      var scheduleLat = schedule.lat;
      var scheduleLon = schedule.lon;
      // console.log(scheduleLon, scheduleLat);
      scheduleWeather(scheduleLat,scheduleLon)
    } 
  }
})

function scheduleWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6837775ceb530bfed6734f2d737351e1&units=metric`
  )
    .then(function(response) {
      return response.json();
    }).then(function(json){
      var scheduleTemp = Math.round(json.main.temp);
      var scheduleIcon = json.weather[0].icon;
      // console.log('현재온도:' ,scheduleTemp);
      // console.log('현재날씨:' ,scheduleWeatherText);

      var scheduleWeatherText = weatherIconText[scheduleIcon];
      
      $('.weather-temp').text(scheduleTemp+'°');
      $('.weather-info').text(scheduleWeatherText);
      $('.weather-img img:nth-child(1)').attr('src',`img/weather/${scheduleIcon}.svg`)
    })
  }

  // 스와이프 이벤트 발생 미세먼지 데이터 가져오기

  swiper.on('slideChange',function(){
    var activeId = swiper.activeIndex
    localStorage.setItem('activeSchedule',activeId);
    var scheduleList = JSON.parse(localStorage.getItem('schedule'));
  
    for (let i = 0; i < scheduleList.length; i++) {
      if(i===activeId){
        var schedule = scheduleList[i];
        var scheduleLat = schedule.lat;
        var scheduleLon = schedule.lon;
        scheduleDust(scheduleLat,scheduleLon,scheduleFirst)
      } 
    }
  
    function scheduleDust(lat,lon) {
      fetch(
          `https://api.waqi.info/feed/geo:${lat};${lon}/?token=6a81e4e9dda1ab737e7b801273ec29e678c10213`
      )
      .then(function(response) {   
          return response.json();
      })
      .then(function(json) {
      
      var scheduleDust = json.data.iaqi.pm10.v ;
      console.log(scheduleDust);
      var dustValue;
      var dustImgValue;
      var dustBackColor;
          if(scheduleDust < 51){
              dustValue = '좋음'
              dustImgValue = 'dust1'
              dustBackColor = 'blue';          
          }else if(51 <= scheduleDust && scheduleDust < 101){
              dustValue = '보통',
              dustImgValue = 'dust2'     
              dustBackColor = 'green';
          }else if(101 <= scheduleDust && scheduleDust < 201){
              dustValue = '나쁨',
              dustImgValue = 'dust3'     
              dustBackColor = 'orange';
          }else{
              dustValue = '매우나쁨',
              dustImgValue = 'dust4'
              dustBackColor = 'red';
          } 
          $('.dust-info').text(dustValue);
          $('.weather-img img:nth-child(2)').attr('src',`img/${dustImgValue}.svg`);
          $('.schedule-box .schedule-weather-box').addClass(dustBackColor);
      });
    }
  })