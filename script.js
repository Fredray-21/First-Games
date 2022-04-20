var mots = "socialite";

$("document").ready(function () {
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
        good ? $(this).css("background-color","green") : ($(this).css("opacity", "0.5"), $(this).css("background-color","lightcoral"));
    });
});