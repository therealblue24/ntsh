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
