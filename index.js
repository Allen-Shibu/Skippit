let calEL = document.querySelector(".btn")
const AttnBtn = document.querySelector("#attended")
const totalBtn = document.querySelector("#total")
let resultper = document.querySelector(".result-circle")
const weekBtn=document.querySelectorAll(".week-btn button")


calEL.addEventListener("click", function () {
    let attended = Number(AttnBtn.value);
    let total = Number(totalBtn.value);

    if (total == 0) {
        alert("Total class cannot be zero")
        return
    }
    
    else if(total<attended){
        alert("Total Classes cannot be less than attended classes")
    }

    let result = (attended / total) * 100
    console.log(result);
    
    resultper.textContent = result.toFixed(1) + "%";
    
})

weekBtn.forEach(button => {
    button.addEventListener("click", function () {
        weekBtn.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        
    });
});
