const DOMAIN = "https://adrodex-main.herokuapp.com";

// LOAD JSON FILE
var xmlhttp = new XMLHttpRequest();
var url = DOMAIN + "/api?collection=springboard";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var collectionInfo = JSON.parse(this.responseText);
        console.log(collectionInfo);
        
        updatePage(collectionInfo);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();


// UPDATE PAGE
function updatePage(info) {    
    // UPDATE NEON COLLECTION
    collectionInfo = info[0];
    var neonPackCards = document.getElementsByClassName("scroll-card");

    // Overall Description
    var neonDesc = document.getElementById("neon-desc");
    console.log(neonDesc.childNodes);
    neonDesc.childNodes[1].innerHTML = collectionInfo["subtitle"];
    neonDesc.childNodes[3].innerHTML = collectionInfo["name"];
    neonDesc.childNodes[5].innerHTML = collectionInfo["desc"];
    neonDesc.childNodes[7].href = collectionInfo["galleryLink"];
    
    // Card Content
    var i;
    for (i = 0; i < neonPackCards.length; i++) {
        packInfo = collectionInfo["packs"][i];
        
        cardBottom = neonPackCards[i].childNodes[3];
        console.log(cardBottom)
        
        // Card Bottom
        cardBottom.childNodes[1].innerHTML = packInfo["name"];
        cardBottom.childNodes[3].innerHTML = packInfo["desc"];
        cardBottom.childNodes[5].href = packInfo["checkoutUrl"];
        if (packInfo["priceAUD"] > 0) {
            cardBottom.childNodes[5].innerHTML = "$" + packInfo["priceAUD"] + " AUD";
        }
        else {
            cardBottom.childNodes[5].innerHTML = "Download Free";
        }
        
        // Card Top Image
        neonPackCards[i].childNodes[1].childNodes[1].src = DOMAIN + packInfo["imgUrl"];
    }
}