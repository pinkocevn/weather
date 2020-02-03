if(!$('body').hasClass()){
    changeBodyClass();
}

$('.font-size-wrap [type=radio]').change(function(){
    var btnFontSize = $(this).attr('value');
    var fontSize = {
        "class":`font-size${btnFontSize}`,
        "fontSize":btnFontSize
    }
    saveFontSize(fontSize);
    changeBodyClass();
})

function saveFontSize(size){
    var fontSize = JSON.stringify(size);
    localStorage.setItem('fontsize',fontSize);
}

function getFontSize(){
    var getFontSize = localStorage.getItem('fontsize');
    return changeFont = JSON.parse(getFontSize);
}

function changeBodyClass(){
    var fontSize = getFontSize();
    if(fontSize === null){
        var className = 'font-size16';
    }else{
        var className = fontSize.class;
    }
    $('body').removeClass();
    $('body').addClass(className);
    if (className ==='font-size15') {
        $('#font-size-check-1').attr('checked', true);
    }else if (className ==='font-size16') {
        $('#font-size-check-2').attr('checked', true);
    }else if (className ==='font-size17') {
        $('#font-size-check-3').attr('checked', true);
    }else{
        $('#font-size-check-4').attr('checked', true);
    }
}
