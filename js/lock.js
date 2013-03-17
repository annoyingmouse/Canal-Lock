/*
    Variables
 */

var speed = 1;
var boatFill = {    "fill":     "#32369b",  "stroke":       "none"};
var leftFill = {    "fill":     "#6faede",  "stroke":       "none"};
var rightFill = {   "fill":     "#329a9b",  "stroke":       "none"};
var waterFill = {   "fill":     "#cccccc",  "stroke":       "none"};
var fillClear = {   "cursor":   "pointer",  "fill":         "#ff0000",  "stroke":           "none", "fill-opacity": "0"};
var fillCover = {   "fill":     "#ffffff",  "stroke":       "none",     "fill-opacity":     "0.5"};
var blackLine = {   "stroke":   "#000000",  "stroke-width": "5px",      "stroke-linecap":   "round"};
var whiteLine = {   "stroke":   "#ffffff",  "stroke-width": "5px",      "stroke-linecap":   "round"};

/*
    Main function
 */

Raphael.fn.drawLock = function () {
    var paper = this;
    paper.rect(0, 140, 220, 220).attr(waterFill);
    var water = paper.rect(220, 140, 220, 220).attr(waterFill).node.setAttribute("id","water");
    paper.rect(440, 200, 220, 160).attr(waterFill);
    var boat = paper.path("M 30,130 l 20,0 l 0,-20 l 110,0 l 0,20 l 20,0 l -10,10 l -130,00").attr(boatFill).data('position', 1).node.setAttribute("id","boat");
    var leftSluice = paper.rect(210, 130, 20, 190).attr(leftFill).node.setAttribute("id","leftSluice");
    var rightSluice = paper.rect(430, 130, 20, 190).attr(rightFill).node.setAttribute("id","rightSluice");
    paper.rect(210, 320, 20, 40).attr(leftFill);
    paper.rect(430, 320, 20, 40).attr(rightFill);
    var leftGate = paper.rect(220, 135, 0, 225).attr(leftFill).node.setAttribute("id","leftGate");
    var rightGate = paper.rect(440, 135, 0, 225).attr(rightFill).node.setAttribute("id","rightGate");
    // LEFT 5
    var controls = paper.set();
    controls.push(createControl(paper, "left5", 730, 300, leftFill, blackLine, "down", fillClear, fillCover));
    controls.push(createControl(paper, "right5", 840, 300, rightFill, blackLine, "down", fillClear, fillCover));
    controls.push(createControl(paper, "left4", 730, 230, leftFill, blackLine, "up", fillClear, fillCover));
    controls.push(createControl(paper, "right4", 840, 230, rightFill, blackLine, "up", fillClear, fillCover));
    controls.push(createControl(paper, "left3", 730, 160, leftFill, blackLine, "left", fillClear, fillCover));
    controls.push(createControl(paper, "right3", 840, 160, rightFill, blackLine, "left", fillClear, fillCover));
    controls.push(createControl(paper, "left2", 730, 90, leftFill, blackLine, "right", fillClear, fillCover));
    controls.push(createControl(paper, "right2", 840, 90, rightFill, blackLine, "right", fillClear, fillCover));
    controls.push(createControl(paper, "left1", 730, 20, boatFill, whiteLine, "left", fillClear, fillCover));
    controls.push(createControl(paper, "right1", 840, 20, boatFill, whiteLine, "right", fillClear, fillCover));

    /*
        Controls
     */
    $("#left1").on("click", function(){
        hideControls(["left1","right1","left2","right2","left3","right3","left4","right4","left5","right5"]);
        var boatPosition = getBoatXY();
        switch(boatPosition[0]){
            case 470:
                moveBoatLeft(250);
                break;
            case 250:
                moveBoatLeft(30);
                break;
        }
    });
    $("#right1").on("click", function(){
        hideControls(["left1","right1","left2","right2","left3","right3","left4","right4","left5","right5"]);
        var boatPosition = getBoatXY();
        switch(boatPosition[0]){
            case 30:
                moveBoatRight(250);
                break;
            case 250:
                moveBoatRight(470);
                break;
        }
    });
    $("#left2").on("click", function(){
        hideControls(["left1","right1","left2","right2","left3","right3","left4","right4","left5","right5"]);
        openGate("left");
    });
    $("#left3").on("click", function(){
        hideControls(["left1","right1","left2","right2","left3","right3","left4","right4","left5","right5"]);
        closeGate("left");
    });
    $("#right2").on("click", function(){
        hideControls(["left1","right1","left2","right2","left3","right3","left4","right4","left5","right5"]);
        openGate("right");
    });
    $("#right3").on("click", function(){
        hideControls(["left1","right1","left2","right2","left3","right3","left4","right4","left5","right5"]);
        closeGate("right");
    });
    $("#left4").on("click", function(){
        hideControls(["left1","right1","left2","right2","left3","right3","left4","right4","left5","right5"]);
        openSluice("left");
        if(parseInt($("#water").attr("height")) !== 220){
            raiseWater();
        }
        var boatPosition = getBoatXY();
        if(boatPosition[0] == 250 && boatPosition[1] == 190){
            raiseBoat();
        }
    });
    $("#left5").on("click", function(){
        hideControls(["left1","right1","left2","right2","left3","right3","left4","right4","left5","right5"]);
        closeSluice("left");
    });
    $("#right4").on("click", function(){
        hideControls(["left1","right1","left2","right2","left3","right3","left4","right4","left5","right5"]);
        openSluice("right");
        if(parseInt($("#water").attr("height")) !== 160){
            lowerWater();
        }
        var boatPosition = getBoatXY();
        if(boatPosition[0] == 250 && boatPosition[1] == 130){
            lowerBoat();
        }
    });
    $("#right5").on("click", function(){
        hideControls(["left1","right1","left2","right2","left3","right3","left4","right4","left5","right5"]);
        closeSluice("right");
    });
    checkState();
};

