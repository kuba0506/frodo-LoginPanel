//=========================== Scroll =============================//
$('#ToTop').hide();
$(window).scroll(function(){
    if($(this).scrollTop() > 300) {
        $('#scrollToTop').fadeIn();
    } else 
    {
        $('#scrollToTop').fadeOut();
    }
});//scroll

$('#scrollToTop').click(function(){
    $('html,body').animate({scrollTop:0},500);
});