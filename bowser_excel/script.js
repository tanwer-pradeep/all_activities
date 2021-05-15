let iconcontainer = document.querySelector(".icon_container");
let sheetList = document.querySelector(".sheet_list");
let firstSheet=document.querySelector(".sheet");
firstSheet.addEventListener("click",handelclick);
iconcontainer.addEventListener("click", function(){
    // creat sheet
    let newsheet = document.createElement("div");

    // creat element
    let allsheets = document.querySelectorAll(".sheet");
    let lastsheet = allsheets[allsheets.length - 1];
    let idx = lastsheet.getAttribute("idx");
    newsheet.setAttribute("idx", Number(idx) + 1);
    // text set
    newsheet.innerText = `Sheet ${Number(idx) + 2}`;
    //set class
    newsheet.setAttribute("class", "sheet");
    //append
    sheetList.appendChild(newsheet);

    // check all sheets for active sheet
    allsheets = document.querySelectorAll(".sheet");
    setLastActive(allsheets);
    newsheet.addEventListener("click", handelclick);
});



function setLastActive(allsheets){
    for(let i = 0; i < allsheets.length; i++){
        allsheets[i].classList.remove("active");
    }
    allsheets[allsheets.length - 1].classList.add("active");
}

function handelclick(e){
    let sheet = e.currentTarget;
    let allsheets = document.querySelectorAll(".sheet");
    for(let i = 0; i <allsheets.length; i++){
        allsheets[i].classList.remove("active");
    }
    sheet.classList.add("active");
}