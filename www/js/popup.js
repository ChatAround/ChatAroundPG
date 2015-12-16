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

    document.getElementById("radius").onchange = function() {
        var newValue = document.getElementById("radius").value;
        if (window.confirm("Save radius?")) {
            document.getElementById("radius").defaultValue = newValue;
            document.getElementById("overlay").style.display = "none";
            document.getElementById("popup").style.display = "none";
        } else {
            document.getElementById("radius").value = document.getElementById("radius").defaultValue;
        }
    }
};