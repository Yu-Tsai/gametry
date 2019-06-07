$(document).ready(function () {
    var w;
    var h;
    var nowDeg = 0;
    var mybullet = new Array();
    var shootbullet = new Array();
    var occupyDeg = new Array();
    var touchheight;
    var num = 0;
    var bulletcenter;
    var cirpos;

    function bulletrotate(num, bulletclass) {
        //console.log(-19 * w / h);
        shootbullet[num] = function () {
            $(bulletclass).rotate({
                angle: 0,
                animateTo: 360,
                callback: shootbullet[num],
                duration: 5000,
                center: ["50%", -190/3 + "%"],
                easing: function (x, t, b, c, d) {
                    return c * (t / d) + b;
                }
            });
        };
        shootbullet[num]();
    }
    function shoot(a) {
        var safe = 1;
        for (var i = 0; i < occupyDeg.length; i++) {
            if ((nowDeg[0] < occupyDeg[i] + 10) && (nowDeg[0] > occupyDeg[i] - 10)) {
                $(".nowbullet").stop(true, false).animate({ top: "100%" }, 100, 'linear', function () {
                    $(".nowbullet").remove();
                });
                console.log(nowDeg[0]);
                safe = 0;
            }
        }
        if (safe == 1) {
            occupyDeg.push(nowDeg[0]);
            $(".nowbullet").attr("id","newbullet" + a);
            $(".nowbullet").addClass("bulletoncir");
            $(".nowbullet").removeClass("nowbullet");
            //clearInterval(touchcheck);
            $(".bulletoncir").css({
                "top": w * 0.69
            })
            var newclass = "#newbullet" + a;
            var newobject = $(newclass);
            bulletrotate(a, newobject);
            $("#gamebase2").append("<div class=\"bullet nowbullet\">\
                <img src=\"bullet.png\" class=\"bullet_img\"/>\
            </div>");
            $(".nowbullet").css({
                "top": w * 1.2,
                "left": w * 0.475
            })
            $(".bullet").css({
                "height": w * 0.3
            })
            console.log(occupyDeg);
        }
    }

    if ($(window).height() >= $(window).width()) {
        w = $(window).width();
        h = $(window).height();
    } else {
        h = $(window).width();
        w = $(window).height();
    }
    cirpos = w * 0.3;
    bulletcenter = -19 * w / h;

    $("#gamepage2").css({
        "top": 0,
        "left": 0,
        "width": w,
        "height": h
    })
    $("#circle").css({
        "left": cirpos,
        "top": cirpos,
        "height": $("#circle").width()
    })
    $(".bullet").css({
        "height": w * 0.3
    })
    $(".nowbullet").css({
        "top": w * 1.2,
        "left": w * 0.475
    })
    if ($(window).height() < $(window).width()) {
        $("#gamepage2").css({
            "top": "100%",
            "transform": "rotate(-90deg)",
            "transform-origin": "0 0"
        })
    }

    (function () {
        $(window).resize(function () {
            if ($(window).height() >= $(window).width()) {
                $("#gamepage2").css({
                    "top": 0,
                    "left": 0,
                    "transform": "",
                    "transform-origin": ""
                })
            } else {
                $("#gamepage2").css({
                    "top": "100%",
                    "transform": "rotate(-90deg)",
                    "transform-origin": "0 0"
                })
            }
            if ($(window).height() >= $(window).width()) {
                w = $(window).width();
                h = $(window).height();
            } else {
                h = $(window).width();
                w = $(window).height();
            }
            cirpos = w * 0.3;
            bulletcenter = -19 * w / h;

            $("#gamepage2").css({
                "width": w,
                "height": h
            })
            $("#circle").css({
                "left": cirpos,
                "top": cirpos,
                "height": $("#circle").width()
            })
            $(".bullet").css({
                "height": w * 0.3
            })
            $(".nowbullet").css({
                "left": w * 0.475
            })
            $(".bulletoncir").css({
                "top": w * 0.69
            })
        });
    })();

    (function rotation() {
        $("#circle").rotate({
            angle: 0,
            animateTo: 360,
            callback: rotation,
            duration: 5000,
            center: ["50%", "50%"],
            easing: function (x, t, b, c, d) {        // t: current time, b: begInnIng value, c: change In value, d: duration
                return c * (t / d) + b;
            }
        });
    })();

    (function () {
        setInterval(function () {
            nowDeg = $("#circle").getRotateAngle();
        }, 0);
    })();

    $("#gamebase2").on('click', '.nowbullet', function () {
        $(".nowbullet").stop().animate({ top: w * 0.69 }, 100, 'linear', function () {
            shoot(num);
            num++;
        });
        touchheight = $("#gamebase2").width() * 0.99;
        var touchcheck = setInterval(function () {
            if (parseInt($(".nowbullet").css("top")) < touchheight) {
                for (var i = 0; i < occupyDeg.length; i++) {
                    if ((nowDeg[0] < occupyDeg[i] + 3) && (nowDeg[0] > occupyDeg[i] - 3)) {
                        $(".nowbullet").stop(true, false).animate({ top: "100%" }, 100, 'linear', function () {
                            $(".nowbullet").remove();
                        });
                        clearInterval(touchcheck);
                        console.log(nowDeg[0]);
                    }
                }
            }
        }, 0);
    });
});




/*(function () {
        $(".nowbullet").stop().animate({ top: 0 }, 10000, 'linear');
    })();*/




/*$(window).on("orientationchange", function (event) {
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
});*/