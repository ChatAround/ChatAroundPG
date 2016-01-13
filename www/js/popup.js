window.onload = function() {
    var SSRadius = $.cookie('sRadius');
    if (SSRadius == null){
        document.getElementById("radius").value =99;
    }else{
        document.getElementById("radius").value =SSRadius;
    }

    var SSTime = $.cookie('sTime');
    if (SSTime == null){
        document.getElementById("selectedTime").value =1;
    }else{
        document.getElementById("selectedTime").value =SSTime;
    }

    var SSDuration = $.cookie('sDuration');
    if (SSDuration == null){
        document.getElementById("duration").value =0;
    }else{
        document.getElementById("duration").value =SSDuration;
    }
};

document.getElementById("showProfile").onclick = function(){
    window.location.href = "profile.html";
};

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
    var SSRadius = $.cookie('sRadius');
    if (newRadius != 1000 && newRadius != SSRadius ) {
        $.cookie('sRadius', newRadius);
        var SRadius = $.cookie('sRadius');
        document.getElementById("radius").defaultValue = SRadius;
    } else {
        document.getElementById("radius").value = document.getElementById("radius").defaultValue;
    }

};

document.getElementById("selectedTime").onchange = function() {
    var newTime = document.getElementById("selectedTime").value;
    var SSTime = $.cookie('sTime');
    if (newTime != 1000 && newTime != SSTime ) {
        $.cookie('sTime', newTime);
        var STime = $.cookie('sTime');
        document.getElementById("selectedTime").defaultValue = STime;
    } else {
        document.getElementById("selectedTime").value = document.getElementById("selectedTime").defaultValue;
    }
};

document.getElementById("duration").onchange = function() {
    var newDuration = document.getElementById("duration").value;
    var SSDuration = $.cookie('sDuration');
    if (newDuration != 1000 && newDuration != SSDuration ) {
        $.cookie('sDuration', newDuration);
        var SDuration = $.cookie('sDuration');
        document.getElementById("duration").defaultValue = SDuration;
    } else {
        document.getElementById("duration").value = document.getElementById("duration").defaultValue;
    }
};