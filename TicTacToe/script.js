var joueurActif = "&#x2715;";
var partieFinie = false;
// &#9711; = white circle
//&#x2715; = red close
$("document").ready(function () {
    $("#info").html("C'est au tour de <span>" + joueurActif + "</span> de jouer");
    AddEventClick();
    $("#reload").click(function () {
        newPartie();
    });
});

function AddEventClick() {
    $("#main .row div").click(function () {
        if ($(this).html() == "") {
            setIcon(this, joueurActif);
            partieFinie = isAWinner(this)
            partieEnd();
        }
    });
}

function newPartie() {
    AddHistory();
    $("#reload").css("display", "none");
    $("#main .row div").html("");
    $("#main .row div").css("background-color", "");
    joueurActif = "&#x2715;";
    $("#info").html("C'est au tour de <span>" + joueurActif + "</span>  de jouer");
    AddEventClick();

}


function setIcon(div, icon) {
    $(div).html(icon);
    icon == "&#x2715;" ? backgroundColor = "lightcoral" : backgroundColor = "lightgreen";
    $(div).css("background-color", backgroundColor);
}

function isAWinner(actual) {
    var buttons = $("#main .button");
    var indexActif;
    var egalite = 0;
    for (var i = 0, len = buttons.length; i < len; i++) {
        if (buttons[i] == actual) {
            indexActif = i;
        }
        if (buttons[i].innerHTML != "") egalite++;
    }

    switch (indexActif) {
        case 0: if (buttons[0] != "" && (buttons[0].innerHTML == buttons[1].innerHTML && buttons[1].innerHTML == buttons[2].innerHTML) || (buttons[0].innerHTML == buttons[3].innerHTML && buttons[3].innerHTML == buttons[6].innerHTML) || (buttons[0].innerHTML == buttons[4].innerHTML && buttons[4].innerHTML == buttons[8].innerHTML)) return true; break;
        case 1: if (buttons[1] != "" && (buttons[1].innerHTML == buttons[0].innerHTML && buttons[0].innerHTML == buttons[2].innerHTML) || (buttons[1].innerHTML == buttons[4].innerHTML && buttons[4].innerHTML == buttons[7].innerHTML)) return true; break;
        case 2: if (buttons[2] != "" && (buttons[2].innerHTML == buttons[1].innerHTML && buttons[1].innerHTML == buttons[0].innerHTML) || (buttons[2].innerHTML == buttons[4].innerHTML && buttons[4].innerHTML == buttons[6].innerHTML) || (buttons[2].innerHTML == buttons[5].innerHTML && buttons[5].innerHTML == buttons[8].innerHTML)) return true; break;
        case 3: if (buttons[3] != "" && (buttons[3].innerHTML == buttons[4].innerHTML && buttons[4].innerHTML == buttons[5].innerHTML) || (buttons[3].innerHTML == buttons[0].innerHTML && buttons[0].innerHTML == buttons[6].innerHTML)) return true; break;
        case 4: if (buttons[4] != "" && (buttons[4].innerHTML == buttons[3].innerHTML && buttons[3].innerHTML == buttons[5].innerHTML) || (buttons[4].innerHTML == buttons[1].innerHTML && buttons[1].innerHTML == buttons[7].innerHTML) || (buttons[4].innerHTML == buttons[0].innerHTML && buttons[0].innerHTML == buttons[8].innerHTML) || (buttons[4].innerHTML == buttons[2].innerHTML && buttons[2].innerHTML == buttons[6].innerHTML)) return true; break;
        case 5: if (buttons[5] != "" && (buttons[5].innerHTML == buttons[2].innerHTML && buttons[2].innerHTML == buttons[8].innerHTML) || (buttons[5].innerHTML == buttons[4].innerHTML && buttons[4].innerHTML == buttons[3].innerHTML)) return true; break;
        case 6: if (buttons[6] != "" && (buttons[6].innerHTML == buttons[7].innerHTML && buttons[7].innerHTML == buttons[8].innerHTML) || (buttons[6].innerHTML == buttons[0].innerHTML && buttons[0].innerHTML == buttons[3].innerHTML) || (buttons[6].innerHTML == buttons[4].innerHTML && buttons[4].innerHTML == buttons[2].innerHTML)) return true; break;
        case 7: if (buttons[7] != "" && (buttons[7].innerHTML == buttons[4].innerHTML && buttons[4].innerHTML == buttons[1].innerHTML) || (buttons[7].innerHTML == buttons[6].innerHTML && buttons[6].innerHTML == buttons[8].innerHTML)) return true; break;
        case 8: if (buttons[8] != "" && (buttons[8].innerHTML == buttons[7].innerHTML && buttons[7].innerHTML == buttons[6].innerHTML) || (buttons[8].innerHTML == buttons[2].innerHTML && buttons[2].innerHTML == buttons[5].innerHTML) || (buttons[8].innerHTML == buttons[0].innerHTML && buttons[0].innerHTML == buttons[4].innerHTML)) return true; break;
    }
    if (egalite == 9) return "equal";
}

function partieEnd() {
    if (partieFinie == "equal") {
        $("#info").html("Parti fini, egalite");
        $("#main .row div").unbind("click");
        $("#reload").fadeIn(900);
    } else if (partieFinie) {
        $("#info").html("Parti fini Winner: " + joueurActif);
        $("#main .row div").unbind("click");
        $("#reload").fadeIn(900);

        icon = "croix";


        if(joueurActif == "&#9711;") icon = "rond";
        $("#"+icon+" .nbPoint").html(parseInt($("#"+icon+" .nbPoint").html())+1);


    } else {
        joueurActif == "&#x2715;" ? joueurActif = "&#9711;" : joueurActif = "&#x2715;";
        $("#info").html("C'est au tour de <span>" + joueurActif + "</span>  de jouer");
    }
}

function AddHistory() {
    var nbHistory = $("#history > div").length + 1;
    var div = document.createElement("div");
    var p = document.createElement("p");
    if (partieFinie == "equal") joueurActif = "Égalité";
    $(div).css("margin", "20px");
    $(p).css("margin", "0");
    $(p).css("font-weight", "bold");
    $(p).html("Partie N°" + nbHistory + " :");
    $(p).append("<br>");
    $(p).append("Winner = " + joueurActif);
    $(div).append(p);
    $(div).attr('id', "history-" + nbHistory);
    $(div).append($("#main").html());
    $(div).css("display", "none");
    $("#history").prepend(div);
    $(div).slideToggle(800);

    //$("#history").animate({scrollTop: $("#history").height() + $("#history").height()});

}