const main = document.getElementsByTagName("MAIN")[0];
const clock = document.querySelector("#clock h1");
const header = document.getElementsByTagName("header")[0];
const h4 = document.querySelectorAll("h4");
const newAlarm = document.querySelector(".newAlarm");
const addBtn = document.getElementById("addAlarmBtn");
const alarms = document.getElementById("alarms");
const arrow = document.getElementById("arrow");
let alarmsArray = [];
let resolved = true;
let triggered = false;
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
  triggered = false;
  main.classList.add("qMain");
  // quiz creation
  const btn = document.createElement("button");
  btn.innerText = "close";
  main.appendChild(btn);
  btn.addEventListener("click", () => {
    header.classList.remove("hide");
    clock.classList.remove("hide");
    main.classList.remove("qMain");
    resolved = true;
    btn.remove();
  });
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
    h1.classList.add("white");
    h1.innerText = selectedHour + ":" + selectedMinute;
    alarmsArray.push(h1);
    // div separatorio
    const divSeparate = document.createElement("div");
    divSeparate.classList.add("separate");
    const divSwitch = document.createElement("div");
    divSwitch.classList.add("switch");
    const divSwitchChanger = document.createElement("div");
    divSwitchChanger.id = "onOff";
    divSwitchChanger.classList.add("greenSwitch");
    const minus = document.createElement("i");
    minus.classList.add("fas", "fa-minus", "white");
    // minus listener
    minus.addEventListener("click", () => {
      divAlarm.classList.add("red");
      divHour.classList.add("hide");
      divSeparate.classList.add("hide");
      const divH3 = document.createElement("div");
      divH3.classList.add("hourMargin");
      const h3 = document.createElement("h3");
      h3.innerText = "DO U WANT TO DELETE THIS ALARM?";
      const divAnswer = document.createElement("div");
      divAnswer.classList.add("separate");
      const yes = document.createElement("i");
      yes.classList.add("hourMargin");
      yes.classList.add("fas", "fa-check");
      const no = document.createElement("i");
      no.classList.add("fas", "fa-times");
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
