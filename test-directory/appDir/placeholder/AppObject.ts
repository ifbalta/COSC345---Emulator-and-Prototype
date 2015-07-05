class AppObject{
    function(canvas){
        var ctxt = canvas.getContext("2d");
        ctxt.fillStyle("red");
        ctxt.fillRect(0, 0, 100, 50);
    }
}