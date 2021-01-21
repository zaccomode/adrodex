// GET URL PARAMS
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const DOMAIN = "https://adrodex-main.herokuapp.com";

console.log(urlParams.get('sessionid'));

// VERIFY PURCHASE
function loadPage() {
    var xmlhttp = new XMLHttpRequest();
    var url = DOMAIN + "/api?verifypurchase=" + urlParams.get('sessionid');

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var packID = this.responseText;
            console.log(packID);

            // Retrieve Correct Files
            retrieveFiles(packID);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function retrieveFiles(packID) {
    var xmlhttp = new XMLHttpRequest();
    var url = DOMAIN + "/api?retrievefile=" + packID + "&platform=macos";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var packContent = this.response;

            // Update Page
            document.getElementById('downloadButton').href = DOMAIN + "/api?retrievefile=" + packID + "&platform=macos";
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}