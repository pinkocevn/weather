
// 전국 날씨/미세먼지 드롭다운 
$('#drop-down').on('click',function(){
    $('.sub-title').slideToggle();
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
    {'name' : 'Reisui' , 'krName' : '여수' , 'id' : '1832157' },
    {'name' : 'Moppo' , 'krName' : '목포' , 'id' : '1841066' },
    {'name' : 'Busan' , 'krName' : '부산' , 'id' : '1838524' }
]



$(window).resize(function () {        
    $('.area > g:nth-child(2)').each(function(i){
        // console.log($(this).data('area'));
        var x=$(this).offset().left;
        var y=$(this).offset().top;
        // console.log(i,':',x+','+y);
        getWeather(list[i].id,i,x,y)   
    })            
}).resize();    


function getWeather(cityId,i,x,y) {
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=b4b745506e8e239cd263749221560315&units=metric`
    )
    .then(function(response) {   
        return response.json();
    })
    .then(function(json) {
    // console.log("현재온도 : "+ (json.list[0].main.temp) );
    // console.log("내일온도 : "+ (json.list[1].main.temp) );
    // console.log("날씨 : "+ json.list[0].weather[0].main );
    // console.log("도시이름  : "+ json.city.name );

    var getTemp = Math.round(json.list[0].main.temp) ;
    var getTempTom = Math.round(json.list[8].main.temp) ;

    var getWeather = json.list[0].weather[0].icon ;
    var getWeatherTom = json.list[8].weather[0].icon ;
        // console.log('테스트');

    console.log(json);
    // console.log(i);
    

    // console.log($(`g.area:nth-of-type(2)`)[0]);

        // for (let i = 0; i < list.length; i++) {
            if(list[i].krName === $(`.area`).eq(i).data('area')){
                // console.log( 'find',$(`g.area:nth-of-type(${i+2})`).find('g:nth-child(3)')[0]);
                // console.log( 'children',$(`g.area:nth-of-type(${i+2})`).children('g:nth-child(3)')[0]);
                $(`.area`).eq(i).find('g:last-child text').text(`${getTemp}`);  
                
                $(`[data-name="${list[i].krName}"`).remove();
                
                $('.weather-icon').append(`<span class="sprite-big sprite-${getWeather}" data-name="${list[i].krName}" style="left:${x}px; top:${y-10}px"></span>`);
            }   
        // }   
        // $('.tommrrow').click(function(){
        //     if(list[i].krName === $(`.area`).eq(i).data('area')){
        //         // console.log( 'find',$(`g.area:nth-of-type(${i+2})`).find('g:nth-child(3)')[0]);
        //         // console.log( 'children',$(`g.area:nth-of-type(${i+2})`).children('g:nth-child(3)')[0]);
        //         $(`.area`).eq(i).find('g:last-child text').text(`${getTempTom}`);  
                
        //         $(`[data-name="${list[i].krName}"`).remove();
                
        //         $('.weather-icon').append(`<span class="sprite-big sprite-${getWeatherTom}" data-name="${list[i].krName}" style="left:${x}px; top:${y-10}px"></span>`);
        //     }   
        // })
        
        $('nav button').click(function(){
            if($(this).hasClass('tomorrow')){
                if(list[i].krName === $(`.area`).eq(i).data('area')){
                    // console.log( 'find',$(`g.area:nth-of-type(${i+2})`).find('g:nth-child(3)')[0]);
                    // console.log( 'children',$(`g.area:nth-of-type(${i+2})`).children('g:nth-child(3)')[0]);
                    $(`.area`).eq(i).find('g:last-child text').text(`${getTempTom}`);  
                    
                    $(`[data-name="${list[i].krName}"`).remove();
                    
                    $('.weather-icon').append(`<span class="sprite-big sprite-${getWeatherTom}" data-name="${list[i].krName}" style="left:${x}px; top:${y-10}px"></span>`);
                }   
            }else{
                if(list[i].krName === $(`.area`).eq(i).data('area')){
                    // console.log( 'find',$(`g.area:nth-of-type(${i+2})`).find('g:nth-child(3)')[0]);
                    // console.log( 'children',$(`g.area:nth-of-type(${i+2})`).children('g:nth-child(3)')[0]);
                    $(`.area`).eq(i).find('g:last-child text').text(`${getTemp}`);  
                    
                    $(`[data-name="${list[i].krName}"`).remove();
                    
                    $('.weather-icon').append(`<span class="sprite-big sprite-${getWeather}" data-name="${list[i].krName}" style="left:${x}px; top:${y-10}px"></span>`);
                }   
            }
        })
    });
}