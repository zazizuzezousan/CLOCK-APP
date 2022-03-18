const $display = document.getElementById("display");
const $control = document.getElementById("control");
const $time = document.getElementById("time");
const $timer = document.getElementById("timer");
const $stopwatch = document.getElementById("stopwatch");
const $setting = document.getElementById("setting");
let time;

//現在時刻表示
function nowTime(){
    let hour;
    let minute;
    let second;
    let displayhour;
    let displayminute;
    let displaysecond;
    const date = new Date();
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
    if(hour < 10){
        displayhour = "0" + hour;
    }else{
        displayhour = hour;
    }
    if(minute < 10){
        displayminute = "0" + minute;
    }else{
        displayminute = minute;
    }
    if(second < 10){
        displaysecond = "0" + second;
    }else{
        displaysecond = second;
    }
    $display.innerText = displayhour + ":" + displayminute + ":" + displaysecond;
}

//タイマー
function Timer(){
    $control.innerHTML = "<input type=number min=0>"
}

$time.addEventListener("click",function(){
    $control.innerHTML = "";
    time = setInterval("nowTime()",0);
});

$timer.addEventListener("click",function(){
    Timer();
});