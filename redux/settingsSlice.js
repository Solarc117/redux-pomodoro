import { createSlice, configureStore } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    sessions: 4,
    cycles: 1
  },
  reducers: {
    // action.payload is an array containing a string describing which setting to change, and a number representing the value to set it to. 
    changeSetting: (state, action) => {
      console.log(`processing payload --${action.payload.join("--")}-- of type ${typeof action.payload}...`);
      switch (action.payload[0]) {
        case "focus":
          if (action.payload[1] >= 0 && action.payload[1] <= 300) state.focus = action.payload[1];
          break;
        case "shortBreak":
          if (action.payload[1] >= 0 && action.payload[1] <= 300) state.shortBreak = action.payload[1];
          break;
        case "longBreak":
          if (action.payload[1] >= 0 && action.payload[1] <= 300) state.longBreak = action.payload[1];
          break;  
        case "sessions":
          if (action.payload[1] >= 0 && action.payload[1] <= 10) state.sessions = action.payload[1];
          break;
        case "cycles":
          if (action.payload[1] >= 0 && action.payload[1] <= 10) state.cycles = action.payload[1];
          break;
        default:
          console.error("changeSetting reducer error - invalid action.payload[0] value: " + action.payload);
          break;
      }
    }
  }
});

export const { changeSetting } = settingsSlice.actions;  

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer
  }
});

// const timerSlice = createSlice({
//   name: "timers",
//   initialState: {
//     phases: [
//       "session",
//       "shortBreak",
//       "session",
//       "shortBreak",
//       "session",
//       "shortBreak",
//       "session",
//       "longBreak"
//     ],
//     sessionLength: 25,
//     shortBreakLength: 5,
//     longBreakLength: 15,
//     currentPhase: 0, 
//   },
//   reducers: {
//     editLenght: (state, action) => { // Payload can be an array with two values: the variable to change ("session", "shortBreak", "longBreak"). Switch the first value, and adjust it by the second value (a num).
//       switch (action.payload[0]) {
//         case "session":
//           state.sessionLength += action.payload[1];
//           break;
//         case "shortBreak":
//           state.shortBreak += action.payload[1];
//           break;
//         case "longBreak":
//           state.shortBreak += action.payload[1];
//           break;
//         default:
//           console.warn("Invalid payload variable.");
//           break;
//       }
//     },
//     nextPhase: state => { // Add 1 to the currentPhase index if it is less than seven. Otherwise, reset it to 0.
//       state.currentPhase < 7 ? state.currentPhase += 1 : state.currentPhase = 0;
//     },
//   }
// })
// export const { editLength, nextPhase } = settingSlice.actions;
