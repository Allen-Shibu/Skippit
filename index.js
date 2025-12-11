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
}

function toggle() {
  let blur = document.getElementById("blur");
  blur.classList.toggle("active");

  let PopUp = document.getElementById("popup");
  PopUp.classList.toggle("active");
}

function renderSchedule() {
    const grid = document.getElementById('schedule-grid');
    if (!grid) return; 
    
    grid.innerHTML = '';

    // STEP A: Create the Options List from our 'subjects' basket
    const optionsHtml = subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    const placeholder = '<option value="" disabled selected>+ Add Subject</option>';

    // STEP B: Loop through every day and build the column
    daysOfWeek.forEach(day => {
        const daySubjectsIds = schedule[day] || [];
        
        // Build the cards for subjects already added to this day
        let cardsHtml = '';
        daySubjectsIds.forEach((id, index) => {
            const sub = subjects.find(s => s.id === id);
            if (sub) {
                cardsHtml += `
                    <div class="schedule-item">
                        <span>${sub.name}</span>
                        <button class="remove-schedule-btn" onclick="removeFromSchedule('${day}', ${index})">×</button>
                    </div>
                `;
            }
        });

        // STEP C: Inject the Dropdown 
        // Only show dropdown if we actually have subjects to choose from
        const dropdownHtml = subjects.length > 0 ? `
            <div class="schedule-dropdown-container">
                <select class="schedule-dropdown" onchange="addSubjectFromDropdown('${day}', this)">
                    ${placeholder}
                    ${optionsHtml}
                </select>
            </div>
        ` : '<p style="font-size:12px; color:#888; margin-top:10px;">Create subjects first</p>';

        // Add the column to the grid
        grid.innerHTML += `
            <div class="day-column">
                <div class="day-header">${day.substring(0, 3)}</div>
                ${cardsHtml}
                ${dropdownHtml}
            </div>
        `;
    });
}

// ---DROPDOWN HANDLER ---
function addSubjectFromDropdown(day, selectElement) {
    const subjectId = parseInt(selectElement.value);

    if (subjectId) {
        // Add ID to the specific day
        schedule[day].push(subjectId);
        
        // Save new schedule to fridge
        localStorage.setItem('skippit_schedule', JSON.stringify(schedule));
        
        // Re-draw immediately to show the change
        renderSchedule(); 
    }
}

function removeFromSchedule(day, index) {
    schedule[day].splice(index, 1);
    localStorage.setItem('skippit_schedule', JSON.stringify(schedule));
    renderSchedule();
}
