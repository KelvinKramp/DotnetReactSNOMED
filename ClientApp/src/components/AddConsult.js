export default function addConsult(name, birthdate, gender, term, conceptId) {
      console.log("running add consult with following data")
      console.log(name, birthdate, gender, term, conceptId)

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "name": name,
        "birthDate": birthdate,
        "gender": gender,
        "rfe": term,
        "conceptId": parseInt(conceptId)
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