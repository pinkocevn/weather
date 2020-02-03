// search-place
var places = new kakao.maps.services.Places();
var callback = function(result, status) {
  if (status === kakao.maps.services.Status.OK) {
    result.forEach(el => {
      $(".place-list").append(`
        <li>
          <small>${el.place_name}</small>
          <a href="#" data-x="${el.x}" data-y="${el.y}">${el.address_name}</a>
        </li>
      `);
    });
  }
};

// schedule
$(".schedule-search-place button").click(function() {
  var searchPlace = $("#address").val();
  if (searchPlace === "") {
    alert("장소를 입력해주세요.");
    $("#searchbox").focus();
  } else {
    $(".place-list").empty();
    $(".place-list-box").slideDown();
    places.keywordSearch(searchPlace, callback);
  }
});

$(".schedule-search-place .place-list").on("click", "li a", function(e) {
  e.preventDefault();
  var lon = $(this).data('x');
  var lat = $(this).data('y');
  var savePlace = $(this).text();
  $("#address").val(savePlace);
  $('#address').attr('data-x',lon);
  $('#address').attr('data-y',lat);
  $(".place-list-box").slideUp();
});

// area
$(".area-search button").click(function(e) {
  e.preventDefault();
  var searchPlace = $("#searchbox").val();
  if (searchPlace === "") {
    alert("장소를 입력해주세요.");
    $("#searchbox").focus();
  } else {
    $(".place-list").empty();
    $(".place-list-box").slideDown();
    places.keywordSearch(searchPlace, callback);
  }
});

$(".area-search .place-list").on("click", "li a", function(e) {
  e.preventDefault();
  var lon = $(this).data('x');
  var lat = $(this).data('y');
  var saveArea = $(this).text();
  saveArea = saveArea.split(" ");
  saveArea = saveArea[1] + " " + saveArea[2];
  $(".place-list-box").slideUp();
  $("#searchbox").val("");
  var date = new Date().toLocaleDateString();
  var time = new Date().toLocaleTimeString();
  var id = date + time;
  var area = {
    id: id,
    area: saveArea,
    lat: lat,
    lon: lon
  };
  var areaList = getArea();
  if (areaList === null) {
    areaList = [];
    areaList.push(area);
    setArea(areaList);
    printArea(areaList);
  } else {
    areaList.push(area);
    setArea(areaList);
    printArea(areaList);
  }
});

// delete-all
$('.area-title button').click(function(){
  if($('.area-title button').text() ==='delete_outline'){
      alert('삭제할 지역이 없습니다.')
  }else{
      $('.popup-bg').show();
      $('.popup-delete').show();
  }
})
$('.popup-delete button').click(function(){
  if($(this).hasClass('no')){
      $('.popup-bg').hide();
      $('.popup-delete').hide();
  }else{ //delete-all
      var resetArea = '[]';
      localStorage.setItem('area',resetArea);
      $('.area-list ul').empty();
      $('.area-list ul').append(`
          <li><p>등록된 지역이 없습니다.</p></li>
      `);
      $('.area-title button').text('delete_outline');
      $('.popup-bg').hide();
      $('.popup-delete').hide();
  }
})

// delete-self
$('.area-list').on('click','li button',function (e) {
  e.preventDefault();
  var id = $(this).closest('li').data('id');
  var getAreaList = getArea();
  for (const i in getAreaList) {
    if(getAreaList[i].id === id){
      getAreaList.splice(i,1);
      break;
    }
  }
  setArea(getAreaList);
  printArea(getAreaList);
})

function setArea(area) {
  var saveArea = JSON.stringify(area);
  localStorage.setItem("area", saveArea);
}

function getArea() {
  var getArea = localStorage.getItem("area");
  return JSON.parse(getArea);
}

function printArea(area) {
  $(".area-list ul").empty();

  if (area.length === 1) {
    $(".area-list ul").append(`
      <li><p>등록된 지역이 없습니다.</p></li>
    `);
    $(".area-title button").text("delete_outline");
  } else {
    $(".area-title button").text("delete");
    for (let i = 1; i < area.length; i++) {
      $(".area-list ul").append(`
        <li data-id="${area[i].id}"><a href="#"><span></span>${area[i].area}</a><button>삭제</button></li>
      `); 
    }
  }
  touchEvent();
}

// touchEvent
function touchEvent(){
  $('.area-list li').touch({
      trackDocument:false,
      trackDocumentNormlize:false,
      preventDefault:{
      swipe:false,
      tap:false
      }
  }).on('swipeLeft', function(){
      $('.area-list li').removeClass();   
      $(this).addClass('left'); 
  }).on('tap',function(){
      $('.area-list li').removeClass();   
  })
}

var initArea = getArea();
printArea(initArea);