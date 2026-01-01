const clock = document.querySelector("#clock h1");
const header = document.getElementsByTagName("header")[0];
const h4 = document.querySelectorAll("h4");
const newAlarm = document.getElementById("newAlarm");
// clock function
const timeCheck = () => {
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  clock.innerText = hour + ":" + minutes + ":" + seconds;
  requestAnimationFrame(timeCheck);
};
timeCheck();

// section changer with a listener

header.addEventListener("click", (e) => {
  if (e.target.tagName === "H4") {
    h4.forEach((e) => e.classList.remove("sectionSelected"));
    e.target.classList.add("sectionSelected");
    if (e.target.innerText === "ALARMS") clock.classList.add("hide");
    if (e.target.innerText === "CLOCK") clock.classList.remove("hide");
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
};
creationHour();
