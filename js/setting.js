$(".switch input").click(function() {
  if ($(this).attr("id") === "setting-btn-01") {
    $(".noti-check-1").toggleClass("active");
  } else {
    $(".noti-check-2").toggleClass("active");
  }
});

$("header button").click(function() {
  var settingBtn1 = $("#setting-btn-01").is(":checked");
  var settingBtn2 = $("#setting-btn-02").is(":checked");
  var setAlarm = {
    weather: settingBtn1,
    maskUmbrella: settingBtn2
  };
  setActiveAlarm(setAlarm);
});

function setActiveAlarm(activeAlarm) {
  var setAlarm = JSON.stringify(activeAlarm);
  localStorage.setItem("activeAlarm", setAlarm);
}

function getActiveAlarm() {
  var getAlarm = localStorage.getItem("activeAlarm");
  return JSON.parse(getAlarm);
}

function init() {
  var getAlarm = getActiveAlarm();
  if (getAlarm.weather === true) {
    $(".noti-check-1").addClass("active");
    $("#setting-btn-01").attr("checked", true);
  }
  if (getAlarm.maskUmbrella === true) {
    $(".noti-check-2").addClass("active");
    $("#setting-btn-02").attr("checked", true);
  }
}
init();
