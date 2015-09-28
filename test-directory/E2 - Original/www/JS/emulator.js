/*
 emulator.js - created 7/05/2015
 Base Code for Smartwatch Emulator
 for COSC345 project.

 Authors: [[REDACTED]]
*/

var Emulator = (function(){

    var pub = {};
    var calls = {}; //This is filled with functions passed to app.js
    var map; //This contains the google map used for GPS input
    var marker; //This is the current selected location

    /**
     * BTConnect toggles the UI for the Bluetooth Connection
     * This is called when the "connect/disconnect" button is
     * pressed.
     */
    function BTConnect(){
        if ($("#connect").html() == "Connect"){
            $("#connect").html("Disconnect");
            $("#constatus").html("Connected");
            $("#constatus").css("color", "lightgreen");
        } else {
            $("#connect").html("Connect");
            $("#constatus").html("Disconnected");
            $("#constatus").css("color", "red");
        }
    }

    /**
     * Tests to check whether Bluetooth is currently connected.
     * Function checks against the text in the UI.
     * Returns true if connected else false.
     */
    calls.testBluetooth = function(){
        return $("#constatus").html() == "Connected";
    };

    /**
     * Returns the current coordinates.
     * This is the location of the marker in
     * the google maps window. Can be set from radio buttons,
     * or via manually entering the coords in the input
     * text fields.
     */
    calls.getLocation = function(){
        var coord = {};
        coord.lat = marker.getPosition().lat();
        coord.lon = marker.getPosition().lng();
        return coord;
    };

    /**
     * This function is called when the radio button
     * is changed representing GPS location.
     */
    function changedRadio(){
        if ($("input[type=radio][name=gps]:checked").val() === 'other') {
                //nothing
        } else {
            var coord = {};
            var string = $("input[name=gps]:checked").val();
            var split = string.split(" ");
            coord.lat = parseFloat(split[0]);
            coord.lon = parseFloat(split[1]);
            $('#lat_input').val(coord.lat);
            $('#lng_input').val(coord.lon);
            moveMarker();
        }
    }

    /**
     * This function moves the Google Maps marker if the
     * location is changed from somewhere else
     */
    function moveMarker(){
        marker.setPosition(new google.maps.LatLng($('#lat_input').val(), $('#lng_input').val()));
        map.panTo(new google.maps.LatLng($('#lat_input').val(), $('#lng_input').val()));
    }

    /**
     * This function sets the current location
     * to values manually entered.
     */
    function setcoords(){
        $("#other").prop('checked', true);
        moveMarker();
    }

    /**
     * This is called once a marker has been dropped in a new location.
     */
    function dragMarker(){
        $("#other").prop('checked', true);
        $('#lat_input').val(marker.getPosition().lat());
        $('#lng_input').val(marker.getPosition().lng());
    }

    /**
    * Returns a random variation of the current coordinates.
    * +/- ~60metres
    */
    /* Deprecated: (Just use getLocation)
    calls.getRandomLocation = function(){
        var coord = this.getLocation();
        var sign = Math.random() < 0.5 ? -1 : 1;
        coord.lon += Math.random() * 0.0005 * sign;
        sign = Math.random() < 0.5 ? -1 : 1;
        coord.lat += Math.random() * 0.0005 * sign;
        return coord;
    }
    */

    pub.setup = function(){
        $("#connect").click(BTConnect);
        var stage = new createjs.Stage("canvas");

        //Object to hold sounds. An object is used rather than an array
        //to make referencing the sounds easier later on.
        var sounds = {
            swipe1 : new Audio("sounds/swipe1.wav"),

            swipe2 : new Audio("sounds/swipe2.wav"),

            btnPress : new Audio("sounds/menuSelect.wav"),

            alert : new Audio("sounds/alarm.wav"),

            setHome : new Audio("sounds/menuClick.wav"),

            clearHome : new Audio("sounds/paper_open.wav"),

            btConnect : new Audio("sounds/powerOn.wav"),

            btDisconnect : new Audio("sounds/powerOff.wav")
        };

        //when the radio buttons are changed
        $('input[type=radio][name=gps]').change(changedRadio);
        $('#set').click(setcoords);
        //lets do the map stuff
        var defPos = new google.maps.LatLng(-45.860645, 170.510948); //where we're gonna start
        $('#lat_input').val(-45.860645);
        $('#lng_input').val(170.510948);
        var mapOptions = {
            center: defPos,
            zoom: 10,
            disableDefaultUI: true,
            zoomControl: true
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        marker = new google.maps.Marker({
            position: defPos,
            map: map,
            draggable: true
        });
        google.maps.event.addListener(marker, "dragend", dragMarker);
        $("#home").prop('checked', true);
        console.log("emu initialised");
        //Initiate App
        App.init(calls, stage, sounds);
    };

    return pub;

}());

$(document).ready(Emulator.setup);
