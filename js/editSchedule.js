// check color-palette
$(".color-palette button").click(function() {
  $(".color-palette button").removeClass("active");
  $(".color-palette button").html("");
  $(this).addClass("active");
  if ($(".color-palette button").hasClass("active")) {
    $(this).html(`<i class="material-icons-round">check</i>`);
  }
});

// toggle-btn
$("input:checkbox[id='setting-btn-02']").click(function() {
  if ($(this).prop("checked")) {
    $(".noti-check-2 .round-box").addClass("active");
  } else {
    $(".noti-check-2 .round-box").removeClass("active");
  }
});

// edit schedule
var editScheduleId = localStorage.getItem("editSchedule");
var getSchedule = getSchedule();

getSchedule.forEach(i => {
  if (i.id === editScheduleId) {
    $(".schedule-title").val(i.title);
    $(".start-date").val(i.startDate);
    $(".end-date").val(i.endDate);
    $(".schedule-place").val(i.orgPlace);
    $(".color-palette")
      .find(`[data-color="${i.color}"]`)
      .addClass("active");
    $(".color-palette button.active").html(
      `<i class="material-icons-round">check</i>`
    );
    if (i.addPlace === true) {
      $("#setting-btn-01").attr("checked", true);
    }
    if (i.alarmSet === "notifications") {
      $("#setting-btn-02").attr("checked", true);
      $(".round-box").addClass("active");
    }
    $("#schedule-submit").click(function() {
      getSchedule.forEach(i => {
        if (i.id === editScheduleId) {
          i.title = $(".schedule-title").val();
          var place = $(".schedule-place").val();
          var splitPlace = place.split(" ");
          splitPlace = splitPlace[1] + " " + splitPlace[2];
          i.place = splitPlace;
          i.orgPlace = place;
          var startDate = $(".start-date").val();
          i.startDate = startDate;
          var endDate = $(".end-date").val();
          i.endDate = endDate;
          if (startDate === endDate) {
            i.date = startDate;
          } else {
            i.date = `${startDate} ~ ${endDate}`;
          }
          i.color = $(".color-palette button.active").data("color");
          i.addPlace = $("#setting-btn-01").is(":checked");
          var alarmSet = $("#setting-btn-02").is(":checked");
          if (alarmSet === true) {
            i.alarmSet = "notifications";
          } else {
            i.alarmSet = "notifications_off";
          }
          if (
            $(".schedule-title").val() === "" ||
            $(".schedule-place").val() === ""
          ) {
            alert("빈칸을 모두 채워주세요.");
          }
        }
      });
      setSchedule(getSchedule);
      history.back();
    });
  }
});

// datepicker
$(".datepicker").datepicker({
  onSelect: function() {
    var dateValue = $(this).val();
    $(".end-date").val(dateValue);
  },
  dateFormat: "m/d"
});

function setSchedule(scheduleObj) {
  var schedule = JSON.stringify(scheduleObj);
  localStorage.setItem("schedule", schedule);
}

function getSchedule() {
  var getSchedule = localStorage.getItem("schedule");
  return JSON.parse(getSchedule);
}
