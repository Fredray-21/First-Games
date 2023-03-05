$(document).ready(function () {
    createTray();
    placemine();

    // $("#container div").each(function () {
    //     if ($(this).attr("data-num") != undefined) {
    //         $(this).text($(this).attr("data-num"));
    //     }
    // });

    $("#container div").click(function () {
        // const arrayAround = getAround($(this));

        if ($(this).attr("class") == "mine") {
            alert("Perdu");
        } else if ($(this).data("num") != undefined) {
            $(this).text($(this).data("num"));
            $(this).css("background-color", "lightgoldenrodyellow");
        } else {
            $(this).css("background-color", "lightgoldenrodyellow");
            // a faire view all around epmty
        }
    }
    )

    $("#container div").contextmenu(function (ev) {
        ev.preventDefault();
        $(this).css("background-color", "blue");
    }
    )
});

function createTray() {
    for (let index = 0; index < 225; index++) {
        const divv = document.createElement('div');
        if (index % 2 == 0) {
            divv.style.backgroundColor = "lightblue";
        }
        $("#container").append(divv);
    }
}

function placemine() {
    let arraymine = [];
    let good = false;
    while (good == false) {
        let random = Math.floor(Math.random() * 225);
        if (arraymine.includes(random) == false) {
            arraymine.push(random);
            if (arraymine.length == 30) {
                good = true;
            }
        }
    }
    arraymine.forEach(e => {
        $("#container div").eq(e).attr("class", "mine")
        //s $("#container div").eq(e).css("background-color", "red");
        const arrayAround = getAround($("#container div").eq(e));
        arrayAround.forEach(e => {
            if (e >= 0 && e < 225 && $("#container div").eq(e).attr("class") != "mine") {
                if ($("#container div").eq(e).attr("data-num") == undefined) {
                    $("#container div").eq(e).attr("data-num", 0);
                }
                $("#container div").eq(e).attr("data-num", parseInt($("#container div").eq(e).attr("data-num")) + 1);
            }
        });
        $("#container div").eq(e).attr("data-num", "M");
    });
}


function getAround(divv) {
    let arrayAround = [];
    let index = divv.index();

    // Les 3 case supérieur
    if (index % 15 == 0 && index >= 15) {
        arrayAround.push(index - 14, index - 15);
    } else if (index % 15 == 14 && index >= 15) {
        arrayAround.push(index - 15, index - 16);
    } else if (index > 15) {
        arrayAround.push(index - 14, index - 15, index - 16);
    }

    // Les 3 case infférieur
    if (index % 15 == 0 && index <= 209) {
        arrayAround.push(index + 15, index + 16);
    } else if (index % 15 == 14 && index <= 209) {
        arrayAround.push(index + 14, index + 15);
    } else if (index <= 209) {
        arrayAround.push(index + 14, index + 15, index + 16);
    }

    // Les 2 case gauche et droite
    if (index % 15 == 0) {
        arrayAround.push(index + 1)
    } else if (index % 15 == 14) {
        arrayAround.push(index - 1)
    } else {
        arrayAround.push(index - 1, index + 1)
    }
    return arrayAround;
}
