import { changeSetting, store } from "./redux/settingsSlice";

("use strict");
console.clear();
function log() {
  console.log("📄", ...arguments);
}
function error() {
  console.error("❌", ...arguments);
}
function message(str) {
  const message = document.getElementById("message");
  message.innerHTML = str;
  message.animate(
    [
      {
        opacity: 0,
      },
    ],
    {
      duration: 2000,
      fill: "forwards",
    }
  );
  setTimeout(() => {
    message.innerHTML = "";
  }, 2000);
}
// Render a random quote.
const quotes = [
  {
    quote:
      "Most people overestimate what they can do in one year and underestimate what they can do in ten years.",
    author: " - Bill Gates",
  },
  {
    quote:
      "A side effect of memory training... is an improvement in your general ability to concentrate. This ability can then be fruitfully applied to any task demanding deep work.",
    author: " - Cal Newport, Deep Work",
  },
  {
    quote:
      "Regularity is king, and it will actually anchor your sleep and improve both the quantity and the quality, no matter whether it's the weekday or the weekend or even if you've had a bad night of sleep.",
    author: " - Matthew Walker, Why We Sleep",
  },
  {
    quote:
      "Your brain and body need to drop their core temperature by about one degree Celsius or around two degrees Fahrenheit in order to initiate sleep and then to stay asleep... aim for a bedroom temperature of around 65 degrees Fahrenheit, or a little over 18 degrees Celsius.",
    author: " - Matthew Walker, Why We Sleep",
  },
  {
    quote:
      "We need darkness, especially in the evening to trigger the release of a hormone called melatonin. And melatonin helps regulate the healthy timing of our sleep. In the last hour before bed, try to stay away from all of those computer screens and tablets and phones. Dim down half the lights in your house. You'd actually be quite surprised at how sleepy that can make you feel.",
    author: " - Matthew Walker, Why We Sleep",
  },
  {
    quote:
      "If you've been trying to fall asleep and it's been 25 minutes or so, or you've woken up and you can't get back to sleep after 25 minutes, the recommendation is to get out of bed and go and do something different. And the reason is because your brain is an incredibly associative device. The brain has learned the association that the bed is this trigger of wakefulness, and we need to break that association.",
    author: " - Matthew Walker, Why We Sleep",
  },
  {
    quote:
      "A good rule of thumb here is to try to stay away from caffeine in the afternoon and in the evening and certainly try not to go to bed too tipsy.",
    author: " - Matthew Walker, Why We Sleep",
  },
  {
    quote:
      "Sleep, as a physiological process, is much more similar to landing a plane. It takes time for your brain to gradually descend down onto the firm bedrock of good sleep. In the last 20 minutes before bed or the last half an hour, even the last hour, disengage from your computer and your phone and try to do something relaxing.",
    author: " - Matthew Walker, Why We Sleep",
  },
  {
    quote: "Who you are is defined by what you’re willing to struggle for.",
    author: " - Mark Manson, The Subtle Art of Not Giving a Fuck",
  },
  {
    quote:
      "To be happy we need something to solve. Happiness is therefore a form of action.",
    author: " - Mark Manson, The Subtle Art of Not Giving a Fuck",
  },
  {
    quote:
      "The desire for more positive experience is itself a negative experience. And, paradoxically, the acceptance of one’s negative experience is itself a positive experience.",
    author: " - Mark Manson, The Subtle Art of Not Giving a Fuck",
  },
  {
    quote:
      "This is the most simple and basic component of life: our struggles determine our successes.",
    author: " - Mark Manson, The Subtle Art of Not Giving a Fuck",
  },
  {
    quote:
      "The more something threatens your identity, the more you will avoid it.",
    author: " - Mark Manson, The Subtle Art of Not Giving a Fuck",
  },
  {
    quote:
      "You do not rise to the level of your goals. You fall to the level of your systems.",
    author: " - James Clear, Atomic Habits",
  },
  {
    quote:
      "Every action you take is a vote for the type of person you wish to become. No single instance will transform your beliefs, but as the votes build up, so does the evidence of your new identity.",
    author: " - James Clear, Atomic Habits",
  },
  {
    quote:
      "You should be far more concerned with your current trajectory than with your current results.",
    author: " - James Clear, Atomic Habits",
  },
  {
    quote:
      "When you fall in love with the process rather than the product, you don’t have to wait to give yourself permission to be happy. You can be satisfied anytime your system is running.",
    author: " - James Clear, Atomic Habits",
  },
  {
    quote:
      "Goals are good for setting a direction, but systems are best for making progress.",
    author: " - James Clear, Atomic Habits",
  },
  {
    quote:
      "Now I think it’s one of the most useless questions an adult can ask a child—What do you want to be when you grow up? As if growing up is finite. As if at some point you become something and that’s the end.",
    author: " - Michelle Obama, Becoming",
  },
  {
    quote:
      "If you don’t get out there and define yourself, you’ll be quickly and inaccurately defined by others.",
    author: " - Michelle Obama, Becoming",
  },
  {
    quote:
      "For me, becoming isn’t about arriving somewhere or achieving a certain aim. I see it instead as forward motion, a means of evolving, a way to reach continuously toward a better self. The journey doesn’t end.",
    author: " - Michelle Obama, Becoming",
  },
  {
    quote:
      "Do we settle for the world as it is, or do we work for the world as it should be?",
    author: " - Michelle Obama, Becoming",
  },
  {
    quote:
      "Telomeres, which shorten with each cell division, help determine how fast your cells age and when they die, depending on how quickly they wear down.",
    author: " - Elissa Epel and Elizabeth Blackburn, The Telomere Effect",
  },
  {
    quote:
      "You will never change your life until you change something you do daily. The secret of your success is found in your daily routine.",
    author: " - Darren Hardy, The Compound Effect",
  },
  {
    quote:
      "It's not the big things that add up in the end; it's the hundreds, thousands, or millions of little things that separate the ordinary from the extraordinary.",
    author: " - Darren Hardy, The Compound Effect",
  },
  {
    quote:
      "The first step toward change is awareness. If you want to get from where you are to where you want to be, you have to start by becoming aware of the choices that lead you away from your desired destination.",
    author: " - Darren Hardy, The Compound Effect",
  },
  {
    quote: "In essence, you make your choices, and then your choices make you.",
    author: " - Darren Hardy, The Compound Effect",
  },
];
const greetings = ["Hi there", "Hello", "How are you?", "Hey", "Howdy", "Welcome", "*nod*", "╰(*°▽°*)╯", "(^///^)", "Good to see ya 🙂"];
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
const quoteText = document.querySelector(".quoteText");
const quoteAuthor = document.querySelector(".quoteAuthor");
quoteText.append(randomQuote.quote);
quoteAuthor.append(randomQuote.author);

