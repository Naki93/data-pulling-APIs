//Create a variable that will target the element with the ID "search-bar"
//.Value is the input that the user inputs in the searchBar
//const searchBar = document.getElementById("search-bar").value;

//Create a function named getCity that has a parameter named input
function getCity(input) {
  console.log(input.value); // input.value returns the code that the user has entered

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a6bd195f13mshcf50735fac79ca9p1a5273jsn33336f897125",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };
  //Programme will fetch data from the following url
  fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${input.value}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response.data["name"]);
      //Create a variable named textDiv that will store an element object representing the element whose id property matches the specified string
      const textDiv = document.getElementById("text1");

      //Create a variable named h2 that creates the HTML element specified by tagName.
      //Which means the output of the name of the city will have an h2 tag
      const h2 = document.createElement("H2");

      //Create a variable named Heading and this will be used to provide text to an element(the name of the city)
      const Heading = document.createTextNode(` ${response.data["name"]}`);
      //Create a variable named p2 that creates the HTML element specified by tagName
      //The data for the population will be stored in a paragraph
      const p2 = document.createElement("P2");
      //Create a variable named Population and this will be used to provide text to an element(the paragraph)
      const Population = document.createTextNode(
        `Population: ${response.data["population"]} ◉`
      );
      //Create a variable named p3 that creates the HTML element specified by tagName
      //The data for the population will be stored in a paragraph
      const p3 = document.createElement("P3");
      ///Create a variable named Elevation and this will be used to provide text (Elevation in meters) to an element
      const Elevation = document.createTextNode(
        `  Elevation: ${response.data["elevationMeters"]} meters`
      );
      //Create a variable named long that will store the longitude of a city
      let long = response.data["longitude"];
      //Create a variable named lat that will store the latitude of a city
      let lat = response.data["latitude"];

      //After creating new elements to the HTML DOM, I then append the elemend node to the existing element
      textDiv.appendChild(h2); //Append the new h2 node into the textDiv
      textDiv.appendChild(p2); //Append the new p2 node into the textDiv
      textDiv.appendChild(p3); //Append the new p2 node into the textDiv
      h2.appendChild(Heading); //Then append the value/ text (city name)into the element
      p2.appendChild(Population); //Append the value/text(population ) into the element
      p3.appendChild(Elevation); //Append the value/text(elevation ) into the element

      //Programme will fetch data from the following url
      fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=96da56891ee44d8ab8c088ceb59120d0&include=minutely`
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(`Current Temperature: ${response.data[0]["temp"]}`);
          //Create a variable named outPutDiv that will target or get the element in the HTML DOM with the ID "output"
          const outPutDiv = document.getElementById("output");
          //Create a variable named h3 and create a new tag. In this case the tagname is h3
          const h3 = document.createElement("H3");
          //Create a variable that will store the value/ text of the Temperature
          const Temperature = document.createTextNode(`Weather:
                     ${response.data[0]["temp"]}°C`);
          //H3 is the child to the parent outPutDiv, therefore h3 will be added to the already existing outPutDiv in the HTML DOM
          outPutDiv.appendChild(h3);
          //The variable temperature is the child to the parent h3 in which the new value will be added into this element
          h3.appendChild(Temperature);
        })
        //Create a new promise that cause the weather to display on screen a minute after the name, population and elevation of city have been uploaded
        .then(() => new Promise((resolve) => setTimeout(resolve, 1000))),
        (error) => {
          console.log(error);
        };
    }) //Catch any errors within the promise
    .catch((err) => console.error(err));
}

//Create a function named refresh that will allow user to refresh page
function refresh() {
  let refreshData = confirm("Do you want to refresh?");
  if (refreshData) {
    setTimeout("location.reload(true);", 1500);
  }
}


    