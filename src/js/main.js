/* Timer + Period*/
/* Console */
const startBtnEl = document.querySelector("#startBtn");
const pauseBtnEl = document.querySelector("#pauseBtn");
const breakBtnEl = document.querySelector("#breakBtn");
const homeScoreBtn1El = document.querySelector("#homeScoreBtn1");
const homeScoreBtn2El = document.querySelector("#homeScoreBtn2");
const homeScoreBtn3El = document.querySelector("#homeScoreBtn3");
const guestScoreBtn1El = document.querySelector("#guestScoreBtn1");
const guestScoreBtn2El = document.querySelector("#guestScoreBtn2");
const guestScoreBtn3El = document.querySelector("#guestScoreBtn3");
const homePossBtnEl = document.querySelector("#homePossBtn");
const changePossBtnEl = document.querySelector("#changePossBtn");
const guestPossBtnEl = document.querySelector("#guestPossBtn");
const homeBonusBtnEl = document.querySelector("#homeBonusBtn");
const guestBonusBtnEl = document.querySelector("#guestBonusBtn");
const newGameBtnEl = document.querySelector("#newGameBtn");
startBtnEl.disabled = false;
pauseBtnEl.disabled = true;
breakBtnEl.disabled = true;
newGameBtnEl.disabled = true;

/* Variables */
let minutes = 0;
let seconds = 0;
let decimal = 0;
let time = 7150;
let period = 3;
let p;
let isRunning = false;
let homeScore = 0;
let guestScore = 0;
let homeScoreTxt = 1;
let guestScoreTxt = 0;
let bh = 0;
let bg = 0;
let intervalId;

/* Board */
const timeEl = document.querySelector("#time");
const periodNumberEl = document.querySelector("#periodNumber");
let homeScoreEl = document.querySelector("#homeScore");
let guestScoreEl = document.querySelector("#guestScore");
let homePossEl = document.querySelector("#homePoss");
let guestPossEl = document.querySelector("#guestPoss");
let homeBonus1El = document.querySelector("#homeBonus1");
let homeBonus2El = document.querySelector("#homeBonus2");
let guestBonus1El = document.querySelector("#guestBonus1");
let guestBonus2El = document.querySelector("#guestBonus2");

function startClock(event) {
    event.preventDefault();
    if (period !== "X") { period++; };
    periodNumberEl.textContent = period;
    periodNumberEl.classList.add("activeBoard");
    homeScoreEl.textContent = "000";
    homeScoreEl.classList.add("activeBoard");
    guestScoreEl.textContent = "000";
    guestScoreEl.classList.add("activeBoard");
    startBtnEl.disabled = true;
    startBtnEl.classList.remove("activeConsole");
    pauseBtnEl.disabled = false;
    pauseBtnEl.classList.add("activeConsole");
    for (let i = 1; i < 4; i++) {
        document.querySelector(`#homeScoreBtn${i}`).disabled = false;
        document.querySelector(`#homeScoreBtn${i}`).classList.add("activeConsole");
        document.querySelector(`#guestScoreBtn${i}`).disabled = false;
        document.querySelector(`#guestScoreBtn${i}`).classList.add("activeConsole");
    }
    intervalId = setInterval(() => {
        time++;
        decimal = time % 10;
        seconds = Math.floor(time / 10) % 60;
        minutes = Math.floor(time / 600);
        let secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        let minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
        timeEl.textContent = `${minutesDisplay}:${secondsDisplay}.${decimal}`;
        timeEl.classList.add("activeBoard");
        homeScoreEl.textContent = homeScore < 10 ? `00${homeScore}` : homeScore < 100 ? `0${homeScore}` : homeScore;
        guestScoreEl.textContent = guestScore < 10 ? `00${guestScore}` : guestScore < 100 ? `0${guestScore}` : guestScore;
        if (minutes === 12) {
            stopClock();
        }
    }, 100);
}

