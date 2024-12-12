const top_left = document.getElementById('top-left');
const top_right = document.getElementById('top-right');
const bottom_left = document.getElementById('bottom-left');
const bottom_right = document.getElementById('bottom-right');
const timer_text = document.getElementById('timer-text');
const switch_button = document.getElementById('switch-button');
const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');
const timer = document.getElementById('timer');
const stepPoints = document.getElementById('step-points');
let clickedSlider = null;
slider1.addEventListener('mouseenter', ()=> {
    bodyTag.style.cursor = "grab";
    if(clickedSlider !== null && mouseIsPressed){
        bodyTag.style.cursor = "grabbing";
    }
});
slider2.addEventListener('mouseenter', ()=> {
    bodyTag.style.cursor = "grab";
    if(clickedSlider !== null && mouseIsPressed){
        bodyTag.style.cursor = "grabbing";
    }
});
slider1.addEventListener('mouseleave', ()=> {
    bodyTag.style.cursor = "default";
});

slider2.addEventListener('mouseleave', ()=> {
    bodyTag.style.cursor = "default";
});

slider1.addEventListener('mousedown', () => {
    clickedSlider = slider1;
});
slider2.addEventListener('mousedown', () => {
    clickedSlider = slider2;
});

bodyTag.addEventListener('mouseup', () => {
    bodyTag.style.cursor = "default";
    slider1.blur();
    slider2.blur();

    clickedSlider = null;
});

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

function setDefaultPoint(){
    let timerCenter = getDivCenter(timer);

    let mousePos = createPoint(timerCenter.x, timerCenter.y+(getDivSize(timer).width-12.5)/2);

    let vec = createVector(timerCenter, mousePos);
    let finalPos = multiplyVector(normalizeVector(vec), (getDivSize(timer).width-12.5)/2);

    slider1.style.left = timerCenter.x+finalPos.x + "px";
    slider1.style.top = timerCenter.y+finalPos.y + "px";
    slider1.style.transform = "translate(-50%, -50%)";

    slider2.style.left = timerCenter.x+finalPos.x + "px";
    slider2.style.top = timerCenter.y-finalPos.y + "px";
    slider2.style.transform = "translate(-50%, -50%)";
}
setDefaultPoint();

let slider1Angle = 270;
let slider2Angle = 90;

let steps = 24;

function generatePoints(){

}

onMouseHold = () => {
    if(clickedSlider === null) return;
    bodyTag.style.cursor = "grabbing";
    let timerCenter = getDivCenter(timer);

    let mousePos = createPoint(mouseX, mouseY);
    let vec = normalizeVector(createVector(timerCenter, mousePos));

    let alpha = Math.acos(vec.x);
    let modifier = 1;
    if(Math.asin(vec.y) != 0) modifier = -Math.asin(vec.y)/Math.abs(Math.asin(vec.y));
    alpha = (360+Math.floor(modifier*alpha*57.2958))%360;

    let step = 360/steps;
    let x = (alpha%step)/step;
    if(x >= 0.5) x = 1
    else x = 0;
    alpha = alpha - alpha%step + x*step;

    if(clickedSlider === slider1){
        slider1Angle = alpha;
        setSlider(slider1, slider1Angle);
    }
    else if(clickedSlider === slider2){
        slider2Angle = alpha;
        setSlider(slider2, slider2Angle);
    }
    
}


function setSlider(slider, angel){
    let timerCenter = getDivCenter(timer);

    let step = 360/steps;
    let x = (angel%step)/step;
    if(x >= 0.5) x = 1
    else x = 0;
    angel = angel - angel%step + x*step;

    let finalPos = createPoint(
    Math.cos(angel/57.2958)*(getDivSize(timer).width-12.5)/2, 
    Math.sin(angel/57.2958)*(getDivSize(timer).width-12.5)/2);
    slider.style.left = timerCenter.x+finalPos.x + "px";
    slider.style.top = timerCenter.y-finalPos.y + "px";
    slider.style.transform = "translate(-50%, -50%)";
}
setInterval(()=>{
    let timerCenter = getDivCenter(timer);
    if(clickedSlider != slider1){
        setSlider(slider1, slider1Angle);
    } 
    if(clickedSlider != slider2){
        setSlider(slider2, slider2Angle);
    }
}, 10);
