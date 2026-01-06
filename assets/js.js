const main = document.getElementsByTagName("MAIN")[0];
const container = document.getElementById("container");
const clock = document.querySelector("#clock h1");
const clockBtn = document.querySelector("#clockBtn");
const header = document.getElementsByTagName("header")[0];
const h4 = document.querySelectorAll("h4");
const newAlarm = document.querySelector(".newAlarm");
const addBtn = document.getElementById("addAlarmBtn");
const alarms = document.getElementById("alarms");
const arrow = document.getElementById("arrow");
let alarmsArray = [];
let questionsTaken = [];
let resolved = true;
let counter = 0;
// obj for the questions

const quizMath = [
  { question: "Quanto fa 2 + 2?", answers: [3, 4], rightAnswer: 1 },
  { question: "Quanto fa 5 - 3?", answers: [2, 3], rightAnswer: 0 },
  { question: "Quanto fa 4 x 2?", answers: [6, 8], rightAnswer: 1 },
  { question: "Quanto fa 10 ÷ 2?", answers: [4, 5], rightAnswer: 1 },
  { question: "Quanto fa 7 + 1?", answers: [8, 9], rightAnswer: 0 },
  { question: "Quanto fa 9 - 4?", answers: [6, 5], rightAnswer: 1 },
  { question: "Quanto fa 3 x 3?", answers: [9, 6], rightAnswer: 0 },
  { question: "Quanto fa 8 ÷ 4?", answers: [2, 4], rightAnswer: 0 },
  { question: "Quanto fa 6 + 3?", answers: [10, 9], rightAnswer: 1 },
  { question: "Quanto fa 12 - 7?", answers: [5, 6], rightAnswer: 0 },

  { question: "Quanto fa 5 + 5?", answers: [10, 11], rightAnswer: 0 },
  { question: "Quanto fa 14 - 6?", answers: [8, 9], rightAnswer: 0 },
  { question: "Quanto fa 2 x 6?", answers: [10, 12], rightAnswer: 1 },
  { question: "Quanto fa 16 ÷ 4?", answers: [3, 4], rightAnswer: 1 },
  { question: "Quanto fa 9 + 1?", answers: [10, 11], rightAnswer: 0 },
  { question: "Quanto fa 11 - 5?", answers: [6, 5], rightAnswer: 0 },
  { question: "Quanto fa 4 x 3?", answers: [12, 10], rightAnswer: 0 },
  { question: "Quanto fa 18 ÷ 3?", answers: [5, 6], rightAnswer: 1 },
  { question: "Quanto fa 8 + 7?", answers: [14, 15], rightAnswer: 1 },
  { question: "Quanto fa 15 - 9?", answers: [6, 7], rightAnswer: 0 },

  { question: "Quanto fa 6 x 2?", answers: [12, 14], rightAnswer: 0 },
  { question: "Quanto fa 20 ÷ 5?", answers: [4, 5], rightAnswer: 0 },
  { question: "Quanto fa 13 + 2?", answers: [14, 15], rightAnswer: 1 },
  { question: "Quanto fa 17 - 10?", answers: [6, 7], rightAnswer: 1 },
  { question: "Quanto fa 5 x 4?", answers: [20, 25], rightAnswer: 0 },
  { question: "Quanto fa 24 ÷ 6?", answers: [4, 5], rightAnswer: 0 },
  { question: "Quanto fa 10 + 8?", answers: [18, 17], rightAnswer: 0 },
  { question: "Quanto fa 16 - 8?", answers: [7, 8], rightAnswer: 1 },
  { question: "Quanto fa 7 x 2?", answers: [14, 16], rightAnswer: 0 },
  { question: "Quanto fa 21 ÷ 7?", answers: [3, 4], rightAnswer: 0 },

  { question: "Quanto fa 4 + 9?", answers: [12, 13], rightAnswer: 1 },
  { question: "Quanto fa 18 - 9?", answers: [9, 8], rightAnswer: 0 },
  { question: "Quanto fa 3 x 5?", answers: [15, 18], rightAnswer: 0 },
  { question: "Quanto fa 30 ÷ 5?", answers: [5, 6], rightAnswer: 1 },
  { question: "Quanto fa 11 + 4?", answers: [15, 16], rightAnswer: 0 },
  { question: "Quanto fa 20 - 11?", answers: [9, 10], rightAnswer: 0 },
  { question: "Quanto fa 8 x 2?", answers: [16, 18], rightAnswer: 0 },
  { question: "Quanto fa 36 ÷ 6?", answers: [6, 7], rightAnswer: 0 },
  { question: "Quanto fa 14 + 5?", answers: [18, 19], rightAnswer: 1 },
  { question: "Quanto fa 19 - 4?", answers: [15, 14], rightAnswer: 0 },
];
// clock function
const timeCheck = () => {
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  clock.innerText = hour + ":" + minutes + ":" + seconds;
  alarmsCheck(hour, minutes, seconds);
  requestAnimationFrame(timeCheck);
};
timeCheck();

