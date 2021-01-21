const DOMAIN = "https://adrodex-main.herokuapp.com";

// GET URL PARAMS
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

console.log(urlParams.get('id'));

// LOAD JSON FILE
function loadPage() {
    var xmlhttp = new XMLHttpRequest();
    var url = DOMAIN + "/api?collection=springboard&packid=" + urlParams.get('id');

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var collectionInfo = JSON.parse(this.responseText);
            console.log(collectionInfo);
            
            updatePage(collectionInfo);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// UPDATE PAGE
function updatePage(info) {    

    // Get Elements
    var sectDesc = document.getElementById("pack-desc");
    var sectImg = document.getElementById("pack-image");
    var sectInfo = document.getElementById("pack-info");
    
    // Update Description
    sectDesc.children[0].innerHTML = info["collection"] + " Collection";
    sectDesc.children[1].innerHTML = info["name"];
    sectDesc.children[2].innerHTML = info["desc"];
    
    // Update Image
    sectImg.children[0].src = DOMAIN + info["checkoutImgUrl"];
    
    // Update Info
    sectInfo.children[1].innerHTML = info["info"];
    console.log(sectInfo.children);
    
    if (info["priceAUD"] > 0) {
        sectInfo.children[5].innerHTML = "$" + info["priceAUD"] + " AUD";
        sectInfo.children[6].style.display = "none";
    }
    else {
        sectInfo.children[5].style.display = "none";
        sectInfo.children[6].innerHTML = "Download Free";
    }

    // Show Correct Page
    document.getElementById('checkoutInvalid').style.display = "none";
    document.getElementById('checkoutValid').style.display = "flex";
}