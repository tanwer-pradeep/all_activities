let showing = document.querySelector("#current-city");
let relocation = document.querySelector("#relocation");
// console.log(showing);
// showing.addEventListener("click", ()=>{
//     console.log(1)
//     let value = showing.getAttribute("value");
//     console.log(value);

// })
showing.addEventListener("change", ()=>{
    console.log(showing.value);
    if(showing.value === "Others"){

        relocation.removeAttribute("hidden");
    }else relocation.setAttribute("hidden", true);
})

// console.log(relocation);