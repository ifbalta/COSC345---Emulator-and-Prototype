$(document).ready(function(){
    var canvas = $("#canvas")[0];
    var ctxt = canvas.getContext("2d");
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    var length = 500;
    var framesize = 700;
    var xy = framesize/2;
    var ratio = 1;
    var mid = (width/2) - length;
    var generation = 0;

    $('#input').keyup(function(evt){
        if(evt.keyCode == 13){
            $('.submit').click();
        }});

    $('.submit').on('click', function(){
        var gen = $('#input').val();
        ratio = $('#ratio').val();
        ctxt.clearRect(0,0,framesize,framesize);
        generation = gen;
        
        if (ratio <= 1 || gen == 0){
            genLength();
        }else{
            secondLengthGen(ratio, gen);
        }

        draw(gen,xy,xy,length);
    });
    
    function genLength(){
        var height = 0;
        var width = 0;
        var len = length;
        var frameRatio = 0;
        for(i = 0; i <= generation; i++){
            if(i % 2 == 0){
                width += len;  
            }else{
                height += len;
            }
            len = len*ratio;
        }
        
        if((width+100) > framesize || (height+100) > framesize){
            var ratio1 = framesize/width;
            var ratio2 = framesize/height;
            if(ratio1 <= ratio2){
                frameRatio = ratio1;
            } else {
                frameRatio = ratio1;
            }
            length = length*frameRatio*0.9;
        }
        //console.log("Final Length: " + length);
    }
    
    function secondLengthGen(ratio,gen){
        var newLen = (width*0.7)/Math.pow(ratio,gen);
        length = newLen;
        console.log("Final Length: " + length);
    }

    function draw(gen, x,y, len){
        //console.log("x: " +x);
        //console.log("y: " +y + "gen: " + gen);
        if(gen == 0){
            drawLine(xy-length/2, xy,
                     xy+length/2, xy);
            return;
        } else {
            if(generation%2 == 0){
                var small_l = len * Math.pow(ratio,2);
                var x1 = x - len/2;
                var x2 = x + len/2;

                even(x1,y,small_l);
                even(x2,y,small_l);
                draw(gen-1,x,y,len);
                
                
            } else {
                odd(x,y,len*ratio);
                draw(gen-1,x,y,len);
                
                

            }
        }

        var small_l = len * Math.pow(ratio,2);
        var x1 = (x - len/2);
        var x2 = (x + len/2);
        var y1 = (y - len*ratio/2);
        var y2 = (y + len*ratio/2);
        if(gen % 2 == 1){
            draw(gen-1, x1, y1, small_l);
            draw(gen-1, x1, y2, small_l);
            draw(gen-1, x2, y1, small_l);
            draw(gen-1, x2, y2, small_l);
        }   
            
    }

    function drawLine(x1,y1,x2,y2){
        ctxt.beginPath();
        ctxt.moveTo(x1,y1);
        ctxt.lineTo(x2,y2);
        ctxt.stroke();
    }
    
    function even(x,y,small_l){
        var large_l = small_l/ratio;

        var x1 = x - (small_l/2);
        var x2 = x + (small_l/2);
        var y1 = y - (large_l/2);
        var y2 = y + (large_l/2);

        
        drawLine(x1,y1,x2,y1);
        drawLine(x1,y2,x2,y2);
        drawLine(x,y1,x,y2);
    }
    

    function odd(x,y,small_l){
        var large_l = small_l/ratio;

        var x1 = x - (large_l/2);
        var x2 = x + (large_l/2);
        var y1 = y - (small_l/2);
        var y2 = y + (small_l/2);

        drawLine(x1,y,x2,y);
        drawLine(x1,y1,x1,y2);
        drawLine(x2,y1,x2,y2);
        
    }

                    

    
            
});

    