function pauseClock() {
    event.preventDefault();
    if (!isRunning) {
        pauseBtnEl.textContent = "resume";
        clearInterval(intervalId);
        isRunning = true;
        homePossBtnEl.disabled = false;
        homePossBtnEl.classList.add("activeConsole");
        guestPossBtnEl.disabled = false;
        guestPossBtnEl.classList.add("activeConsole");
        homeBonusBtnEl.disabled = false;
        homeBonusBtnEl.classList.add("activeConsole");
        guestBonusBtnEl.disabled = false;
        guestBonusBtnEl.classList.add("activeConsole");
    } else if (isRunning) {
        pauseBtnEl.textContent = "pause";
        isRunning = false;
        homePossBtnEl.disabled = true;
        homePossBtnEl.classList.remove("activeConsole");
        guestPossBtnEl.disabled = true;
        guestPossBtnEl.classList.remove("activeConsole");
        homeBonusBtnEl.disabled = true;
        homeBonusBtnEl.classList.remove("activeConsole");
        guestBonusBtnEl.disabled = true;
        guestBonusBtnEl.classList.remove("activeConsole");
        startClock();
    }
}

function stopClock() {
    clearInterval(intervalId);
    startBtnEl.disabled = true;
    startBtnEl.classList.remove("activeConsole");
    pauseBtnEl.disabled = true;
    pauseBtnEl.classList.remove("activeConsole");
    homePossBtnEl.disabled = true;
    homePossBtnEl.classList.remove("activeConsole");
    guestPossBtnEl.disabled = true;
    guestPossBtnEl.classList.remove("activeConsole");
    changePossBtnEl.disabled = true;
    changePossBtnEl.classList.remove("activeConsole");
    homeBonusBtnEl.disabled = true;
    homeBonusBtnEl.classList.remove("activeConsole");
    guestBonusBtnEl.disabled = true;
    guestBonusBtnEl.classList.remove("activeConsole");
    for (let i = 1; i < 4; i++) {
        document.querySelector(`#homeScoreBtn${i}`).disabled = true;
        document.querySelector(`#homeScoreBtn${i}`).classList.remove("activeConsole");
        document.querySelector(`#guestScoreBtn${i}`).disabled = true;
        document.querySelector(`#guestScoreBtn${i}`).classList.remove("activeConsole");
    }
    timeEl.textContent = "00:00.0";
    timeEl.classList.remove("activeBoard");
    periodNumberEl.textContent = period;
    periodNumberEl.classList.remove("activeBoard");
    homeScoreEl.textContent = homeScoreTxt;
    guestScoreEl.textContent = guestScoreTxt;
    if (period === 4 && homeScoreEl.textContent !== guestScoreEl.textContent) {
        enableNewGame();
    } else if (period === 4 || period === "X") {
        if (homeScoreEl.textContent === guestScoreEl.textContent) {
            time = 1200;
            enableBreak();
        } else {
            enableNewGame();
        }
    } else if ([1, 2, 3].includes(period)) {
        time = period === 2 ? 9000 : 1200;
        enableBreak();
    };
}

function enableBreak() {
    breakBtnEl.disabled = false;
    breakBtnEl.classList.add("activeConsole");
}

function enableNewGame() {
    newGameBtnEl.disabled = false;
    newGameBtnEl.classList.add("activeConsole");
}

function breakQuarter() {
    event.preventDefault();
    breakBtnEl.disabled = true;
    breakBtnEl.classList.remove("activeConsole");
    if (period === 4) {
        period = "X";
    }
    intervalId = setInterval(() => {
        time--;
        let decimal = time % 10;
        let seconds = Math.floor(time / 10) % 60;
        let minutes = Math.floor(time / 600);
        let secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        let minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
        timeEl.textContent = `${minutesDisplay}:${secondsDisplay}.${decimal}`;
        timeEl.classList.add("activeBoard");
        if (time === 0) {
            intervalId = clearInterval(intervalId);
            timeEl.classList.remove("activeBoard");
            startBtnEl.disabled = false;
            startBtnEl.classList.add("activeConsole");
            pauseBtnEl.disabled = true;
            pauseBtnEl.classList.remove("activeConsole");
        }
    }, 100);
    periodNumberEl.textContent = period;
    periodNumberEl.style.color = "#ff8a8a66";
}

