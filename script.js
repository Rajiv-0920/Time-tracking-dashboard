const reportTime = document.querySelectorAll(".report-time");
const reportName = document.querySelectorAll(".report-name");

const currentTime = document.querySelectorAll(".current-time");
const prevTime = document.querySelectorAll(".previous-time");

window.addEventListener("DOMContentLoaded", () => {
  prom().then(report);
});

reportTime.forEach((time) => {
  time.addEventListener("click", (e) => {
    prom().then(report);
    showActiveBtn(e.target);
  });
});

function showActiveBtn(clicked) {
  reportTime.forEach((time) => {
    time.classList.remove("active");
    clicked.classList.add("active");
  });
}

function prom() {
  return new Promise((resolve, reject) => {
    $.get("./data.json", (data) => {
      resolve(data);
    });
  });
}

const selectedTime = {
  daily: "Day",
  weekly: "Week",
  monthly: "Month",
};

function report(allData) {
  // For Reports Title
  allData.forEach((d, index) => {
    reportName[index].innerText = d.title;
  });

  // For Reports Timing
  reportTime.forEach((time) => {
    isActive = time.classList.contains("active");
    if (isActive) {
      resultOf = time.innerText.toLowerCase();
      allData.forEach((data, idx) => {
        currentTime[idx].innerText = `${data.timeframes[resultOf].current}hrs`;
        for (const key in selectedTime) {
          if (key === resultOf) {
            prevTime[
              idx
            ].innerText = `Last ${selectedTime[key]} - ${data.timeframes[resultOf].previous}hrs`;
          }
        }
      });
    }
  });
}
