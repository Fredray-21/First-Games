start();
async function start() {
    const mot = await randomWord();
    console.log(mot);
    let etapependu = 5;
    etapependu == 5 ? $("#bar-bottom,#bar-vertical,#bar-top,#bar-corner,#bar-corde").css("display", "block") : false;
    mot.split("").forEach((e) => {
        $("#row-align-bottom").append("<div class='letter' data-id='" + e.toLocaleUpperCase() + "'></div>");
    });

    $(".key").click(function () {
        const key = $(this).text();
        let good = false;
        $("#row-align-bottom .letter").each(function () {
            (key == strNoAccent($(this).data("id"))) ? ($(this).text($(this).data("id")), good = true) : false;
        });
        $(this).unbind("click");
        $(this).css("cursor", "not-allowed");
        good ? ($(this).css("background-color", "green"), isWin(mot)) : ($(this).css("opacity", "0.5"), $(this).css("background-color", "lightcoral"), etapependu++, pendu(etapependu,mot));
    });
}


function pendu(etapependu,mot) {
    switch (etapependu) {
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
        case 11: $("#bar-legR").css("display", "block"); isDefeat(mot); break;
    }
}

function isWin(mot) {
    let win = true;
    $("#row-align-bottom .letter").each(function () {
        $(this).text() == "" ? win = false : false;
    });
    if (win) {
        $("#row-top").css("flex-direction", "column");
        $("#row-top").css("align-items", "center");
        $("#row-top").css("padding-bottom", "0");
        $("#row-top").html("<div class='winner title'>Victoire</div>");
        $("#row-top").append("<div class='winner'>(" + mot + ")</div>");

        $(".key").css("opacity", "0.5");
        $(".key").unbind("click");
        $(".key").css("cursor", "not-allowed");
    }
}
function isDefeat(mot) {
    $("#row-top").css("flex-direction", "column");
    $("#row-top").css("align-items", "center");
    $("#row-top").css("padding-bottom", "0");
    $("#row-top").html("<div class='winner title'>Défaite</div>");
    $("#row-top").append("<div class='winner'>(" + mot + ")</div>");

    $(".key").css("opacity", "0.5");
    $(".key").unbind("click");
    $(".key").css("cursor", "not-allowed");
}

async function randomWord() {
    const jsonData = await fetch("./dico.json").then(res => res.json());
    const count = Object.keys(jsonData).length;
    const random = Math.floor(Math.random() * count);
    const randomWord = jsonData[Object.keys(jsonData)[random]];
    return randomWord;
}


function strNoAccent(a) {
    return a.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


function createDataJson() {
    array = [];
    fetch('./DEM.jsonl').then(response => response.text()).then(data => {
        data.split('\n').forEach(line => {
            const obj = JSON.parse(line);
            if (obj.M.split(' ').length == 1 && obj.M.includes('-') == false && obj.M.length >= 4 && array.includes(obj.M) == false) {
                array.push(obj.M);
            }
        });
        let i = 0;
        let json = "";
        array.forEach(function (item) {
            json += '"' + i + '"' + ':"' + item + '",';
            i++;
        });
        json = '{' + json.substring(0, json.length - 1) + '}';
        function download(content, fileName, contentType) {
            const a = document.createElement("a");
            const file = new Blob([content], { type: contentType });
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
        }
        download(json, 'dico.json', 'text/plain');
    });
}
