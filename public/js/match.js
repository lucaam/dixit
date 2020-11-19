var apiv1 = "/api/v1";
var matchApiV1 = apiv1 + "/matches";

var url = location.protocol + "//" + location.host + matchApiV1;

var buttonAddCard = document.getElementById('testAddCards')

buttonAddCard.disabled = true;

let dropdown = document.getElementById('matches-dropdown');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose Match';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;


const request = new XMLHttpRequest();
request.open('GET', url, true);

request.onload = function() {
  if (request.status === 200) {
    const data = JSON.parse(request.responseText);
    let option;
    for (let i = 0; i < data.length; i++) {
      option = document.createElement('option');
      option.text = data[i].name;
      option.value = data[i].name;
      dropdown.add(option);
    }
   } else {
    // Reached the server, but it returned an error
  }   
}

request.onerror = function() {
  console.error('An error occurred fetching the JSON from ' + url);
};

request.setRequestHeader('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmIyNWQ2YWJjNTg5YWE5NDgyM2FkODgiLCJpYXQiOjE2MDU2MDQ1OTd9.yyhEY1blyWkeFQdsGxEi_oknScSVrHIXyima4ske7GI')
request.send();



dropdown.addEventListener('change', function () {


    if((dropdown.options[dropdown.selectedIndex].text).trim() == (defaultOption.text).trim()){
        buttonAddCard.disabled = true

    }else{
        buttonAddCard.disabled = false
    }

})


buttonAddCard.addEventListener("click", function () {
  console.log("Button cliced");
    var matchName = dropdown.options[dropdown.selectedIndex].text;
    console.log(matchName)

    addCards(matchName);
});
