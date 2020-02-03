$(function(){
   var swiper1 = new Swiper('.second', {
      autoplay: {
        delay: 1400,
        disableOnInteraction: false,
      }
    });

    var swiper2 = new Swiper('.first', {
      pagination: {
        el: '.swiper-pagination',
      },
    });
  })
