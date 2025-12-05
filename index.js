function switchTab(tabName) {
    const dashboardView = document.getElementById('dashboard-view')
    const scheduleView = document.getElementById('schedule-view')

    const dashboardBtn = document.querySelector("button[onclick*='dashboard']");
    const scheduleBtn = document.querySelector("button[onclick*='schedule']");
    
    if (tabName == 'dashboard') {
        dashboardView.style.display = 'block'
        scheduleView.style.display = 'none'
        
        scheduleBtn.removeAttribute("id");
        dashboardBtn.setAttribute("id", "start");
    }

    else if (tabName == 'schedule') {
        dashboardView.style.display = 'none'
        scheduleView.style.display = 'block'
        
        dashboardBtn.removeAttribute('id')
        scheduleBtn.setAttribute('id','start')
    }
}
let SaveBtn=document.getElementById("save-btn")
let Subject = document.getElementById("subject-name");
let ClassNum = document.getElementById("class-num");
let TotalClass = document.getElementById("total-class");
let EndDate = document.getElementById("end-date");

function save() {
    localStorage.setItem('Subject_Name', Subject.value)
    localStorage.setItem("Class_Attended", ClassNum.value);
    localStorage.setItem("Total_Class", TotalClass.value);
    localStorage.setItem("End_Date", EndDate.value);    

    if (Number(ClassNum.value) > Number(TotalClass.value)) {
        alert("Total Classes cannot be less than attended classes")
    }
    console.log(Subject.value);
    console.log(ClassNum.value);
    console.log(TotalClass.value);
    console.log(EndDate.value);
}

function add_subject() {
    localStorage.getItem('Subject_Name')
}

function toggle() {
    let blur = document.getElementById('blur')
    blur.classList.toggle('active')

    let PopUp = document.getElementById("popup");
    PopUp.classList.toggle("active");
}