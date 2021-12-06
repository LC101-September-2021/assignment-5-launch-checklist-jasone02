// Write your JavaScript code here!
//const { validateInput, myFetch, pickPlanet, addDestinationInfo } = require("./scriptHelper");

window.addEventListener("load", function() {
    document.getElementById("formSubmit").addEventListener("click", function() {
        event.preventDefault();
        let buttonValues = [];
        buttonValues.push(document.getElementById("pilotName").value);
        buttonValues.push(document.getElementById("copilotName").value);
        buttonValues.push(document.getElementById("fuelLevel").value);
        buttonValues.push(document.getElementById("cargoMass").value);
        let fieldBlank = false;
        let launchReady = true;
        for (let i = 0; i < buttonValues.length; i++) {
            if (validateInput(buttonValues[i]) === "Empty") {
                fieldBlank = true;
                launchReady = false;
            }
        }
        if (fieldBlank) {
            alert("All fields are required.");
        } else if (!formSubmission(document)) {
            alert("Invalid input.")
        } else {
            document.getElementById("pilotStatus").textContent = `Pilot ${buttonValues[0]} is ready for launch!`;
            document.getElementById("copilotStatus").textContent = `Copilot ${buttonValues[1]} is ready for launch!`;

            if (buttonValues[2] < 10000) {
                document.getElementById("faultyItems").style.visibility = "visible";
                document.getElementById("fuelStatus").textContent = `Fuel level too low for launch`;
                document.getElementById("launchStatus").textContent = "Shuttle not ready for launch";
                document.getElementById("launchStatus").style.color = "red";
                launchReady = false;
            } else {
                document.getElementById("fuelStatus").textContent = `Fuel level high enough for launch`;
            }

            if (buttonValues[3] > 10000) {
                document.getElementById("faultyItems").style.visibility = "visible";
                document.getElementById("cargoStatus").textContent = `Cargo mass too heavy for launch`;
                document.getElementById("launchStatus").textContent = "Shuttle not ready for launch";
                document.getElementById("launchStatus").style.color = "red";
                launchReady = false;
            } else {
                document.getElementById("cargoStatus").textContent = `Cargo mass low enough for launch`;
            }
            if (launchReady) {
                document.getElementById("faultyItems").style.visibility = "visible";
                document.getElementById("launchStatus").textContent = "Shuttle is ready for launch";
                document.getElementById("launchStatus").style.color = "green";
            }
        }
      });

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       let planetPromise = result.json();
       planetPromise.then( function (secondResult) {
           listedPlanets = secondResult;
            // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
            let planet = pickPlanet(listedPlanets);
            addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
        });
   });
});