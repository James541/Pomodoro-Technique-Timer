let breakLengthElement = document.getElementById("break-length");
let timerLabelElement = document.getElementById("timer-label");
let sessionLengthElement = document.getElementById("session-length");
let timeLeft = document.getElementById("time-left");
let audioElement = document.getElementById("beep");
audioElement.volume = 0.5
let breakLength = 5;
let sessionLength = 25;
let time = (sessionLength*60);
let buttonClicked = false;
let intervalId;
let flag = "break";

function breakLengthUp() {
    if (breakLength < 60) {
        breakLength++
        breakLengthElement.textContent = breakLength
    }
}

function breakLengthDown() {
    if (breakLength > 1) {
        breakLength--
        breakLengthElement.textContent = breakLength
    }
}

function sessionLengthUp() {
    if (sessionLength < 60) {
        sessionLength++
        sessionLengthElement.textContent = sessionLength
        time = (sessionLength*60)
        const minutes = Math.floor(time/60).toString().padStart(2,'0')
        const seconds = (time % 60).toString().padStart(2, '0')
        timeLeft.textContent = `${minutes}:${seconds}`
    }
}

function sessionLengthDown() {
    if (sessionLength > 1) {
        sessionLength--
        sessionLengthElement.textContent = sessionLength
        time = (sessionLength*60)
        const minutes = Math.floor(time/60).toString().padStart(2,'0')
        const seconds = (time % 60).toString().padStart(2, '0')
        timeLeft.textContent = `${minutes}:${seconds}`
    }
    
}

function reset() {
    timerLabelElement.textContent = "Session"
    sessionLengthElement.textContent = 25
    breakLengthElement.textContent = 5
    time = (sessionLength*60)
    const minutes = Math.floor(time/60).toString().padStart(2,'0')
    const seconds = (time % 60).toString().padStart(2, '0')
    timeLeft.textContent = `${minutes}:${seconds}`
    sessionLength = 25
    breakLength = 5
    clearInterval(intervalId)
    flag = "break"
    buttonClicked = false
    audioElement.pause()
    audioElement.currentTime=0

}

function startTimer() {
    if (buttonClicked == false) {
       buttonClicked = true
       intervalId = setInterval(timer, 1000)
    } else {
        buttonClicked = false;
       clearInterval(intervalId)
    }
}

function timer() {
    const minutes = Math.floor(time/60).toString().padStart(2,'0')
    const seconds = (time % 60).toString().padStart(2, '0')
    timeLeft.textContent = `${minutes}:${seconds}`

    if (time > 0) {
        time--
        timeLeft.textContent = `${minutes}:${seconds}`
    } else if (time <= 0 && flag == "break") {
        time = (breakLength*60)
        timerLabelElement.textContent = "Break"
        flag = "session"
        const minutes = Math.floor(time/60).toString().padStart(2,'0')
        const seconds = (time % 60).toString().padStart(2, '0')
        audioElement.play()
    } else if (time <= 0 && flag == "session") {
        time = (sessionLength*60)
        timerLabelElement.textContent = "Session"
        const minutes = Math.floor(time/60).toString().padStart(2,'0')
        const seconds = (time % 60).toString().padStart(2, '0')
        flag = "break"
        
        audioElement.play()
    }
}