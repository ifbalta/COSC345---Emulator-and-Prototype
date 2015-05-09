function appObject(){
  this.startApp = function startApp(){
    console.log("Starting test game");
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    ctx.fillStyle = "blue";
    ctx.rect(20,20,150,100);
    ctx.fill();
    setInterval(console.log("starting game"), 100000)
  }

  this.stopScript = function stopScript() {
    console.log("stopping game");
    this.init = function(){
      console.log("no more game.");
    }
  }
};

appObject.prototype.printSomething = function() {
  console.log("print hi!");
};