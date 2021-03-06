


let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let { top: canvasTop } = canvas.getBoundingClientRect();
// console.log(canvasTop)
canvas.height = window.innerHeight - canvasTop;
canvas.width = window.innerWidth;
window.addEventListener("resize" , function(){
    canvas.height = window.innerHeight - canvasTop;
    canvas.width = window.innerWidth;
    //resize ke baad dobata draw hoske
    redraw();
})

let db = [];
let redoDb = [];

ctx.lineCap = "round";

// ctx.beginPath();
// ctx.moveTo(30  , 233);
// ctx.lineTo(111 , 200);
// ctx.stroke();

let line=[];
let isMouseDown = false;
canvas.addEventListener("mousedown" , function(e){
    isMouseDown = true;
    let x = e.clientX;
    let y = e.clientY - canvasTop;
    // console.log(x , y)
    ctx.beginPath();
    ctx.moveTo(x , y);
    let pointObj = {
        id:"md" , 
        x: x , 
        y: y , 
        width:ctx.lineWidth , 
        color:ctx.strokeStyle ,
    };
    line.push(pointObj);
    
    socket.emit("mousedown" , pointObj);

})

canvas.addEventListener("mousemove" , function(e){
    if(isMouseDown){
        let x =e.clientX;
        let y = e.clientY - canvasTop;
        ctx.lineTo(x,y);
        ctx.stroke();
        let pointObj = {
            id:"mv" , 
            x: x , 
            y: y , 
            width:ctx.lineWidth , 
            color:ctx.strokeStyle ,
        };
        line.push(pointObj);
        socket.emit("mousemove" ,pointObj);
    }
})

canvas.addEventListener("mouseup" , function(e){
    isMouseDown = false;
    db.push(line);
    line=[];
    // console.log(db);
    
})