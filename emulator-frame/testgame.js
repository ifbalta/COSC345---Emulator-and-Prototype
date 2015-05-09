function appObject(){
  this.startApp = function startApp(){
    console.log("Starting test game");
    setInterval(console.log("starting game"), 100000)
    
  }

  this.stopApp = function stopScript() {
    console.log("stopping game");
    this.init = function(){
      console.log("no more game.");
    }
  }
};

appObject.prototype.printSomething = function() {
  console.log("print hi!");
};

function printer(){
  console.log("hello world");
};

