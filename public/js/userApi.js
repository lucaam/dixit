
function doLogin() {
    const xhr = new XMLHttpRequest()

    var user = {
        "email": "luca.amoriello@hotmail.it",
        "password": "password"
    }

    xhr.addEventListener('readystatechange', function() {
        if (this.readyState === this.DONE) {
            console.log(this.getResponseHeader("auth-token"))
            console.log(JSON.parse(this.response))
            return this.getResponseHeader("auth-token");
        }
    })

    var apiv1 = "/api/v1";
    var userApiV1 = apiv1 + '/users';

    var loginEndpoint = location.protocol + "//" + location.host + userApiV1 + '/login';

    xhr.open('POST', loginEndpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
}