export default async function requestSNOMED(input) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Accept-Language", "nl");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://snowstorm.test-nictiz.nl/browser/MAIN%2FSNOMEDCT-NL/descriptions?term="+input+"&groupByConcept=false&searchMode=STANDARD&offset=0&limit=20", requestOptions)
        .then((response) => response.json())
        .then(function(data){
            console.log(data)
            var termsLst = data
        })
        .catch(error => console.log('error', error));
    
}