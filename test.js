("use strict");
console.clear();
function log() {
  console.log("📄", ...arguments);
}
function error() {
  console.error("❌", ...arguments);
}

// Write a promise chain that utilizes the two provided time values and creates an interval that logs the first value all the way down to zero, then creates another timer for the second value and logs that all the way down to zero once the first timer has expired.

function secondsToMinutes(int) {
  if (!Number.isInteger(int))
    // Does this reject the promise?
    throw `Invalid secondsToMinutes() param: ${int}`;
  const seconds = int % 60,
    minutes = int >= 60 ? (int - seconds) / 60 : 0;
  log(`${minutes}:${seconds}`);
}

const times = {
  time1: 5.2,
  time2: 2,
};

(async function () {
  try {
    log("Timer started.");
    let timer1Result = await new Promise((resolve, reject) => {
      let timeRemaining = times.time1;
      const count = setInterval(() => {
        try {
          secondsToMinutes(timeRemaining);
        } catch (err) {
          reject(err);
        }
        timeRemaining--;
        if (timeRemaining < 0) {
          clearInterval(count);
          resolve("Timer1 finished");
        }
      }, 1000);
    }).catch(err => error(err));
    log("timer1Result:", timer1Result);
    let timer2Result = await new Promise(resolve => {
      let timeRemaining = times.time1;
      const count = setInterval(() => {
        try {
          secondsToMinutes(timeRemaining);
        } catch (err) {
          error(err);
        }
        timeRemaining--;
        if (timeRemaining < 0) {
          clearInterval(count);
          resolve("Timer2 finished!");
        }
      }, 1000);
    }).catch(err => error(err));
    log(timer2Result);
  } catch (err) {
    error(err);
  }
})();

// (async function () {
//   try {
//     let time = 2;
//     let result = await new Promise(resolve => {
//       const count = setInterval(() => {
//         log(time);
//         time--;
//         if (time < 0) {
//           resolve("Timer end.");
//           clearInterval(count);
//         };
//       }, 1000);
//     })
//     log(result);
//   } catch (err) {
//     error(err);
//   }
// })();
// Value should be undefined.
// new Promise(resolve => {
//   console.log("Timer started.");
//   let timeRemaining = times.time1;
//   // By this point, we presume all the times are valid, and even if they're not, secondsToMinutes should throw an error that would reject the promise.
//   // Create a timer that counts down and logs the first value down to 0, and then resolves.
//   const timeLogger = setInterval(() => {
//     secondsToMinutes(timeRemaining);
//     timeRemaining--;
//     if (timeRemaining < 0) {
//       clearInterval(timeLogger);
//       resolve("Timer1 finished!");
//     }
//   }, 1000);
// })
//   .then(message1 => {
//     console.log("message1:", message1);
//     let timeRemaining = times.time2;
//     return new Promise(resolve => {
//       const timeLogger = setInterval(() => {
//         secondsToMinutes(timeRemaining);
//         timeRemaining--;
//         if (timeRemaining < 0) {
//           clearInterval(timeLogger);
//           resolve("Time2 finished!");
//         }
//       }, 1000);
//     })
//   })
//   .then(message2 => {
//     console.log("message2:", message2);;
//   })
//   .catch(err => {
//     error(err);
//   });
