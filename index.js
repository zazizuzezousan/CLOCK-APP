const $display = document.getElementById("display");
const $control = document.getElementById("control");
const $time = document.getElementById("time");
const $timer = document.getElementById("timer");
const $stopwatch = document.getElementById("stopwatch");
const $setting = document.getElementById("setting");
let displayhour;
let displayminute;
let displaysecond;
let hour;
let minute;
let second;
let time;

//現在時刻表示
function nowTime(){
    const date = new Date();
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
    setDisplay();
}

//タイマー
function Timer(){
    const TimerHTML =
        "<input type=number placeholder=時間 min=0 id=sethours class=settimer>"+
        "<input type=number placeholder=分 min=0 id=setminutes class=settimer>"+
        "<input type=number placeholder=秒 min=0 id=setseconds class=settimer>"+
        "<button id=startstop>開始</button>"+
        "<button id=reset>リセット</button>";
    $control.innerHTML = TimerHTML;
    const $sethours = document.getElementById("sethours");
    const $setminutes = document.getElementById("setminutes");
    const $setseconds = document.getElementById("setseconds");
    const $startstop = document.getElementById("startstop");
    const $reset = document.getElementById("reset");
    let $startstopStatus = 0;
    $startstop.addEventListener("click",function(){
        if($startstopStatus == 0){
            if($sethours.value && $setminutes.value && $setseconds.value){
                $startstopStatus = 1;
                $startstop.innerText = "一時停止";
                hour = $sethours.value;
                minute = $setminutes.value;
                second = $setseconds.value;
                setDisplay();
                time = setInterval(function(){
                    if(second > 0){
                        second--;
                    }else{
                        if(minute > 0){
                            second = 59;
                            minute--;
                        }else{
                            if(hour > 0){
                                second = 59;
                                minute = 59;
                                hour--;
                            }else{
                                clearInterval(time);
                                $startstopStatus = 0;
                                $startstop.innerText = "開始";
                            }
                        }
                    }
                    setDisplay();
                },1000);
            }
        }else{
            if($startstopStatus == 1){
            clearInterval(time);
            $startstopStatus = 2;
            $startstop.innerText = "再開";
            }else{
                if($startstopStatus == 2){
                    $startstopStatus = 1;
                    $startstop.innerText = "一時停止";
                    time = setInterval(function(){
                        if(second > 0){
                            second--;
                        }else{
                            if(minute > 0){
                                second = 59;
                                minute--;
                            }else{
                                if(hour > 0){
                                    second = 59;
                                    minute = 59;
                                    hour--;
                                }else{
                                    clearInterval(time);
                                    $startstopStatus = 0;
                                    $startstop.innerText = "開始";
                                }
                            }
                        }
                        setDisplay();
                    },1000);
                }
            }
        }
    });
    $reset.addEventListener("click",function(){
        clearInterval(time);
        hour = 0;
        minute = 0;
        second = 0;
        setDisplay();
        $sethours.value = "";
        $setminutes.value = "";
        $setseconds.value = "";
    });
}

//画面表示
function setDisplay(){
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

$time.addEventListener("click",function(){
    clearInterval(time);
    $control.innerHTML = "";
    time = setInterval("nowTime()",0);
});

$timer.addEventListener("click",function(){
    clearInterval(time);
    $display.innerText = "00:00:00";
    Timer();
});