// function for the triggered alarm

function trigger() {
  header.classList.add("hide");
  clock.classList.add("hide");
  alarms.classList.add("hide");
  addBtn.classList.remove("hide");
  main.classList.add("qMain");
  // quiz creation
  quizCreations();
}

// function for check if the alarm its triggered or not
function alarmsCheck(hour, minutes, seconds) {
  if (!resolved) return;
  for (let i = 0; i < alarmsArray.length; i++) {
    if (alarmsArray[i].innerText + ":" + "00" === hour + ":" + minutes + ":" + seconds) {
      resolved = false;
      trigger();
      return;
    }
  }
}
// function for the quiz creation

function quizCreations() {
  // question insert
  const index = randomQuiz(quizMath.length);
  // container
  const divContainer = document.createElement("div");
  divContainer.id = "questionContainer";
  // question
  const divQuestion = document.createElement("div");
  divQuestion.id = "question";
  const h1 = document.createElement("h1");
  h1.innerText = quizMath[index].question;
  //answers
  const divAnswers = document.createElement("div");
  divAnswers.id = "answers";
  // answer 1
  const divAnswer1 = document.createElement("div");
  divAnswer1.classList.add("answer");
  const h2Answer1 = document.createElement("h2");
  h2Answer1.innerText = quizMath[index].answers[0];
  // append h2 on a1
  divAnswer1.appendChild(h2Answer1);
  // answer 2
  const divAnswer2 = document.createElement("div");
  divAnswer2.classList.add("answer");
  const h2Answer2 = document.createElement("h2");
  h2Answer2.innerText = quizMath[index].answers[1];
  // append h2 on a2
  divAnswer2.appendChild(h2Answer2);
  // counter
  const divCounter = document.createElement("div");
  divCounter.id = "counter";
  const h2Counter = document.createElement("h2");
  h2Counter.innerText = `${counter}/3`;
  // append h2counter
  divCounter.appendChild(h2Counter);
  //apppend answers
  divAnswers.append(divAnswer1, divAnswer2);
  //append question
  divQuestion.appendChild(h1);
  // append
  divContainer.append(divQuestion, divAnswers, divCounter);
  main.appendChild(divContainer);
  // answers listeners
  divAnswer1.addEventListener("click", (e) => {
    if (h2Answer1.innerText == quizMath[index].answers[quizMath[index].rightAnswer]) {
      divAnswer1.classList.add("right");
      counter++;
      setTimeout(() => {
        divContainer.remove();
        quizCreations();
      }, 500);
    } else {
      divAnswer1.classList.add("wrong");
      setTimeout(() => {
        divContainer.remove();
        quizCreations();
      }, 500);
    }
  });
  divAnswer2.addEventListener("click", (e) => {
    if (h2Answer2.innerText == quizMath[index].answers[quizMath[index].rightAnswer]) {
      divAnswer2.classList.add("right");
      counter++;
      setTimeout(() => {
        divContainer.remove();
        quizCreations();
      }, 500);
    } else {
      divAnswer2.classList.add("wrong");
      setTimeout(() => {
        divContainer.remove();
        quizCreations();
      }, 500);
    }
  });
  if (counter === 3) {
    header.classList.remove("hide");
    clock.classList.remove("hide");
    main.classList.remove("qMain");
    h4.forEach((e) => e.classList.remove("sectionSelected"));
    clockBtn.classList.add("sectionSelected");
    addBtn.classList.add("hide");
    divContainer.remove();
    resolved = true;
    counter = 0;
    return;
  }
}
// section changer with a listener

header.addEventListener("click", (e) => {
  if (e.target.tagName === "H4") {
    h4.forEach((e) => e.classList.remove("sectionSelected"));
    e.target.classList.add("sectionSelected");
    if (e.target.innerText === "ALARMS") {
      clock.classList.add("hide");
      addBtn.classList.remove("hide");
      alarms.classList.remove("hide");
    }
    if (e.target.innerText === "CLOCK") {
      clock.classList.remove("hide");
      addBtn.classList.add("hide");
      alarms.classList.add("hide");
      newAlarm.classList.add("hideMenu");
    }
  }
});

// function for the creation of the new alarm section

