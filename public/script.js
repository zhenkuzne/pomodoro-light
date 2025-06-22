const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

class PomodoroTimer {
  constructor(workMinutes = 25, breakMinutes = 5) {
    this.workMinutes = workMinutes;
    this.breakMinutes = breakMinutes;
    this.isRunning = false;
    this.isWorkSession = true;
    this.timeLeft = this.workMinutes * 60; // seconds
    this.intervalId = null;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.intervalId);
  }

  reset() {
    this.pause();
    this.isWorkSession = true;
    this.timeLeft = this.workMinutes * 60;
  }

  tick() {
    if (this.timeLeft > 0) {
      this.timeLeft--;
    } else {
      this.isWorkSession = !this.isWorkSession;
      this.timeLeft = (this.isWorkSession ? this.workMinutes : this.breakMinutes) * 60;
      // Optionally, notify user of session switch here
    }

    this.writeTime();
  }

  writeTime() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;

    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
  }
}

const pomodoroTimer = new PomodoroTimer();

const play = document.getElementById("play");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");

play.addEventListener("click", () => {
  play.classList.add("hidden");
  pause.classList.remove("hidden");
  reset.classList.remove("hidden");
  pomodoroTimer.start();
})

pause.addEventListener("click", () => {
  play.classList.remove("hidden");
  pause.classList.add("hidden");
  reset.classList.remove("hidden");
  pomodoroTimer.pause();
})

reset.addEventListener("click", () => {
  play.classList.remove("hidden");
  pause.classList.add("hidden");
  reset.classList.add("hidden");
  pomodoroTimer.reset();
  pomodoroTimer.writeTime();
});
