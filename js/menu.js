$(function () {
    $('#toggle-off').click(function () {
        $('#toggle-off').css('display', 'none');
        $('#toggle-on').css('display', 'block');
        $('.toggle-menu').css('display', 'block');
        $('.content').css('display', 'none');
        $('html, body').css('background', '#111')
        $('html, body').animate( { scrollTop : 0 }, 0 );
    });
    $('#toggle-on').click(function () {
        $('#toggle-on').css('display', 'none');
        $('#toggle-off').css('display', 'block');
        $('.toggle-menu').css('display', 'none');
        $('.content').css('display', 'block');
        $('html, body').css('background', "linear-gradient( to right, #070707 10%, #0a0a0a 20%, #0f0f0f 30%, #121212 40%, #151515 50%, #171717 60%, #1a1a1a 70%, #1c1c1c 80%, #1f1f1f 90%, #212121 100%)");
    });
});