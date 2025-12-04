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