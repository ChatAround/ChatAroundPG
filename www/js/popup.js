/**
 * Created by Stratos on 12/14/2015.
 */

window.onload = function() {
    document.getElementById("settingsBtn").onclick = function(){
        var overlay = document.getElementById("overlay");
        var popup = document.getElementById("popup");
        overlay.style.display = "block";
        popup.style.display = "block";
    };

    document.getElementById("closeBtn").onclick = function() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("popup").style.display = "none";
    };

    document.getElementById("radius").onchange = function() {
        var newRadius = document.getElementById("radius").value;
        if (window.confirm("Save radius?")) {
            document.getElementById("radius").defaultValue = newRadius;
        } else {
            document.getElementById("radius").value = document.getElementById("radius").defaultValue;
        }
    };

    document.getElementById("selectedTime").onchange = function() {
        var newTime = document.getElementById("selectedTime").value;
        if (window.confirm("Save time?")) {
            document.getElementById("selectedTime").defaultValue = newTime;
        } else {
            document.getElementById("selectedTime").value = document.getElementById("selectedTime").defaultValue;
        }
    };
};