let pencil = document.querySelector("#pencil");
let pencilOptions = document.querySelector("#pencil-options");
let eraser = document.querySelector("#eraser");
let eraserOptions = document.querySelector("#eraser-options");

let red = document.querySelector(".red");
let blue = document.querySelector(".blue");
let yellow = document.querySelector(".yellow");
let green = document.querySelector(".green");

let pencilSize = document.querySelector("#pencil-size");
let eraserSize = document.querySelector('#eraser-size');

let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");

let lastPencilSize = 13;
let lastEraserSize = 19;

// px
// em
// 1rem = 16px

pencilSize.addEventListener("change" , function(e){
    lastPencilSize = pencilSize.value;
    console.log("heellp")
    ctx.lineWidth = lastPencilSize;
})

eraserSize.addEventListener("change" , function(){
    lastEraserSize = eraserSize.value;
    ctx.lineWidth = lastEraserSize;
})

red.addEventListener("click" ,function(){
    ctx.strokeStyle = "red";
})
blue.addEventListener("click" , function(){
    ctx.strokeStyle = "blue";
})
yellow.addEventListener("click" , function(){
    ctx.strokeStyle = "yellow";
})
green.addEventListener("click" , function(){
    ctx.strokeStyle = "black";
})

pencil.addEventListener("click" , function(){
    if(pencil.classList.contains("active-tool")){
        if(pencil.classList.contains("hide")){
            pencilOptions.classList.remove("hide")
        } else {
            pencilOptions.classList.add("hide");
            pencil.classList.remove("active-tool"); 
        }
    } else {
        ctx.strokeStyle = "black";
        ctx.lineWidth = lastPencilSize;
        if(!eraserOptions.classList.contains("hide")){
            eraserOptions.classList.add("hide");
        }
        pencil.classList.add("active-tool");
        pencilOptions.classList.remove("hide");
        eraser.classList.remove("active-tool")
    }
})

eraser.addEventListener("click", function(){
    if(eraser.classList.contains("active-tool")){
        if(eraserOptions.classList.contains("hide")){
            eraserOptions.classList.remove("hide");
        } else {
            eraserOptions.classList.add("hide");
            eraser.classList.remove("active-tool");
        }
    } else {
        ctx.strokeStyle = "white";
        ctx.lineWidth = lastEraserSize;
        if(!pencilOptions.classList.contains("hide")){
            pencilOptions.classList.add("hide");
        }
        eraser.classList.add("active-tool");
        eraserOptions.classList.remove("hide");
        pencil.classList.remove("active-tool");
    }
})

undo.addEventListener("click" , function(){
    let undoLine = db.pop();
    redoDb.push(undoLine);
    ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    redraw();
})

redo.addEventListener("click" , function(){
    if(redoDb.length){
        let redoLine = redoDb.pop();
        db.push(redoLine);
        for(let i = 0; i< redoLine.length;i++){
            let lineObj = redoLine[i];
            ctx.strokeStyle = lineObj.color;
            ctx.lineWidth = lineObj.width;
            if(lineObj.id=='md'){
                ctx.beginPath();
                ctx.moveTo(lineObj.x , lineObj.y);
            }else {
                ctx.lineTo(lineObj.x , lineObj.y);
                ctx.stroke();
            }
        }
    }
})

function redraw(){
    for(let i=0 ; i<db.length ; i++){
        let line = db[i];
        for(let j=0 ; j<line.length ; j++){
            let lineObj = line[j];
            ctx.strokeStyle = lineObj.color;
            ctx.lineWidth = lineObj.width;
            if(lineObj.id == 'md'){
                ctx.beginPath();
                ctx.moveTo(lineObj.x , lineObj.y);
            }
            else{
                ctx.lineTo(lineObj.x , lineObj.y);
                ctx.stroke();
            console.log(db.length);
            
        }
      }
    }
  }
  
