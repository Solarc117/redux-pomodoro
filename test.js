("use strict");
console.clear();
function log() {
  console.log("📄", ...arguments);
}
function error() {
  console.error("❌", ...arguments);
}

function secondsToMinutes(int) {
  if (!Number.isInteger(int))
    // Make sure this rejects the promise.
    throw `Invalid secondsToMinutes() param: ${int}`;
  const seconds = int % 60,
    minutes = int >= 60 ? (int - seconds) / 60 : 0;
  log(`${minutes}:${seconds}`);
}

async function pomodoro({
  focus,
  shortBreak,
  longBreak = 0,
  sessions,
  cycles,
}) {
  // Want to avoid mutating these arguments, since they might be needed them more than once.
  try {
    let cyclesRemaining = cycles;
    let sessionsRemaining = sessions;
    log("Focus session starting...");
    const focusTimer = await new Promise((resolve, reject) => {
      let timeRemaining = focus;
      const count = setInterval(() => {
        try {
          secondsToMinutes(timeRemaining);
          timeRemaining--;
          if (timeRemaining < 0) {
            // Not (timeRemaining = 0), because the UI should display 0:0.
            resolve("Focus session finished.");
            clearInterval(count);
          }
        } catch (err) {
          reject(err);
          clearInterval(count);
        }
      }, 1000);
    });
    log(focusTimer);
    sessionsRemaining--;
    while (sessionsRemaining > 0) {
      log("Short break starting...");
      const shortBreakTimer = await new Promise((resolve, reject) => {
        let timeRemaining = shortBreak;
        const count = setInterval(() => {
          try {
            secondsToMinutes(timeRemaining);
            timeRemaining--;
            if (timeRemaining < 0) {
              resolve("Short break finished.");
              clearInterval(count);
            }
          } catch (err) {
            reject(err);
            clearInterval(count);
          }
        }, 1000);
      });
      log(shortBreakTimer, "Focus session starting...");
      const focusTimer = await new Promise((resolve, reject) => {
        let timeRemaining = focus;
        const count = setInterval(() => {
          try {
            secondsToMinutes(timeRemaining);
            timeRemaining--;
            if (timeRemaining < 0) {
              resolve("Focus session finished.");
              clearInterval(count);
            }
          } catch (err) {
            reject(err);
            clearInterval(count);
          }
        }, 1000);
      });
      log(focusTimer);
      sessionsRemaining--;
    }
    cyclesRemaining--;
    log(`Cycle complete!`);
    while (cyclesRemaining > 0) {
      log(`Cycles remaining: ${cyclesRemaining}`);
      log("Long break starting...");
      const longBreakTimer = await new Promise((resolve, reject) => {
        let timeRemaining = longBreak;
        const count = setInterval(() => {
          try {
            secondsToMinutes(timeRemaining);
            timeRemaining--;
            if (timeRemaining < 0) {
              resolve("Long break finished.");
              clearInterval(count);
            }
          } catch (err) {
            reject(err);
            clearInterval(count);
          }
        }, 1000);
      });
      // We reset the number of sessions after each cycle.
      sessionsRemaining = sessions;
      log("Focus session starting...");
      const focusTimer = await new Promise((resolve, reject) => {
        let timeRemaining = focus;
        const count = setInterval(() => {
          try {
            secondsToMinutes(timeRemaining);
            timeRemaining--;
            if (timeRemaining < 0) {
              // Not (timeRemaining = 0) because the UI should display 0:0.
              resolve("Focus session finished.");
              clearInterval(count);
            }
          } catch (err) {
            reject(err);
            clearInterval(count);
          }
        }, 1000);
      });
      log(focusTimer);
      sessionsRemaining--;
      while (sessionsRemaining > 0) {
        log("Short break starting...");
        const shortBreakTimer = await new Promise((resolve, reject) => {
          let timeRemaining = shortBreak;
          const count = setInterval(() => {
            try {
              secondsToMinutes(timeRemaining);
              timeRemaining--;
              if (timeRemaining < 0) {
                resolve("Short break finished.");
                clearInterval(count);
              }
            } catch (err) {
              reject(err);
              clearInterval(count);
            }
          }, 1000);
        });
        log(shortBreakTimer, "Focus session starting...");
        const focusTimer = await new Promise((resolve, reject) => {
          let timeRemaining = focus;
          const count = setInterval(() => {
            try {
              secondsToMinutes(timeRemaining);
              timeRemaining--;
              if (timeRemaining < 0) {
                resolve("Focus session finished.");
                clearInterval(count);
              }
            } catch (err) {
              reject(err);
              clearInterval(count);
            }
          }, 1000);
        });
        log(focusTimer);
        sessionsRemaining--;
      }
      cyclesRemaining--;
    }
    log("All cycles complete!");
  } catch (err) {
    error(err);
  }
}

