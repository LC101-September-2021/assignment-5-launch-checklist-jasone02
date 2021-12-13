// Write your JavaScript code here!

window.addEventListener("load", function() {
    document.getElementById("formSubmit").addEventListener("click", function() {
        event.preventDefault();
        formSubmission(document);
      });

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planet = pickPlanet(listedPlanets);
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
   });
});