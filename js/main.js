// header place
$(document).on("click", ".header-place", function() {
  var getPlace = localStorage.getItem("area");
  getPlace = JSON.parse(getPlace);

  if (getPlace.length !== 1) {
    $(".popup-bg").show();
    $(".popup-place").show();
  }
});

// header share
$(document).on("click", ".header-icons button:first-child", function() {
  $('body').html2canvas({ 
    onrendered: function (canvas) { 
        var img=canvas.toDataURL("image/png");
        $("#theimage").attr('src',img)
        $('.popup-bg').show();
        $('.popup-share').show();
    } 
  }); 
});
$(".popup-share .btn-group button").click(function() {
  $(".popup-bg").hide();
  $(".popup-share").hide();
});

// header menu
$(".header-menu").click(function() {
  $(".nav-main-menu").css("left", 0);
  $(".popup-bg").show();
  $(".popup-bg").click(function() {
    $(".nav-main-menu").css("left", -280);
    $(".popup-bg").hide();
  });
});

$('.nav-main-menu').swipe({
  swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      if( direction == "left" ){
          $(".nav-main-menu").css("left", -280);
          $(".popup-bg").hide();
      }
  }
});

// weekly tab-menu
$(document)
  .on("click", ".weather-weekly ul li a", function() {
    var selector = $(this).attr("href");
    selector=selector.replace('#','.');
    $(this)
    .parents("ul")
    .children("li")
    .removeClass("active");
  $(this)
    .parent()
    .addClass("active");
  $(this)
    .parents(".weather-weekly")
    .find(".weather-tab-contents")
    .children()
    .hide();
  $(this)
    .parents('.weather-weekly')
    .find(selector)
    .show();
  });

