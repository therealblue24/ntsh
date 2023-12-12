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

function clamp(num, min, max) {
  return num <= min 
    ? min 
    : num >= max 
      ? max 
      : num
}

function calc_score(obj) {
    let c1 = Math.round(Math.sqrt(obj.wrong + Math.floor(Math.sqrt(obj.shadow))));
    let c = obj.correct;
    if(c>c1) {
        c1=c1-1;
    }
    if(c < 0) {
        return 0;
    }
    let c2 = c1 + 1;
    let p = (c / c2);
    p = p * 100;
    return Math.round(p * 20) / 20;
}

let glob = ["NULL", 0, ["", 0], _template, {}];

function rand(min, max) {
    return (Math.random() * (max - min)) + min;
}

function genq() {
    switch(glob[1]) {
        case 1:
            // ax+b = cx+d
            let a = Math.round(rand(2, 15));
            let c = Math.round(rand(3, 14));
            let b = Math.round(rand(4, 13));
            let d = Math.round(rand(5, 14));
            if(a == c) {
                c = a-1;
            }
            let p1 = a + "x";
            let p3 = c + "x";
            let p2 = "";
            let p4 = "";
            if(Math.abs(b) == b) {
                p2 = "+" + b;
            } else {
                p2 = "-" + b;
            }
            if(Math.abs(d) == d) {
                p4 = "+" + d;
            } else {
                p4 = "-" + d;
            }
            let eq = p1 + p2 + "=" + p3 + p4;
    
            // ax+b=cx+d
            // ax=cx+d-b
            // 0=(c-a)x+d-b
            // b=(c-a)x+d
            // b-d=(c-a)x
            // b-d / c-a
            let sol = (b - d) / (c - a);
            return [eq, sol, b-d, c-a];
            break;
        default: throw new Error("Invalid type");break;
    }
}

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
    let qq = document.getElementById("qq");
    let eq = genq();
    qq.innerHTML = "<p>" + eq[0] + "</p>";
    glob[2] = eq;
    console.log(eq);
    glob[3].shadow=2;
    glob[4].shadow=2;
    glob[4].correct=0;glob[4].wrong=1;
}

function start_quiz() {
    window.location.replace("qq.html?uni=" + glob[0] + "&sel=" + glob[1]);
}

let counter = 1;

function submit() {
    let tt = document.getElementById("tt");
    let num = document.getElementById("num");
    let stat = document.getElementById("stat");
    let ans = document.getElementById("inp").value;
    let qq = document.getElementById("qq");
    let m = document.getElementById("trolling");
    let e = eval(ans);

    counter++;

    let c_ = counter - 1;

    if(e == glob[2][1]) {
        glob[3].correct++;
        if(c_ > glob[4].shadow) {
            glob[4].correct += 0.2 * Math.sqrt(c_);
        } else {
            glob[4].correct += 0.1 * Math.sqrt(c_);
        }
    } else {
        glob[3].wrong++;
        if(c_ > glob[4].shadow) {
            glob[4].wrong += 0.12 * Math.sqrt(c_);
        } else {
            glob[4].wrong += 0.05 * Math.sqrt(c_);
        }
    }

    tt.innerHTML = "Question " + counter;
    num.innerHTML = "Question " + counter + "/??";
    stat.innerHTML = glob[3].correct + " correct, " + glob[3].wrong + " wrong, score: " + calc_score(glob[4]);

    let eq = genq();
    qq.innerHTML = "<p>" + eq[0] + "</p>";
    glob[2] = eq;
    console.log(eq);

    if(user_done(glob[4])) {
        const params = new URLSearchParams(window.location.search);
        let unit = params.get("uni");
        let sel  = parseInt(params.get("sel"));
        let nam = "N" + unit + "." + sel;
        let sco = calc_score(glob[4]);
        let real = 100 + (Math.round(Math.sqrt(sco-100) * 20) / 20);
        m.innerHTML="<h1>Congralutions! You are done with " + nam + "!</h1><p>And with a score of " + real + ".</p>";
    }
}
