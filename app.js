
var c = document.getElementById('gameCanvas');
var ctx = c.getContext('2d');

var mouseX;
var mouseY;

var mouseDown=false

var type="wall"

var startPoints=0
var endPoints=0


var rows=30
var cols=60

var wallCount = 0
var walls=[];


function Node(i,j){
  this.i=i;
  this.j=j;
  this.type="empty";
  this.f=0;
  this.h=0;
  this.g=0;
  this.start=false;
  this.end=false;

  this.previous = undefined;
  this.show = function(col){
    ctx.fillStyle=col
    ctx.fillRect(j*25,i*25,25,25);
  }

  this.nb = [];

  this.addNb = function(){
    var x = this.j
    var y = this.i
    if(x<cols-1){
      this.nb.push(board[y][x+1])
    }
    if(x>0){
      this.nb.push(board[y][x-1])

    }
    if(y<rows-1){
      this.nb.push(board[y+1][x])
    }
    if(y>0){
      this.nb.push(board[y-1][x])
    }


  }
}


//60x30 grid
/***
0=empty Space
1=Wall
2=Start
3=End
***/


var board = new Array(cols)
for (var i = 0; i < rows; i++) {
  board[i] = new Array(cols);
}


for(var i = 0; i<rows; i++){
  for(var j = 0; j<cols; j++){
    board[i][j]= new Node(i,j);
  }
}

for(var i = 0; i<rows; i++){
  for(var j = 0; j<cols; j++){
    board[i][j].addNb();
  }
}


c.addEventListener("mousemove", checkPos);
c.addEventListener("mouseup", checkClick);
c.addEventListener("mousedown", downHandler);

function downHandler(){
  mouseDown=true
  draw()
}

function updateText(){
  document.getElementById("button2").innerHTML="End Point <span id='red'>("+endPoints+"/1)</span>"
  document.getElementById("button1").innerHTML="Start Point <span id='red'>("+startPoints+"/1)</span>"
  document.getElementById("button3").innerHTML="Wall <span id='red'>(" +wallCount+")</span>"
}


function draw(){
  xDraw = Math.floor(mouseX/25)*25
  yDraw = Math.floor(mouseY/25)*25
  var cType=board[yDraw/25][xDraw/25].type
  if(cType=="start"){
    startPoints-=1
    updateText()
  }else if(cType=="end"){
    endPoints-=1
    updateText()
  }

  if(type=="wall"){
    if(board[yDraw/25][xDraw/25].type!="wall"){
      board[yDraw/25][xDraw/25].type="wall"
      ctx.fillStyle="#383838"
      ctx.fillRect(xDraw,yDraw,25,25);
      wallCount+=1
      walls.push(board[yDraw/25][xDraw/25])
      updateText()
    }

  }else if (type=="start") {
    if(startPoints==0){
      startPoints+=1
      board[yDraw/25][xDraw/25].type="start"
      board[yDraw/25][xDraw/25].start=true;
      startNode=board[yDraw/25][xDraw/25]
      ctx.fillStyle="#61bf44"
      ctx.fillRect(xDraw,yDraw,25,25);

      updateText()
    }

  }else if (type=="end") {
    if(endPoints==0){
      endPoints+=1
      board[yDraw/25][xDraw/25].type="end"
      board[yDraw/25][xDraw/25].end=true;
      endNode=board[yDraw/25][xDraw/25]

      ctx.fillStyle="#af4646"
      ctx.fillRect(xDraw,yDraw,25,25);
      updateText()
    }

  }else if (type=="eraser") {
    if(board[yDraw/25][xDraw/25].type!="empty"){
      if(board[yDraw/25][xDraw/25].type=="wall"){
        wallCount-=1

        removeFromArr(walls,board[yDraw/25][xDraw/25])
        updateText()

      }else if (board[yDraw/25][xDraw/25].type=="end") {
        endPoints-=1
        updateText()

      }else{
        startPoints-=1
        updateText()
      }

      board[yDraw/25][xDraw/25].type="empty"
      ctx.fillStyle="white"
      ctx.fillRect(xDraw,yDraw,25,25);
    }
  }


}

function clearAll(){
  for(i=0;i<59;i++){
    for(j=0;j<29;j++){
      board[j][i].type="empty"
    }
  }
  ctx.clearRect(0, 0, 1500, 750)
  wallCount=0
  endPoints=0
  startPoints=0


  updateText()
}

function checkPos(mouseEvent){
    mouseX = mouseEvent.pageX - this.offsetLeft;
    mouseY = mouseEvent.pageY - this.offsetTop;

  if(mouseEvent.pageX || mouseEvent.pageY == 0){
    mouseX = mouseEvent.pageX - this.offsetLeft;
    mouseY = mouseEvent.pageY - this.offsetTop;
  }else if(mouseEvent.offsetX || mouseEvent.offsetY == 0){
    mouseX = mouseEvent.offsetX;
    mouseY = mouseEvent.offsetY;
  }

  if (mouseDown==true){
    draw()
  }

}

function checkClick(mouseEvent){
  mouseDown=false
}

function typeOfBlock(t){
  type=t
}











































//stay pls
