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

// schedule-submit
$("#schedule-submit").click(function() {
  var title = $(".schedule-title").val();
  var place = $(".schedule-place").val();
  var splitPlace = place.split(" ");
  splitPlace = splitPlace[1] + " " + splitPlace[2];
  var startDate = $(".start-date").val();
  var splitStartDate = startDate.split('/');
  splitStartDate = splitStartDate[1]+'/'+splitStartDate[2];
  var endDate = $(".end-date").val();
  splitEndDate = endDate.split('/');
  splitEndDate =  splitEndDate[1]+'/'+splitEndDate[2];
  var date;
  if (startDate === endDate) {
    date = splitStartDate;

  } else {
    date = `${splitStartDate} ~ ${splitEndDate}`;
  }

  var color = $(".color-palette button.active").data("color");
  var addPlace = $("#setting-btn-01").is(":checked");
  var alarmSet = $("#setting-btn-02").is(":checked");
  if (alarmSet === true) {
    alarmSet = "notifications";
  } else {
    alarmSet = "notifications_off";
  }
  var idDate = new Date().toLocaleDateString();
  var idTime = new Date().toLocaleTimeString();
  var id = idDate + idTime;
  var lat=$('#address').data('y');
  var lon=$('#address').data('x');

  if (title === "" || place === "" || startDate === "" || color === undefined) {
    alert("빈칸을 모두 채워주세요.");
  } else {
    var scheduleObj = {
      id: id,
      title: title,
      place: splitPlace,
      orgPlace: place,
      startDate: startDate,
      endDate: endDate,
      date: date,
      color: color,
      addPlace: addPlace,
      alarmSet: alarmSet,
      lat:lat,
      lon:lon
    };

    var scheduleList = getSchedule();
    if (scheduleList === null) {
      scheduleList = [];
      scheduleList.push(scheduleObj);
      setSchedule(scheduleList);
    } else {
      scheduleList.push(scheduleObj);
      setSchedule(scheduleList);
    }
    history.back();
  }
});

$("#fromDate").datepicker({
  minDate: 0,
  onSelect: function() {
    var dateValue = $(this).val();
    $(".end-date").val(dateValue);
  },
  dateFormat: "yy/m/d",
  onClose: function(selectedDate) {
    $("#toDate").datepicker("option", "minDate", selectedDate);
  },
  beforeShow: function () {
    setTimeout(calendarMove)
  }
});

$("#toDate").datepicker({
  minDate: 0,
  dateFormat: "yy/m/d",
  onClose: function(selectedDate) {
    $("#fromDate").datepicker("option", "maxDate", selectedDate);
  },
  beforeShow: function () {
    setTimeout(calendarMove)
  }
});

function calendarMove(){
  var windowHalf = $(window).width()/2;
  var datepickerWidth = $("#ui-datepicker-div").width()/2;
  var move = windowHalf - datepickerWidth -3;
  $("#ui-datepicker-div").css({"left":move});
}

$(window).resize(function() {
  calendarMove();
})

function setSchedule(scheduleObj) {
  var schedule = JSON.stringify(scheduleObj);
  localStorage.setItem("schedule", schedule);
}

function getSchedule() {
  var getSchedule = localStorage.getItem("schedule");
  return JSON.parse(getSchedule);
}
