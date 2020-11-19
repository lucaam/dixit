function addCards(matchName) {
    const xhr = new XMLHttpRequest()


    xhr.addEventListener('readystatechange', function() {
        if (this.readyState === this.DONE) {
            console.log(this.response)
        }
    })

    var apiv1 = "/api/v1";
    var matchApiV1 = apiv1 + '/matches';

    var addCardToMatchEndpoint = location.protocol + "//" + location.host + matchApiV1 + '/set/cards/' + matchName;

    xhr.open('PATCH', addCardToMatchEndpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('auth-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmIyNWQ2YWJjNTg5YWE5NDgyM2FkODgiLCJpYXQiOjE2MDU2MDQ1OTd9.yyhEY1blyWkeFQdsGxEi_oknScSVrHIXyima4ske7GI")
    xhr.send(null);
}

function getMatch(matchName) {
    const xhr = new XMLHttpRequest()


    xhr.addEventListener('readystatechange', function() {
        if (this.readyState === this.DONE) {
    
            console.log(JSON.parse(this.response))
            return JSON.parse(this.response)
        }
    })

    var apiv1 = "/api/v1";
    var matchApiV1 = apiv1 + '/matches/';

    var getMatchEndpoint = location.protocol + "//" + location.host + matchApiV1 + matchName;

    xhr.open('GET', getMatchEndpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('auth-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmIyNWQ2YWJjNTg5YWE5NDgyM2FkODgiLCJpYXQiOjE2MDU2MDQ1OTd9.yyhEY1blyWkeFQdsGxEi_oknScSVrHIXyima4ske7GI")
    xhr.send(null);
}