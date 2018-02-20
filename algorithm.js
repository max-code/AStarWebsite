
//file:///F:/Desktop/Code/index.html


var startNode;
var endNode;

var openSet = [];
var closedSet = [];

var path;

function removeFromArr(array,item){
  for(var i=array.length-1;i>=0;i--){
    if(array[i]==item){
      array.splice(i,1)
    }
  }
}

function heuristic(a,b){
  var d = Math.abs(a.i-b.i) + Math.abs(a.j-b.j);
  return d;
}

function drawer(current){
  ctx.clearRect(0,0,1500,750);
  var temp = current
  path = [];
  path.push(temp)
  while(temp.previous!=undefined){
    path.push(temp.previous)
    temp = temp.previous
  }


  for(var i=0;i<path.length;i++){
    var a =path[i].i*25
    var b =path[i].j*25
    ctx.fillStyle="#5041f4"
    ctx.fillRect(b,a,25,25);
  }

  ctx.fillStyle="#61bf44"
  ctx.fillRect(startNode.j*25,startNode.i*25,25,25);
  ctx.fillStyle="#af4646"
  ctx.fillRect(endNode.j*25,endNode.i*25,25,25);

  for(i=0;i<walls.length;i++){
    ctx.fillStyle="#383838"
    ctx.fillRect(walls[i].j*25,walls[i].i*25,25,25);
  }
}

function astar(a){
  var found=false;
  openSet.push(startNode)
  while(openSet.length>0){

    var winner = 0;
    for(var i=0; i<openSet.length;i++){
      if (openSet[i].f < openSet[winner.f]){
        winner=i
      }
    }
    var current=openSet[winner]


    if(current==endNode){
      console.log("Done")
      found=true
      drawer(current);
      break;
    }
    removeFromArr(openSet,current)
    closedSet.push(current)


    var neighbors = current.nb;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && neighbor.type!="wall") {
        var tempG = current.g + heuristic(neighbor, current);

        var newPath = false;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, endNode);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  }

  if(!found){
    ctx.textAlign="center";
    ctx.font="60px Arial";
    ctx.fillText("No Soloutions",c.width/2,c.height/2);
  }

  openSet = [];
  closedSet = [];
  path = undefined;
  startNode=undefined;
  endNode=undefined;

  walls=[];

  for(var i = 0; i<rows; i++){
    for(var j = 0; j<cols; j++){
      board[i][j].previous = undefined;
      board[i][j].f = 0;
      board[i][j].g = 0;
      board[i][j].h = 0;
    }
  }
  //if we get here its over

























}