// Now, I really do need to clean this code up before integrating it into my application.
// Most of the redundancy right now comes from doing a single cycle and a single focus session before entering the while loops.

// Let me instead subtract from sessionsRemaining and cyclesRemaining at the start of the loops rather than at the end, or even immediately after them but before breaks.

async function pomodoro2({
  focus,
  shortBreak,
  longBreak = 0, // Requires a default value because if cycles is 1, there are no long breaks.
  sessions,
  cycles,
}) {
  // Want to avoid mutating these arguments, since they might be needed them more than once.
  try {
    let cyclesRemaining = cycles;
    let sessionsRemaining = sessions;
    log("Focus session starting...");
    const focusTimer = await new Promise((resolve, reject) => {
      let timeRemaining = focus;
      const count = setInterval(() => {
        try {
          secondsToMinutes(timeRemaining);
          timeRemaining--;
          if (timeRemaining < 0) {
            // Not (timeRemaining = 0), because the UI should display 0:0.
            resolve("Focus session finished.");
            clearInterval(count);
          }
        } catch (err) {
          reject(err);
          clearInterval(count);
        }
      }, 1000);
    });
    log(focusTimer);
    sessionsRemaining--;
    while (sessionsRemaining > 0) {
      log("Short break starting...");
      const shortBreakTimer = await new Promise((resolve, reject) => {
        let timeRemaining = shortBreak;
        const count = setInterval(() => {
          try {
            secondsToMinutes(timeRemaining);
            timeRemaining--;
            if (timeRemaining < 0) {
              resolve("Short break finished.");
              clearInterval(count);
            }
          } catch (err) {
            reject(err);
            clearInterval(count);
          }
        }, 1000);
      });
      log(shortBreakTimer, "Focus session starting...");
      const focusTimer = await new Promise((resolve, reject) => {
        let timeRemaining = focus;
        const count = setInterval(() => {
          try {
            secondsToMinutes(timeRemaining);
            timeRemaining--;
            if (timeRemaining < 0) {
              resolve("Focus session finished.");
              clearInterval(count);
            }
          } catch (err) {
            reject(err);
            clearInterval(count);
          }
        }, 1000);
      });
      log(focusTimer);
      sessionsRemaining--;
    }
    cyclesRemaining--;
    log(`Cycle complete!`);
    while (cyclesRemaining > 0) {
      log(`Cycles remaining: ${cyclesRemaining}`);
      log("Long break starting...");
      const longBreakTimer = await new Promise((resolve, reject) => {
        let timeRemaining = longBreak;
        const count = setInterval(() => {
          try {
            secondsToMinutes(timeRemaining);
            timeRemaining--;
            if (timeRemaining < 0) {
              resolve("Long break finished.");
              clearInterval(count);
            }
          } catch (err) {
            reject(err);
            clearInterval(count);
          }
        }, 1000);
      });
      // We reset the number of sessions after each cycle.
      sessionsRemaining = sessions;
      log("Focus session starting...");
      const focusTimer = await new Promise((resolve, reject) => {
        let timeRemaining = focus;
        const count = setInterval(() => {
          try {
            secondsToMinutes(timeRemaining);
            timeRemaining--;
            if (timeRemaining < 0) {
              // Not (timeRemaining = 0) because the UI should display 0:0.
              resolve("Focus session finished.");
              clearInterval(count);
            }
          } catch (err) {
            reject(err);
            clearInterval(count);
          }
        }, 1000);
      });
      log(focusTimer);
      sessionsRemaining--;
      while (sessionsRemaining > 0) {
        log("Short break starting...");
        const shortBreakTimer = await new Promise((resolve, reject) => {
          let timeRemaining = shortBreak;
          const count = setInterval(() => {
            try {
              secondsToMinutes(timeRemaining);
              timeRemaining--;
              if (timeRemaining < 0) {
                resolve("Short break finished.");
                clearInterval(count);
              }
            } catch (err) {
              reject(err);
              clearInterval(count);
            }
          }, 1000);
        });
        log(shortBreakTimer, "Focus session starting...");
        const focusTimer = await new Promise((resolve, reject) => {
          let timeRemaining = focus;
          const count = setInterval(() => {
            try {
              secondsToMinutes(timeRemaining);
              timeRemaining--;
              if (timeRemaining < 0) {
                resolve("Focus session finished.");
                clearInterval(count);
              }
            } catch (err) {
              reject(err);
              clearInterval(count);
            }
          }, 1000);
        });
        log(focusTimer);
        sessionsRemaining--;
      }
      cyclesRemaining--;
    }
    log("All cycles complete!");
  } catch (err) {
    error(err);
  }
}

const data = {
  focus: 2,
  shortBreak: 1,
  longBreak: 2,
  sessions: 1,
  cycles: 2,
};

pomodoro2(data);

