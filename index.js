const $display = document.getElementById("display");
const $control = document.getElementById("control");
const $time = document.getElementById("time");
const $timer = document.getElementById("timer");
const $stopwatch = document.getElementById("stopwatch");
const $setting = document.getElementById("setting");
const $timerend = document.getElementById("timerend");
let displayhour;
let displayminute;
let displaysecond;
let displaymillisecond;
let hour;
let minute;
let second;
let millisecond;
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
        $timerend.pause();
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
                                $timerend.currentTime = 0;
                                $timerend.loop = true;
                                $timerend.play();
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
                                    $timerend.currentTime = 0;
                                    $timerend.loop = true;
                                    $timerend.play();
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
        $timerend.pause();
        hour = 0;
        minute = 0;
        second = 0;
        setDisplay();
        $sethours.value = "";
        $setminutes.value = "";
        $setseconds.value = "";
    });
}

//ストップウォッチ
function Stopwatch(){
    $control.innerHTML = "<button id=startstop>開始</button><button id=reset>リセット</button>"
    const $startstop = document.getElementById("startstop");
    const $reset = document.getElementById("reset");
    let $startstopStatus = 0;
    $startstop.addEventListener("click",function(){
        if($startstopStatus == 0){
            hour = 0;
            minute = 0;
            second = 0;
            millisecond = 0;
            $startstopStatus = 1;
        }
        if($startstopStatus == 1){
            $startstopStatus = 2;
            $startstop.innerText = "一時停止";
            time = setInterval(function(){
                millisecond++;
                if(millisecond == 100){
                    second++;
                    millisecond = 0;
                }
                if(second == 60){
                    minute++;
                    second = 0;
                }
                if(minute == 60){
                    hour++;
                    minute = 0; 
                }
                if(hour == 24){
                    clearInterval(time);
                }
                if(hour == 0){
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
                    if(millisecond < 10){
                        displaymillisecond = "0" + millisecond;
                    }else{
                        displaymillisecond = millisecond;
                    }
                    $display.innerText = displayminute + ":" + displaysecond + ":" + displaymillisecond;
                }else{
                    setDisplay();
                }
            },10);
        }else{
            clearInterval(time);
            $startstopStatus = 1;
            $startstop.innerText = "再開";
        }
    });
    $reset.addEventListener("click",function(){
        if($startstopStatus == 1){
            hour = 0;
            minute = 0;
            second = 0;
            millisecond = 0;
            $startstopStatus = 0;
            setDisplay();
            $startstop.innerText = "開始";
        }
    })
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
    $control.innerHTML = "";
    $display.innerText = "00:00:00";
    Timer();
});

$stopwatch.addEventListener("click",function(){
    clearInterval(time);
    $control.innerHTML = "";
    $display.innerText = "00:00:00";
    Stopwatch();
});