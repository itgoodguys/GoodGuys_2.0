import '../../css/components/_custom-cursor.scss';

/************************************
when hovering over any links we add / remove is larger class
************************************/
$('a, .faq_accordion-question, .contact-form-submit-button, .footer_submit-button, .testimonials-card').on('mouseenter', function(){
    $('.cursor_dot').addClass('is-larger');
});

$('a, .faq_accordion-question, .contact-form-submit-button, .footer_submit-button, .testimonials-card').on('mouseleave', function(){
    $('.cursor_dot').removeClass('is-larger');
});

/************************************
 add yellow color when hovering links on dark page
************************************/
$('.dark-background a').on('mouseenter', function(){
    $('.cursor_dot').addClass('cursor-yellow');
});

$('.dark-background a').on('mouseleave', function(){
    $('.cursor_dot').removeClass('cursor-yellow');
});

/************************************
 scale down the mouse a bit when clicking
************************************/
$('body').on('mousedown', function(){
  $('.cursor_dot').css('transform', 'scale(0.9)');
});

$('body').on('mouseup', function(){
  $('.cursor_dot').css('transform', 'scale(1)');
});



/************************************
 hover over pink section
************************************/
$('[custom-cursor]').on('mouseenter', function(){
    let cursorColor = $(this).attr('cursor-color');
    let cursorText = $(this).attr('cursor-text');

    $('.cursor_dot').css('background-color', cursorColor);
    // Check if the URL contains '/en/'
    if (window.location.href.indexOf('/en/') !== -1 && cursorText.trim().toLowerCase() === "se mer") {
        cursorText = "view";
    }
    $('.cursor-text').text(cursorText);

    $('.cursor_dot').addClass('custom-cursor');
    $('.cursor').addClass('custom-cursor');
    $('.cursor-text').addClass('custom-cursor');
});

$('[custom-cursor]').on('mouseleave', function(){
    $('.cursor_dot').css('background-color', '#fff');
    $('.cursor-text').text('');

    $('.cursor_dot').removeClass('custom-cursor');
    $('.cursor').removeClass('custom-cursor');
    $('.cursor-text').removeClass('custom-cursor');
});






