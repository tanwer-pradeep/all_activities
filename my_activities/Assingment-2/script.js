let showing = document.querySelector("#current-city");
let relocation = document.querySelector("#relocation");

showing.addEventListener("change", ()=>{
    console.log(showing.value);
    if(showing.value === "Others"){

        relocation.removeAttribute("hidden");
    }else relocation.setAttribute("hidden", true);
})

