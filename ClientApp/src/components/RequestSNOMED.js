
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Accept-Language", "nl");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