function changeScore(team, num) {
    if (team === "H") {
        homeScore += num;
        convertScore('H');
    } else if (team === "G") {
        guestScore += num;
        convertScore('G');
    }
}

function convertScore(team) {
    if (team === "H") {
        homeScoreTxt = homeScore < 10 ? `00${homeScore}` : homeScore < 100 ? `0${homeScore}` : homeScore;
        return homeScoreTxt;
    } else if (team === "G") {
        guestScoreTxt = guestScore < 10 ? `00${guestScore}` : guestScore < 100 ? `0${guestScore}` : guestScore;
        return guestScoreTxt;
    }

}

function changePoss(team) {
    if (team === "H") {
        homePossBtnEl.disabled = true;
        homePossBtnEl.classList.remove("activeConsole");
        homePossEl.classList.add("activeBoard");
        guestPossBtnEl.disabled = true;
        guestPossBtnEl.classList.remove("activeConsole");
        changePossBtnEl.disabled = false;
        changePossBtnEl.classList.add("activeConsole");
        p = "1";
    } else if (team === "G") {
        guestPossBtnEl.disabled = false;
        guestPossBtnEl.classList.remove("activeConsole");
        guestPossEl.classList.add("activeBoard");
        homePossBtnEl.disabled = false;
        homePossBtnEl.classList.remove("activeConsole");
        changePossBtnEl.disabled = false;
        changePossBtnEl.classList.add("activeConsole");
        p = "2";
    } else if (team === "X") {
        if (p === "1") {
            homePossEl.classList.remove("activeBoard");
            guestPossEl.classList.add("activeBoard");
            p = "2";
        } else if (p === "2") {
            homePossEl.classList.add("activeBoard");
            guestPossEl.classList.remove("activeBoard");
            p = "1";
        }
    }
}

function changeBonus(team) {
    if (team === "H") {
        if (bh === 0) {
            homeBonus2El.classList.add("activeBoard");
            bh = 1;
        } else if (bh === 1) {
            homeBonus1El.classList.add("activeBoard");
            homeBonusBtnEl.disabled = true;
            homeBonusBtnEl.classList.remove("activeConsole");
        }
    } else if (team === "G") {
        if (bg === 0) {
            guestBonus1El.classList.add("activeBoard");
            bg = 1;
        } else if (bg === 1) {
            guestBonus2El.classList.add("activeBoard");
            guestBonusBtnEl.disabled = true;
            guestBonusBtnEl.classList.remove("activeConsole");
        }
    }
}


function newGame() {
    startBtnEl.disabled = false;
    pauseBtnEl.disabled = true;
    breakBtnEl.disabled = true;
    newGameBtnEl.disabled = true;
    newGameBtnEl.classList.remove("activeConsole");
    startBtnEl.classList.add("activeConsole");
    pauseBtnEl.classList.remove("activeConsole");
    minutes = 0;
    seconds = 0;
    decimal = 0;
    time = 0;
    period = 1;
    isRunning = false;
    bh = 0;
    bg = 0;
    intervalId = clearInterval(intervalId);
    homeScore = 0;
    guestScore = 0;
    homeScoreEl.textContent = homeScore < 10 ? `00${homeScore}` : homeScore < 100 ? `0${homeScore}` : homeScore;;
    guestScoreEl.textContent = guestScore < 10 ? `00${guestScore}` : guestScore < 100 ? `0${guestScore}` : guestScore;;
    homeScoreEl.classList.remove("activeBoard");
    guestScoreEl.classList.remove("activeBoard");
    period = 0;
    periodNumberEl.textContent = period;
    periodNumberEl.classList.remove("activeBoard");

}

