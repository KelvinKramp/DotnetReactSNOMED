export default function addConsult(name, birthdate, gender, term) {
      console.log("running add consult")
      console.log(name, birthdate, gender, term)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "name": name,
        "birthDate": birthdate,
        "gender": gender,
        "rfe": term
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://localhost:44467/consultationsdb", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}