/*
 tori.js - created 6/05/2015
 Easter Egg for Smartwatch Emulator
 for COSC345 project.

 Authors: [[REDACTED]]
*/

var Tori = (function(){

    var pub = {};

    function BetterDesign(){
        $("html").css("background-color", "#FF91CA");
        $("section").css("background-color", "#91FFC6");
        $("#centre").css("background", "none");
        $("#watch").css("background-color", "#FFEE00");
        $(".watchstrap").css("background-color", "#AA69FF")
    }

    pub.setup = function(){
        $(".EE").click(BetterDesign);
        $("#red").click(function(){
            $("#watch").css("background-color", $("#red").css("background-color"));
        });
        $("#orange").click(function(){
            $("#watch").css("background-color", $("#orange").css("background-color"));
        });
        $("#green").click(function(){
            $("#watch").css("background-color", $("#green").css("background-color"));
        });
        $("#blue").click(function(){
            $("#watch").css("background-color", $("#blue").css("background-color"));
        });
    };

    return pub;

}());

$(document).ready(Tori.setup);
