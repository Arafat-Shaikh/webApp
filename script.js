const createGrid = document.getElementById("create-grid");
const clearGrid = document.getElementById("clear-grid");
const colorInput = document.getElementById("color-input");
const eraseBtn = document.getElementById("erase-btn");
const paintBtn = document.getElementById("paint-btn");
const widthRange = document.getElementById("width-range");
const heightRange = document.getElementById("height-range");
const heightValue = document.getElementById("height-value");
const widthValue = document.getElementById("width-value");
const container = document.querySelector(".container");

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

createGrid.addEventListener("click",()=>{
    container.innerHTML = ""
    let count = 0;
    for(let i=0; i<heightValue.textContent;i++){
        let div = document.createElement("div");
        div.classList.add("gridRow");
        for(let j=0; j<widthValue.textContent;j++){
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id",`gridCol${count}`)
            col.addEventListener(events[deviceType].down,()=>{
                draw = true;
                if(erase){
                    col.style.backgroundColor = "transparent";
                }
                else{
                    col.style.backgroundColor = colorInput.value;
                }
            })
            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up,()=>{
                draw = false;
                erase = false;
            })
            div.appendChild(col)
        }
        container.appendChild(div)
    }

    function checker(elementId){
        let element = document.querySelectorAll(".gridCol")
        element.forEach((element)=>{
            if(element.id == elementId){
                if(draw && !erase){
                    element.style.backgroundColor = colorInput.value;
                }
                else if(draw && erase){
                    element.style.backgroundColor = "transparent";
                }
            }
        })
    }



})


   



paintBtn.addEventListener("click",()=>{
    draw = true;
    erase = false;
})

eraseBtn.addEventListener("click",()=>{
    erase = true;
    draw = true
})

clearGrid.addEventListener("click",()=>{
    container.innerHTML = ""
})

heightRange.addEventListener("input",()=>{
    heightValue.textContent = heightRange.value
})
widthRange.addEventListener("input",()=>{
    widthValue.textContent = widthRange.value
})




window.onload = ()=>{
    heightRange.value = 1;
    widthRange.value = 1;
    heightValue.textContent = 1;
    widthValue.textContent = 1;
}
