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
  console.log(`🕑 ${minutes}:${seconds}`);
}

// Let me instead subtract from sessionsRemaining and cyclesRemaining at the start of the loops rather than at the end, or even immediately after them but before breaks.
/* 
  1. initialize cyclesRemaining, and create a loop that runs while cyclesRemaining > 0.
  2. initialize the sessionsRemaining variable.
  3. create another loop that runs while sessionsRemaining > 0, and decrement sessionsRemaining at the start of it.
  4. run a session then decrement, and then run a short break IF sessionsRemaining is still > 0.
  5. decrement the cyclesRemaining variable after the cycle is over, and run a long break IF there are more cycles.
  6. otherwise, return the user to the main page, and log a message acknowledging their efforts maybe?
*/
async function pomodoro2({ focus, shortBreak, longBreak, sessions, cycles }) {
  try {
    while (cycles > 0) {
      let sessionsRemaining = sessions;
      while (sessionsRemaining > 0) {
        log("Focus session starting...");
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
        log(focusTimer); // Not error(), since that would be handled by the surrounding try {} catch{}.
        sessionsRemaining--;
        if (sessionsRemaining > 0) {
          // Run a short break if there are still sessionsRemaining.
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
          log(shortBreakTimer);
        }
      }
      cycles--;
      log("Cycle complete.");
      if (cycles > 0) {
        // Run a long break if there are more cycles remaining.
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
        log(longBreakTimer);
      }
    }
    log("All cycles complete, returning to main page...");
  } catch (err) {
    error(err);
  }
}
// pomodoro2() returns a promise, and should be handled as such.

// Now, I think I can make this even cleaner by creating a function with an async function inside it, sort of like this function.

async function watiForPomodoro() {
  log(1);
  log(2);
  log(3);
  log(4);
  // Don't need to store the value of this promise.
  await pomodoro2(data);
  log(5);
  log(6);
  log(7);
}

// I can create a function that receives a seconds argument and a variable, and creates a timer for the number of seconds passed, decrementing the second variable passed once the timer is over. Then I can call it for every different time I use.

async function pomodoro({
  focusSeconds,
  shortBreakSeconds,
  longBreakSeconds,
  sessions,
  cycles,
}) {
  // Pomodoro will ALSO return a promise.
  async function timer(sessionType, seconds) {
    // Remember, this returns a promise, either resolved or rejected.
    // A function that creates a custom timer for the number of secionds passed, returns the
    try {
      log(`${sessionType} starting...`);
      const countdown = await new Promise((resolve, reject) => {
        // I can mutate the seconds variable passed, because this function will be reused and mutating the argument passed does not mutate the original variable.
        const count = setInterval(() => {
          try {
            secondsToMinutes(seconds);
            seconds--;
            if (seconds < 0) {
              resolve(`${sessionType} finished.`);
              clearInterval(count);
            }
          } catch (err) {
            reject(err);
            clearInterval(count);
          }
        }, 1000);
      });
      log(countdown);
    } catch (err) {
      error(err);
    }
  }
  try {
    while (cycles > 0) {
      let sessionsRemaining = sessions;
      while (sessionsRemaining > 0) {
        await timer("Focus session", focusSeconds);
        sessionsRemaining--;
        if (sessionsRemaining > 0)
          await timer("Short break", shortBreakSeconds);
      }
      log("Cycle complete.");
      cycles--;
      if (cycles > 0) await timer("Long break", longBreakSeconds);
    }
    log("All cycles complete!!");
  } catch (err) {
    error(err);
  }
}

const data = {
  focusSeconds: 1,
  shortBreakSeconds: 1,
  longBreakSeconds: 1,
  sessions: 2,
  cycles: 2,
};

// Alright, this works. Now, I will implement this, and then add a transition one I've got it working.

let num = 2;
num *= 3;
log(num);