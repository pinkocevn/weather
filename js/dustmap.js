
// 전국 날씨/미세먼지 드롭다운 
$('#drop-down').on('click',function(){
    $('.sub-title').slideToggle();
    var svalue = $('.title h1').text();
    var value = $('.sub-title').text();
    $('.sub-title').click(function(){
        $(this).prev('div').children('h1').text(value)
        $('.sub-title').hide();
        $('.sub-title').text(svalue);
    })
})

// 탭메뉴 활성화
$('nav button').click(function(){
    $('nav button').removeClass('active')
    $(this).addClass('active')
})

// Print weather
list = [
    {'name' : 'Incheon' , 'krName' : '인천' , 'id' : '1843564' },
    {'name' : 'Seoul' , 'krName' : '서울' , 'id' : '1835848'},
    {'name' : 'Chuncheon' , 'krName' : '춘천' , 'id' : '1845136' },
    {'name' : 'Gangneung' , 'krName' : '강릉' , 'id' : '1843137' },
    {'name' : 'Samcheok' , 'krName' : '울릉/독도' , 'id' : '1838069' }, 
    {'name' : 'Cheonan' , 'krName' : '백령' , 'id' : '1845759' }, 
    {'name' : 'Suwon' , 'krName' : '수원' , 'id' : '1835553' },
    {'name' : 'Cheongju' , 'krName' : '청주' , 'id' : '1845604' }, 
    {'name' : 'Andong' , 'krName' : '안동' , 'id' : '1846986' },
    {'name' : 'Daejeon' , 'krName' : '대전' , 'id' : '1835235' },
    {'name' : 'Jeonju' , 'krName' : '전주' , 'id' : '1845457' },
    {'name' : 'Daegu' , 'krName' : '대구' , 'id' : '1835329' },
    {'name' : 'Ulsan' , 'krName' : '울산' , 'id' : '1833747' },
    {'name' : 'Changwon' , 'krName' : '창원' , 'id' : '1846326' },
    {'name' : 'Jeju' , 'krName' : '제주' , 'id' : '1846266' },
    {'name' : 'Kwangju' , 'krName' : '광주' , 'id' : '1841810' },
    {'name' : 'Yeosu' , 'krName' : '여수' , 'id' : '1832157' },
    {'name' : 'Moppo' , 'krName' : '목포' , 'id' : '1841066' },
    {'name' : 'Busan' , 'krName' : '부산' , 'id' : '1838524' }
]



$(window).resize(function () {        
    $('.area > g:nth-child(2)').each(function(i){
        // console.log($(this).data('area'));
        var x=$(this).offset().left;
        var y=$(this).offset().top;
        // console.log(i,':',x+','+y);
        getDust(list[i].name,i,x,y)         
    })            
}).resize();    

function getDust(placeName,i,x,y) {
    fetch(
        `https://api.waqi.info/feed/${placeName}/?token=6a81e4e9dda1ab737e7b801273ec29e678c10213`
    )
    .then(function(response) {   
        return response.json();
    })
    .then(function(json) {
        // 미세먼지
        var getDust = json.data.iaqi.pm10.v ;
        // 초미세먼지
        var getFineDust = json.data.iaqi.pm25.v;
        console.log('미세먼지: ',getDust);
        console.log('초미세먼지: ',getFineDust);
        var dustValue;
        var fineDustValue;
    
        
        if(getDust < 30){
            dustValue = 'dust-good'         
        }else if(31 <= getDust && getDust < 50){
            dustValue = 'dust-soso';
        }else if(51 <= getDust && getDust < 100){
            dustValue = 'dust-bad';
        }else{
            dustValue = 'dust-terrible';
        } 

        if(getFineDust < 15){
            fineDustValue = 'dust-good'         
        }else if(16 <= getFineDust && getFineDust < 25){
            fineDustValue = 'dust-soso';
        }else if(26 <= getFineDust && getFineDust < 50){
            fineDustValue = 'dust-bad';
        }else{
            fineDustValue = 'dust-terrible';
        } 
        if(list[i].krName === $(`.area`).eq(i).data('area')){
            $(`[data-name="${list[i].krName}"`).remove();
            $('.weather-icon').append(`<span class="sprite-big ${dustValue}" data-name="${list[i].name}" style="left:${x}px; top:${y-10}px"></span>`);
        }   
        $('nav button').click(function(){
            if($(this).hasClass('tomorrow')){
                if(list[i].krName ===  $(`.area`).eq(i).data('area')){
                    $(`[data-name="${list[i].krName}"`).remove();
                    $('.weather-icon').append(`<span class="sprite-big ${fineDustValue}" data-name="${list[i].name}" style="left:${x}px; top:${y-10}px"></span>`);
                }
            }else{
                if(list[i].krName === $(`.area`).eq(i).data('area')){
                    $(`[data-name="${list[i].krName}"`).remove();
                    $('.weather-icon').append(`<span class="sprite-big ${dustValue}" data-name="${list[i].name}" style="left:${x}px; top:${y-10}px"></span>`);
                }   
            }
        })
    });
}