const creationHour = () => {
  const div = document.createElement("div");
  const div2 = document.createElement("div");
  div2.classList.add("Add");
  div.classList.add("setAlarm");
  const selectHour = document.createElement("select");
  selectHour.classList.add("newAlarms");
  const selectMinutes = document.createElement("select");
  selectMinutes.classList.add("newAlarms");
  const btn = document.createElement("button");
  btn.classList.add("btnAdd");
  btn.innerText = "ADD";
  for (let i = 1; i <= 24; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = i.toString().padStart(2, "0");
    selectHour.appendChild(option);
  }
  for (let i = 0; i <= 60; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = i.toString().padStart(2, "0");
    selectMinutes.appendChild(option);
  }
  div.append(selectHour, selectMinutes);
  div2.appendChild(btn);
  newAlarm.append(div, div2);
  btn.addEventListener("click", () => {
    const selectedHour = selectHour.value.toString().padStart(2, "0");
    const selectedMinute = selectMinutes.value.toString().padStart(2, "0");
    //  creation of the alarm in the main section
    const divAlarm = document.createElement("div");
    divAlarm.classList.add("alarm");
    const divHour = document.createElement("div");
    divHour.classList.add("hourMargin");
    const h1 = document.createElement("h1"); // alarm h1
    h1.classList.add("white", "noPointer");
    h1.innerText = selectedHour + ":" + selectedMinute;
    alarmsArray.push(h1);
    // div separatorio
    const divSeparate = document.createElement("div");
    divSeparate.classList.add("separate");
    const divSwitch = document.createElement("div");
    divSwitch.classList.add("switch", "pointer");
    const divSwitchChanger = document.createElement("div");
    divSwitchChanger.id = "onOff";
    divSwitchChanger.classList.add("greenSwitch");
    const minus = document.createElement("i");
    minus.classList.add("fas", "fa-minus", "white", "pointer");
    // minus listener
    minus.addEventListener("click", () => {
      divAlarm.classList.add("red");
      divHour.classList.add("hide");
      divSeparate.classList.add("hide");
      const divH3 = document.createElement("div");
      divH3.classList.add("hourMargin");
      const h3 = document.createElement("h3");
      h3.innerText = "DELETE THIS ALARM?";
      h3.classList.add("deleteAlarm");
      const divAnswer = document.createElement("div");
      divAnswer.classList.add("separate");
      const yes = document.createElement("i");
      yes.classList.add("hourMargin");
      yes.classList.add("fas", "fa-check", "pointer");
      const no = document.createElement("i");
      no.classList.add("fas", "fa-times", "pointer");
      no.classList.add("hourMargin");
      divH3.append(h3);
      divAnswer.append(yes, no);
      divAlarm.append(divH3, divAnswer);
      //   listener yes
      yes.addEventListener("click", () => {
        divAlarm.remove();
      });
      //   listener no
      no.addEventListener("click", () => {
        divH3.classList.add("hide");
        divAnswer.classList.add("hide");
        divAlarm.classList.remove("red");
        divHour.classList.remove("hide");
        divSeparate.classList.remove("hide");
      });
    });
    // append
    divSeparate.append(divSwitch, minus);
    divSwitch.appendChild(divSwitchChanger);
    divHour.appendChild(h1);
    divAlarm.append(divHour, divSeparate);
    alarms.appendChild(divAlarm);
    // listener for the alarms creation
    divSwitch.addEventListener("click", (e) => {
      divSwitchChanger.classList.toggle("greenSwitch");
      divSwitchChanger.classList.toggle("greySwitch");
      divSwitchChanger.classList.toggle("switchRight");
      divSwitch.classList.toggle("switchBcg");
      h1.classList.toggle("lightergrey");
      if (e.currentTarget.classList.contains("switchBcg")) {
        alarmsArray.forEach((element) => {
          if (element.classList.contains("lightergrey")) {
            const index = alarmsArray.indexOf(element);
            alarmsArray.splice(index, 1);
          }
        });
      } else {
        alarmsArray.push(h1);
        console.log(alarmsArray);
      }
      console.log(alarmsArray);
    });
    newAlarm.classList.toggle("hideMenu");
  });
};
creationHour();

addBtn.addEventListener("click", () => {
  newAlarm.classList.toggle("hideMenu");
  arrow.classList.toggle("fa-chevron-down");
  arrow.classList.toggle("fa-chevron-up");
});
// random question
function randomQuiz(n) {
  let num = Math.floor(Math.random() * n);
  while (questionsTaken.some((n) => n === num)) {
    num = Math.floor(Math.random() * n);
  }
  questionsTaken.push(num);
  return num;
}
