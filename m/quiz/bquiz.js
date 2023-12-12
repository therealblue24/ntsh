// Copyright (c) 2023 therealblue24

// This is a template for the smarter smart score system for the test
// section of lessons.
// Smarter smart score works by first questioning the user N times.
// This N times is the value of shadow.
// Then the test/quiz/whatever continues until the user_done() function
// returns true.
//
// The algorithim behind this is that the user is done if:
// (c = correct, w = wrong, s = shadow)
// c > round(sqrt(w + floor(sqrt(s))))
// This makes it so that the system is fair.
let _template = { correct: 0, wrong: 0, shadow: 0 };
function user_done(obj) {
    let c = obj.correct;
    let w = obj.wrong + Math.floor(Math.sqrt(obj.shadow));
    w = Math.round(Math.sqrt(w));
    if(c > w) {
        return true;
    }
    return false;
}

let glob = ["NULL", 0];

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    if(!params.has("uni") || !params.has("sel")) {
        console.error("Did user type /m/quiz/q.html ");
    }
    let unit = params.get("uni");
    let sel  = parseInt(params.get("sel"));
    glob[0] = unit;
    glob[1] = sel;
    console.log("Doing N" + unit + "." + sel);
    let r0 = document.getElementById("r0");
    r0.innerHTML = "Quiz N"  + unit + "." + sel;
}

function start_quiz() {
    window.location.replace("qq.html?uni=" + glob[0] + "&sel=" + glob[1]);
}
