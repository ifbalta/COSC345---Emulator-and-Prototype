function appObject(){

  function startApp(){
    console.log("Starting test game");
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.rect(20,20,150,100);
    ctx.fill();
    //setInterval(console.log("starting game"), 100000)
  }

  this.startApp = function startApp(){
    console.log("Starting test game");
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.rect(20,20,150,100);
    ctx.fill();
    //setInterval(console.log("starting game"), 100000)
  }

  this.stopScript = function stopScript() {
    clearScreen();
    console.log("stopping game");
  }

  this.clearScreen = function clearScreen(){
    var screen = $("#canvas")[0];
    var context = screen.getContext("2d");
    console.log("Clearing test prototype screen.");
    context.clearRect(0,0,$("#canvas").width(), $("#canvas").height())
  }
  //this.stopScript = stopScript();
  //
  //this.clearScreen = clearScreen();
}