message(greetings[Math.floor(Math.random() * greetings.length)]);

// Listen for changes by the user.
const settingInputs = Array.from(document.getElementsByClassName("setting"));
settingInputs.forEach(setting =>
  setting.addEventListener("change", event =>
    store.dispatch(
      changeSetting([
        event.target.dataset.setting,
        parseFloat(event.target.value),
      ])
    )
  )
);

// Render the timer when form submits.
document.querySelector("#main").onsubmit = async function (event) {
  event.preventDefault();
  message("Starting... ✌⏳");
  let {
    focus: focusSeconds,
    shortBreak: shortBreakSeconds,
    longBreak: longBreakSeconds,
    sessions,
    cycles,
  } = store.getState().settings;
  focusSeconds *= 60;
  shortBreakSeconds *= 60;
  longBreakSeconds *= 60;
  // Checking that store settings match HTML values.
  try {
    for (let key in store.getState().settings) {
      const currentSetting = store.getState().settings[key];
      const correspondingInputValue = parseFloat(
        document.querySelector(`[data-setting="${key}"]`).value
      );
      if (currentSetting !== correspondingInputValue)
        throw `currentSetting ${currentSetting} does not match corresponidingValue ${correspondingInputValue}`;
    }

    // Render timer and content first, then animate transition.
    function secondsToMinutes(int) {
      if (!Number.isInteger(int))
        throw "Invalid secondsToMinutes() param: " + int;
      const seconds = int % 60,
        minutes = int >= 60 ? (int - seconds) / 60 : 0;
      return `${minutes}:${seconds}`;
    }
    function updateTime(time) {
      document.querySelector(".currentTime").innerHTML = time;
    }
    function updateActivity(activity) {
      document.querySelector(".currentActivity").innerHTML = activity;
    }
    function updateCycle(current, total) {
      document.querySelector(".currentCycle").innerHTML = `Cycle ${
        total - (current - 1)
      } of ${total}`;
    }
    async function timer(sessionType, seconds, message = "") {
      // Remember, this returns a promise, either resolved or rejected.
      // A function that creates a custom timer for the number of secionds passed, returns the
      try {
        updateActivity(sessionType);
        const countdown = await new Promise((resolve, reject) => {
          // I can mutate the seconds variable passed, because this function will be reused and mutating the argument passed does not mutate the original variable.
          const count = setInterval(() => {
            try {
              updateTime(secondsToMinutes(seconds));
              seconds--;
              if (seconds < 0) {
                new Audio("audio/notification.mp3").play();
                message(message);
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
        // Can I throw an error here? Will the outside catch{} block handle it?
        throw err;
        // error(err);
        // alert("Something went wrong. Please refresh and try again.");
      }
    }

    const scrollElement = document.querySelector(".scroll");
    const options = {
      duration: 750,
      fill: "forwards",
      easing: "ease-in-out",
    };
    scrollElement.animate(
      [
        {
          // Negative means to the left; 50% because the parent element is twice as large as the body.
          transform: "translate(-50%)",
        },
      ],
      options
    );

    let cyclesRemaining = cycles;
    updateCycle(cyclesRemaining, cycles);
    while (cyclesRemaining > 0) {
      let sessionsRemaining = sessions;
      while (sessionsRemaining > 0) {
        await timer("Focus session", focusSeconds);
        sessionsRemaining--;
        if (sessionsRemaining > 0)
          await timer("Short break", shortBreakSeconds);
      }
      cyclesRemaining--;
      if (cyclesRemaining > 0) {
        updateCycle(cyclesRemaining, cycles);
        await timer("Long break", longBreakSeconds);
      }
    }
    message("All cycles complete ✨✨👏");
    scrollElement.animate(
      [
        {
          transform: "translate(-50%)",
        },
        {
          transform: "translate(0)",
        },
      ],
      options
    );
  } catch (err) {
    error(err);
    alert("Something went wrong. Please refresh and try again.");
  }
};
