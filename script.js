var mots = "socialite";
var pendue = 0;
$("document").ready(function () {
    pendue == 5 ? $("#bar-bottom,#bar-vertical,#bar-top,#bar-corner,#bar-corde").css("display", "block") : false;
    mots.split("").forEach((e) => {
        $("#row-align-bottom").append("<div class='letter' data-id='" + e.toLocaleUpperCase() + "'></div>");
    });

    $(".key").click(function () {
        var key = $(this).text();
        var good = false;

        $("#row-align-bottom .letter").each(function () {
            (key == $(this).data("id")) ? ($(this).text(key), good = true) : false;
        });

        $(this).unbind("click");
        $(this).css("cursor", "not-allowed");
        good ? $(this).css("background-color", "green") : ($(this).css("opacity", "0.5"), $(this).css("background-color", "lightcoral"), pendue++, pendu());
    });

    function pendu() {
        console.log(pendue);
        switch (pendue) {
            case 1: $("#bar-bottom").css("display", "block"); break;
            case 2: $("#bar-vertical").css("display", "block"); break;
            case 3: $("#bar-top").css("display", "block"); break;
            case 4: $("#bar-corner").css("display", "block"); break;
            case 5: $("#bar-corde").css("display", "block"); break;
            case 6: $("#bar-head").css("display", "block"); break;
            case 7: $("#bar-body").css("display", "block"); break;
            case 8: $("#bar-armL").css("display", "block"); break;
            case 9: $("#bar-armR").css("display", "block"); break;
            case 10: $("#bar-legL").css("display", "block"); break;
            case 11: $("#bar-legR").css("display", "block"); break;
        }
    }
});

