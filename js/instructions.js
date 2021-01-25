// VARIABLES
var stepID = 0; 
var platform = "macOS";
var platformID = 0;
const DOMAIN = "https://adrodex-main.herokuapp.com";

var xmlhttp = new XMLHttpRequest();

// GET OS
function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }

// GET INSTRUCTIONS
function getInstruction() {

    // Get Specific Instruction Info
    var url = DOMAIN + "/api?instructions=" + stepID + "&platform=" + platform;

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            // Save Instruction
            var instructions = JSON.parse(this.responseText);
            console.log(instructions);

            var steps = instructions["steps"];
            var activeStepInfo = instructions["activeStep"];

            updatePage(steps, activeStepInfo);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


// UPDATE PAGE
function updatePage(steps, activeStepInfo) {

    // Updated Segmented Control
    var segments = document.getElementsByClassName("segment");
    console.log(segments);


    var i;
    for (i = 0; i < segments.length; i++) {
        segments[i].classList.remove("selected");
    }

    segments[platformID].classList.add("selected");

    // Update Overview
    var stepInfo = document.getElementById("step-info");

    stepInfo.innerHTML = '';

    var i;
    for(i = 0; i < steps.length; i++) {
        var listItem = document.createElement('li');
        listItem.innerHTML = steps[i];

        if (i == stepID) {
            listItem.classList.add("active");
        }

        stepInfo.appendChild(listItem);
    }

    // Update Description
    var stepDesc = document.getElementById("step-desc");
    console.log(stepDesc.children);
    
    stepDesc.children[0].children[0].innerHTML = "Step " + (stepID + 1);
    stepDesc.children[0].children[1].innerHTML = activeStepInfo["title"];

    stepDesc.children[1].innerHTML = '';

    var i;
    for(i = 0; i < activeStepInfo["sub-steps"].length; i++) {

        var listItem = document.createElement('li');
        listItem.innerHTML = activeStepInfo["sub-steps"][i];
        stepDesc.children[1].appendChild(listItem);
    }

    // Update Buttons
    buttonPrev = document.getElementById("button-prev");
    buttonNext = document.getElementById("button-next");

    if (stepID == 0) {
        buttonPrev.classList.add("disabled");
        buttonPrev.setAttribute("onClick", "");
    } else {
        buttonPrev.classList.remove("disabled");
        buttonPrev.setAttribute("onClick", "changeStep(-1)");
    }

    if (stepID == steps.length - 1) {
        buttonNext.classList.add("disabled");
        buttonNext.setAttribute("onClick", "");
    } else {
        buttonNext.classList.remove("disabled");
        buttonNext.setAttribute("onClick", "changeStep(1)");
    }

    // Update Image
    var stepImage = document.getElementById("step-image");
    stepImage.src = DOMAIN + "/api?instructions=" + stepID + "&platform=" + platform + "&image=true";
}


// LOAD PAGE
function loadPage() {

    if (iOS() == false) {
        platform = "macOS";
    } else {
        platform = "iOS";
    }

    getInstruction();
}

// CHANGE STEP 
function changeStep(amount) {
    stepID += amount;
    getInstruction();
}

// CHANGE PLATFORM
function changePlatform(p, id) {
    platform = p;
    platformID = id;
    stepID = 0;

    console.log(platformID, platform, stepID);

    getInstruction();
}