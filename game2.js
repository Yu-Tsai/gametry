var w;
var h;

if ($(window).height() >= $(window).width()) {
    w = $(window).width();
    h = $(window).height();
} else {
    h = $(window).width();
    w = $(window).height();
}

$(document).ready(function () {

    (function () {
        setInterval(function () {
            if ($(window).height() >= $(window).width()) {
                w = $(window).width();
                h = $(window).height();
            } else {
                h = $(window).width();
                w = $(window).height();
            }
            
            $("#gamepage2").css({
                "top": 0,
                "left": 0,
                "width": w,
                "height": h
            })
            $("#circle").css({
                "top": $("#circle").position().left,
                "height": $("#circle").width()
            })
            $(".bullet").css({
                "height": w * 0.3
            })
            $(".nowbullet").css({
                "top": w * 1.2,
                "left": w * 0.475
            })
        }, 500);
    })();

    $(window).on("orientationchange", function (event) {
        console.log(event.orientation);
        if (event.orientation == "landscape") {
            $("#gamepage2").css({
                "top": "100%",
                "transform": "rotate(-90deg)",
                "transform-origin": "0 0"
            })
        } else {
            $("#gamepage2").css({
                "top": 0,
                "left": 0,
                "transform": "",
                "transform-origin": ""
            })
        }
    });

    (function () {
        $(".nowbullet").stop().animate({ top: 0 }, 10000, 'linear');
    })();
});
