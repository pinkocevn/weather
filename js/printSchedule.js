var height = $(window).innerHeight() - 445;
$(".schedule-box").css("height", height);

//calender
$("#calendar").datepicker({
  inline: true,
  showOtherMonths: true,
  selectOtherMonths: false,
  dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ]
});
$("#calendar").swipe({
  swipeRight: function() {
    $("#calendar")
      .find("[data-handler='prev']")
      .click();
      printSchedule();
  },
  swipeLeft: function() {
    $("#calendar")
      .find("[data-handler='next']")
      .click();
      printSchedule();
  }
});

function getSchedule() {
  var getSchedule = localStorage.getItem("schedule");
  return JSON.parse(getSchedule);
}

// print schedule
function printSchedule() {
  var schedule = getSchedule();
  if (schedule === null) {
    schedule = [];
  }
  if (schedule.length === 0) {
    $(".schedule-box").append(`
        <div class="no-schedule">
            <span>등록된 일정이 없습니다.</span>
        </div>
    `);
  } else {
    $(".schedule-box").empty();
    schedule.forEach(el => {
      var startdate=el.startDate.split('/');

      $(".schedule-box").append(`
        <div class="schedule" data-id="${el.id}">
            <div>
                <div class="schedule-color" style="background-color:${el.color};"></div>
                <a href="schedule-detail.html" class="schedule-text">
                    <h2>${el.title}</h2>
                    <span class="schedule-date">${el.date}</span>
                    <span class="schedule-place">${el.place}</span>
                </a>
            </div>
            <i class="material-icons schedule-bell">${el.alarmSet}</i> 
        </div>
      `);
      
      $('.ui-datepicker-calendar td:not(.ui-state-disabled)').each(function(){                
        var year=$(this).data('year');
        var month=$(this).data('month')+1;
        var date=$(this).find('a').text();
        if(startdate[0]==year && startdate[1]==month && startdate[2]==date){          
          $(this).append(`<span class="schedule-day-dot" style="background:${el.color}"></span>`);
        }
      })
    });
  }
}
printSchedule();

$(document).on("click", ".schedule-text", function() {
  var activeSchedule = $(this)
    .parents(".schedule")
    .data("id");
  localStorage.setItem("activeSchedule", activeSchedule);
});
