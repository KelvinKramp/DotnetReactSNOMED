var n = 0

var test_input = "263244000"
var array_conceptIds
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Accept-Language", "nl");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetchSNOM = (input) => {
  console.log("running")
  if (n < 5) {
    console.log("run number")
    console.log(n)
    n += 1
    console.log("running fetch statement")
    fetch("https://snowstorm.test-nictiz.nl/browser/MAIN%2FSNOMEDCT-NL/concepts/" + input + "/parents?form=inferred&includeDescendantCount=false", requestOptions)
      .then((response) => response.json())
      .then(data => {
        console.log(data)
        // this.state.termsList = data.items
        var new_array = data.map(e => e.conceptId)
        console.log(data.length)
        console.log(new_array)
        var array_conceptIds = array_conceptIds.concat(new_array)
        console.log(array_conceptIds)
      });
    fetchSNOM()
  }
}

fetchSNOM(test_input)
