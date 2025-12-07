let subjects = JSON.parse(localStorage.getItem("skippit_subjects")) || [];
let schedule = JSON.parse(localStorage.getItem("skippit_schedule")) || {
    Monday: [],Tuesday: [],Wednesday: [],Thursday: [],Friday: []
};

function switchTab(tabName) {
  const dashboardView = document.getElementById("dashboard-view");
  const scheduleView = document.getElementById("schedule-view");

  const dashboardBtn = document.querySelector("button[onclick*='dashboard']");
  const scheduleBtn = document.querySelector("button[onclick*='schedule']");

  if (tabName == "dashboard") {
    dashboardView.style.display = "block";
    scheduleView.style.display = "none";

    scheduleBtn.removeAttribute("id");
    dashboardBtn.setAttribute("id", "start");
  } else if (tabName == "schedule") {
    dashboardView.style.display = "none";
    scheduleView.style.display = "block";

    dashboardBtn.removeAttribute("id");
    scheduleBtn.setAttribute("id", "start");
  }
}
let SaveBtn = document.getElementById("save-btn");
let Subject = document.getElementById("subject-name");
let ClassNum = document.getElementById("class-num");
let TotalClass = document.getElementById("total-class");
let EndDate = document.getElementById("end-date");

function save() {
  if (Number(ClassNum.value) > Number(TotalClass.value)) {
    alert("Total Classes cannot be less than attended classes");
  }

  if (Subject.value === "") {
    alert("Please enter a subject name");
  }
    const newSubject = {
        id: Date.now(),
        name: Subject.value,
        attended: Number(ClassNum.value),
        total: Number(TotalClass.value),
    };

    subjects.push(newSubject);

    localStorage.setItem("Subject_Name", JSON.stringify(subjects));

    Subject.value = "";
    ClassNum.value = "";
    TotalClass.value = "";
    toggle();
}

function toggle() {
  let blur = document.getElementById("blur");
  blur.classList.toggle("active");

  let PopUp = document.getElementById("popup");
  PopUp.classList.toggle("active");
}


