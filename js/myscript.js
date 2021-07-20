//Analog Clock
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;

    ctx.translate(radius, radius);
    radius = radius * 0.90
    setInterval(drawClock, 1000);

    function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
    }

    function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0.5, '#444');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.06, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
    }

    function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
    }
    }

    function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
    (minute * Math.PI / (6 * 60)) +
    (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.05);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.04);
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.01);
    }

    function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
    }

//Digital Clock
    var d, h, m, s, animate;

    function init() {
    d = new Date();
    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();
    clock();
    };

    function clock() {
    s++;
    if (s == 60) {
    s = 0;
    m++;
    if (m == 69) {
    m = 0;
    h++;
    if (h == 24) {
    h = 0;
    }
    }
    }
    digital('sec', s);
    digital('min', m);
    digital('hrs', h);
    animate = setTimeout(clock, 1000);
    };

    function digital(id, val) {
    if (val < 10) {
    val = '0' + val;
    }
    document.getElementById(id).innerHTML = val;
    };

    window.onload = init;

//10 sec Countdown
    var time = 10;
    var relBtn = document.querySelector("#reloadbtn");
    var text = document.getElementById("countdownText");

    function contador() {
    if (time == 10) {
    text.innerHTML = time + " seconds remaining"
    }
    setTimeout(function () {
    time--;
    if (time <= 5) {
    text.style.color = "red";
    }
    if (time <= 0) {
    text.innerHTML = "Finished";
    text.style.color = "black";
    relBtn.style.visibility = "visible";
    } else {
    text.innerHTML = time + " seconds remaining";
    }
    if (time == 1) {
    text.innerHTML = time + " second remaining"
    }
    if (time > 0) {
    contador();
    }
    }, 1000)
    }
    contador();

//Countdown with Input
    var time2 = 10;
    var relBtn2 = document.querySelector("#reloadbtn2");
    var text2 = document.getElementById("countdownText2");
    var inputListener = document.querySelector("#inputValue");
    var inputBtn = document.querySelector("#functionBtn");

    function contador2() {
    if (time2 == inputListener.value) {
    text2.innerHTML = time2 + " seconds remaining"
    }
    setTimeout(function () {
    time2--;
    if (time2 <= 5) {
    text2.style.color = "red";
    }
    if (time2 <= 0) {
    text2.innerHTML = "Finished";
    text2.style.color = "black";
    } else {
    text2.innerHTML = time2 + " seconds remaining";
    }
    if (time2 == 1) {
    text2.innerHTML = time2 + " second remaining"
    }
    if (time2 > 0) {
    contador2();
    }
    }, 1000)
    }

// Timer
    var hours = 10;
    var mins = 0;
    var seconds = 0;

    var hour = document.querySelector("#hour");
    var minute = document.querySelector("#minute");
    var second = document.querySelector("#seconds");

    var pause = document.querySelector("#pause");
    var start = document.querySelector('#start');
    var reset = document.querySelector('#reset');

    var timex;

    function timer() {
    timex = setTimeout(function () {
    seconds++;
    if (seconds > 59) {
    seconds = 0;
    mins++;
    if (mins > 59) {
    mins = 0;
    hours++;
    if (hours < 10) {
        hour.innerHTML = '0' + hours + ':';
    }
    else
        hour.innerHTML = hours + ':';
    }

    if (mins < 10) {
    minute.innerHTML = '0' + mins + ':';
    }
    else
    minute.innerHTML = mins + ':';
    }
    if (seconds < 10) {
    second.innerHTML = '0' + seconds;
    }
    else {
    second.innerHTML = seconds;
    }
    timer();
    }, 1000);
    }

    function resetTimer() {
    hours = 0;
    mins = 0;
    seconds = 0;
    hour.innerHTML = "00";
    minute.innerHTML = "00";
    second.innerHTML = "00";
    clearInterval(timex);
    }

//Event Listeners
    document.addEventListener('DOMContentLoaded', function () {

    //Countdown automatic
    relBtn.onclick = function () {
    time = 10;
    relBtn.style.visibility = "hidden";
    contador();
    };

    //Countdown input
    inputBtn.onclick = function () {
    time2 = inputListener.value;
    contador2();
    console.log(inputListener.value);
    };

    //Timer
    start.addEventListener("click", function () {
    clearInterval(timex);
    timer();
    start.setAttribute("disabled", "disabled");
    }, false);

    pause.addEventListener("click", function () {
    clearInterval(timex);
    start.removeAttribute("disabled", "disabled");
    }, false);

    reset.addEventListener("click", function () {
    resetTimer();
    start.removeAttribute("disabled", "disabled");
    }, false);
    }, false);




