const top_left = document.getElementById('top-left');
const top_right = document.getElementById('top-right');
const bottom_left = document.getElementById('bottom-left');
const bottom_right = document.getElementById('bottom-right');
const timer_text = document.getElementById('timer-text');
const switch_button = document.getElementById('switch-button');
const delay = 1;

let timerStarted = false;

function setPercentage(percentage) {
    if (percentage > 100) {
        percentages = 100;
    }

    let currentPercentage = clamp(percentage / 25, 0, 1);
    top_right.style.transform = `rotate(${currentPercentage * 90 - 90}deg)`;
    percentage -= 25 * currentPercentage;

    currentPercentage = clamp(percentage / 25, 0, 1);
    bottom_right.style.transform = `rotate(${currentPercentage * 90 - 90}deg)`;
    percentage -= 25 * currentPercentage;


    currentPercentage = clamp(percentage / 25, 0, 1);
    bottom_left.style.transform = `rotate(${currentPercentage * 90 - 90}deg)`;
    percentage -= 25 * currentPercentage;

    currentPercentage = clamp(percentage / 25, 0, 1);
    top_left.style.transform = `rotate(${currentPercentage * 90 - 90}deg)`;

}



let radians = 0;
let timeInSeconds = 60
let timeElapsed = 0;

let currentTimer = setInterval(() => {
    if(timerStarted){
    if (timeElapsed >= timeInSeconds) clearInterval(currentTimer);
    setPercentage(100 * timeElapsed / timeInSeconds);
    timer_text.innerHTML = `${Math.floor((timeInSeconds - timeElapsed) / 60)}:${Math.floor(timeInSeconds - timeElapsed) % 60}`;
    timeElapsed += 0.01;
}
}, 10);

function timerSwitch(timeInSeconds) {
    if(!timerStarted) {
        timerStarted = true;
        switch_button.innerHTML = "Stop";
    }else{
        timerStarted = false;
        switch_button.innerHTML = "Start";
    }

   
}

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}