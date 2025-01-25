const clockElement = document.getElementById('clock');
const toggleFormatButton = document.getElementById('toggleFormat');
const colorInput = document.getElementById('color');
const fontSizeInput = document.getElementById('fontSize');
const alarmTimeInput = document.getElementById('alarmTime');
const setAlarmButton = document.getElementById('setAlarm');
const alarmsList = document.getElementById('alarmsList');

let is24HourFormat = false;
let alarms = JSON.parse(localStorage.getItem('alarms')) || [];

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (!is24HourFormat) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        clockElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
    } else {
        clockElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function toggleFormat() {
    is24HourFormat = !is24HourFormat;
    toggleFormatButton.textContent = is24HourFormat ? 'Switch to 12-Hour Format' : 'Switch to 24-Hour Format';
    updateClock();
}

function applyCustomizations() {
    clockElement.style.color = colorInput.value;
    clockElement.style.fontSize = `${fontSizeInput.value}px`;
    localStorage.setItem('clockColor', colorInput.value);
    localStorage.setItem('clockFontSize', fontSizeInput.value);
}

function checkAlarms() {
    const now = new Date();
    const currentTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    alarms.forEach((alarm, index) => {
        if (alarm.time === currentTime && !alarm.triggered) {
            alert(`Alarm: ${currentTime}`);
            alarms[index].triggered = true;
            localStorage.setItem('alarms', JSON.stringify(alarms));
        }
    });
}

function setAlarm() {
    const time = alarmTimeInput.value;
    if (time) {
        alarms.push({ time, triggered: false });
        localStorage.setItem('alarms', JSON.stringify(alarms));
        renderAlarms();
    }
}

function renderAlarms() {
    alarmsList.innerHTML = '';
    alarms.forEach((alarm, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = alarm.time;
        listItem.className = 'alarm-item';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            alarms.splice(index, 1);
            localStorage.setItem('alarms', JSON.stringify(alarms));
            renderAlarms();
        };
        listItem.appendChild(deleteButton);
        alarmsList.appendChild(listItem);
    });
}

function loadPreferences() {
    const savedColor = localStorage.getItem('clockColor');
    const savedFontSize = localStorage.getItem('clockFontSize');

    if (savedColor) {
        colorInput.value = savedColor;
        clockElement.style.color = savedColor;
    }

    if (savedFontSize) {
        fontSizeInput.value = savedFontSize;
        clockElement.style.fontSize = `${savedFontSize}px`;
    }
}

toggleFormatButton.addEventListener('click', toggleFormat);
colorInput.addEventListener('input', applyCustomizations);
fontSizeInput.addEventListener('input', applyCustomizations);
setAlarmButton.addEventListener('click', setAlarm);

setInterval(updateClock, 1000);
setInterval(checkAlarms, 1000);

loadPreferences();
renderAlarms();
updateClock();