/*
    Support functions
 */

function createControl(paper, name, left, top, fill, line, direction, clear, fillCover){
    var control = paper.set();
    control.push(paper.rect(left, top, 60, 60).attr(fill));
    switch (direction){
        case "down":
            control.push(paper.path("M "+(left+30)+","+(top+10)+" l 0,40").attr(line));
            control.push(paper.path("M "+(left+10)+","+(top+30)+" l 20,20 l 20,-20").attr(line));
            break;
        case "up":
            control.push(paper.path("M "+(left+30)+","+(top+10)+" l 0,40").attr(line));
            control.push(paper.path("M "+(left+10)+","+(top+30)+" l 20,-20 l 20,20").attr(line));
            break;
        case "left":
            control.push(paper.path("M "+(left+10)+","+(top+30)+" l 40,0").attr(line));
            control.push(paper.path("M "+(left+30)+","+(top+10)+" l -20,20 l 20,20").attr(line));
            break;
        case "right":
            control.push(paper.path("M "+(left+10)+","+(top+30)+" l 40,0").attr(line));
            control.push(paper.path("M "+(left+30)+","+(top+10)+" l 20,20 l -20,20").attr(line));
            break;
        default:
            break;
    }
    control.push(paper.rect(left, top, 60, 60).attr(clear).node.setAttribute("id",name));
    control.push(paper.rect(left, top, 60, 60).attr(fillCover).node.setAttribute("id", name + "Cover"));
    return control;
}
function checkState(){
    var water = getWaterHeightAndY();
    var leftGateWidth = getGateWidth("left");
    var rightGateWidth = getGateWidth("right");
    var leftSluiceHeight = getSluiceHeight("left");
    var rightSluiceHeight = getSluiceHeight("right");
    var boatPosition = getBoatXY();
    // Take each Control one at a time:
    // left1   : Move boat left
    if(water[0] == 220 && leftGateWidth == 60 && rightGateWidth == 0 && leftSluiceHeight == 190 && rightSluiceHeight == 190 && boatPosition[0] == 250){
        showControls(["left1","left3"]);
    }
    if(water[0] == 160 && leftGateWidth == 0 && rightGateWidth == 60 && leftSluiceHeight == 190 && rightSluiceHeight == 190 && boatPosition[0] == 470){
        showControls(["left1","right3"]);
    }
    // right1  : Move boat right
    if(water[0] == 220 && leftGateWidth == 60 && rightGateWidth == 0 && leftSluiceHeight == 190 && rightSluiceHeight == 190 && boatPosition[0] == 30){
        showControls(["right1","left3"]);
    }
    if(water[0] == 160 && leftGateWidth == 0 && rightGateWidth == 60 && leftSluiceHeight == 190 && rightSluiceHeight == 190 && boatPosition[0] == 250){
        showControls(["right1","right3"]);
    }
    // left2   : Open left gate
    if(water[0] == 220 && leftGateWidth == 0 && rightGateWidth == 0 && leftSluiceHeight == 190 && rightSluiceHeight == 190 && boatPosition[0] == 30){
        showControls(["left2","right4"]);
    }
    if(water[0] == 220 && leftGateWidth == 0 && rightGateWidth == 0 && leftSluiceHeight == 190 && rightSluiceHeight == 190 && boatPosition[0] == 250){
        showControls(["left2","right4"]);
    }
    if(water[0] == 220 && leftGateWidth == 0 && rightGateWidth == 0 && leftSluiceHeight == 190 && rightSluiceHeight == 190 && boatPosition[0] == 470){
        showControls(["left2","right4"]);
    }
    // right2  : Open right gate
    if(water[0] == 160 && leftGateWidth == 0 && rightGateWidth == 0 && leftSluiceHeight == 190 && rightSluiceHeight == 190 && boatPosition[0] == 30){
        showControls(["right2","left4"]);
    }
    if(water[0] == 160 && leftGateWidth == 0 && rightGateWidth == 0 && leftSluiceHeight == 190 && rightSluiceHeight == 190 && boatPosition[0] == 250){
        showControls(["right2","left4"]);
    }
    if(water[0] == 160 && leftGateWidth == 0 && rightGateWidth == 0 && leftSluiceHeight == 190 && rightSluiceHeight == 190 && boatPosition[0] == 470){
        showControls(["right2","left4"]);
    }
    // left3   : Close left gate
    if(water[0] == 220 && leftGateWidth == 60 && rightGateWidth == 0 && leftSluiceHeight == 190 && rightSluiceHeight == 190 && boatPosition[0] == 470){
        showControls(["left3"]);
    }
    // right3  : Close right gate
    if(water[0] == 160 && leftGateWidth == 0 && rightGateWidth == 60 && leftSluiceHeight == 190 && rightSluiceHeight == 190 && boatPosition[0] == 30){
        showControls(["right3"]);
    }
    // left5   : Close left sluice
    if(water[0] == 220 && leftGateWidth == 0 && rightGateWidth == 0 && leftSluiceHeight == 160 && rightSluiceHeight == 190){
        showControls(["left5"]);
    }
    // right5   : Close right sluice
    if(water[0] == 160 && leftGateWidth == 0 && rightGateWidth == 0 && leftSluiceHeight == 190 && rightSluiceHeight == 160){
        showControls(["right5"]);
    }
}
function moveBoatLeft(from){
    var $boat = $("#boat");
    var start = getBoatXY();
    if(start[0] > from){
        var returnString = "";
        var nodes = $boat.attr("d").split(/[ML]/);
        $.each(nodes, function(k,v){
            if(!empty(v)){
                var bits = v.split(",");
                var x = parseInt(bits[0]);
                var y = parseInt(bits[1]);
                if(empty(returnString)){
                    returnString = "M"+(x-1)+","+y;
                }else{
                    returnString += "L"+(x-1)+","+y;
                }
            }
        });
        $boat.attr("d", returnString);
        setTimeout("moveBoatLeft("+from+")", speed);
    }else{
        checkState();
    }
}
function moveBoatRight(from){
    var $boat = $("#boat");
    var start = getBoatXY();
    if(start[0] < from ){
        var returnString = "";
        var nodes = $boat.attr("d").split(/[ML]/);
        $.each(nodes, function(k,v){
            if(!empty(v)){
                var bits = v.split(",");
                var x = parseInt(bits[0]);
                var y = parseInt(bits[1]);
                if(empty(returnString)){
                    returnString = "M"+(x+1)+","+y;
                }else{
                    returnString += "L"+(x+1)+","+y;
                }
            }
        });
        $boat.attr("d", returnString);
        setTimeout("moveBoatRight("+from+")", speed);
    }else{
        checkState();
    }
}
function lowerBoat(){
    var $boat = $("#boat");
    var start = getBoatXY();
    if(start[1] < 190 ){
        var returnString = "";
        var nodes = $boat.attr("d").split(/[ML]/);
        $.each(nodes, function(k,v){
            if(!empty(v)){
                var bits = v.split(",");
                var x = parseInt(bits[0]);
                var y = parseInt(bits[1]);
                if(empty(returnString)){
                    returnString = "M"+x+","+(y+1);
                }else{
                    returnString += "L"+x+","+(y+1);
                }
            }
        });
        $boat.attr("d", returnString);
        setTimeout("lowerBoat()", speed);
    }
}
function raiseBoat(){
    var $boat = $("#boat");
    var start = getBoatXY();
    if(start[1] > 130 ){
        var returnString = "";
        var nodes = $boat.attr("d").split(/[ML]/);
        $.each(nodes, function(k,v){
            if(!empty(v)){
                var bits = v.split(",");
                var x = parseInt(bits[0]);
                var y = parseInt(bits[1]);
                if(empty(returnString)){
                    returnString = "M"+x+","+(y-1);
                }else{
                    returnString += "L"+x+","+(y-1);
                }
            }
        });
        $boat.attr("d", returnString);
        setTimeout("raiseBoat()", speed);
    }
}
function getBoatXY(){
    var nodes = $("#boat").attr("d").split(/[ML]/);
    var startX = "";
    var startY = "";
    $.each(nodes, function(k,v){
        if(!empty(v) && empty(startX)){
            var bits = v.split(",");
            startX = parseInt(bits[0]);
            startY = parseInt(bits[1]);
        }
    });
    return [startX,startY];
}
function getWaterHeightAndY(){
    var $water = $("#water");
    var y = parseInt($water.attr("height"));
    var h = parseInt($water.attr("y"));
    return [y, h];

}
function raiseWater(){
    var $water = getWaterHeightAndY();
    if($water[0] < 220){
        $water[0]++;
        $water[1]--;
        $("#water").attr({"height": $water[0], "y": $water[1]});
        setTimeout("raiseWater()", speed);
    }else{
        checkState();
    }
}
function lowerWater(){
    var $water = getWaterHeightAndY();
    if($water[0] > 160){
        $water[0]--;
        $water[1]++;
        $("#water").attr({"height": $water[0], "y": $water[1]});
        setTimeout("lowerWater()", speed);
    }else{
        checkState();
    }
}
function openSluice(dir){
    var y = getSluiceHeight(dir);
    if ( y > 160 ) {
        y--;
        $("#"+dir+"Sluice").attr({"height": y});
        setTimeout("openSluice(\""+dir+"\")", speed);
    }
}
function closeSluice(dir){
    var y = getSluiceHeight(dir);
    if ( y < 190 ) {
        y++;
        $("#"+dir+"Sluice").attr({"height": y});
        setTimeout("closeSluice(\""+dir+"\")", speed);
    }else{
        checkState();
    }
}
function getSluiceHeight(dir){
    return parseInt($("#"+dir+"Sluice").attr("height"));
}
function openGate(dir){
    var x = getGateWidth(dir);
    if ( x < 60 ) {
        x++;
        $("#"+dir+"Gate").attr({"width": x});
        setTimeout("openGate(\""+dir+"\")", speed);
    }else{
        checkState();
    }
}
function closeGate(dir){
    var x = getGateWidth(dir);
    if ( x > 0 ) {
        x--;
        $("#"+dir+"Gate").attr({"width": x});
        setTimeout("closeGate(\""+dir+"\")", speed);
    }else{
        checkState();
    }
}
function getGateWidth(dir){
    return parseInt($("#"+dir+"Gate").attr("width"));
}
function showControls(controls){
    $.each(controls, function(k, v){
        $("#"+v+"Cover").hide();
    });
}
function hideControls(controls){
    $.each(controls, function(k, v){
        $("#"+v+"Cover").show();
    });
}
function empty(data) {
    if (typeof (data) == 'number' || typeof (data) == 'boolean') {
        return false;
    }
    if (typeof (data) == 'undefined' || data === null) {
        return true;
    }
    if (typeof (data.length) != 'undefined') {
        return data.length == 0;
    }
    var count = 0;
    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            count++;
        }
    }
    return count == 0;
}