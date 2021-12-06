// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    document.getElementById("missionTarget").innerHTML = 
                `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`
}

function validateInput(testInput) {
   if (testInput === "") {
       return "Empty";
   } else if (!isNaN(testInput)) {
       return "Is a Number";
   } else {
       return "Not a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   let allInputsValid = validateInput(document.getElementById("pilotName").value) === "Not a Number" &&
                        validateInput(document.getElementById("copilotName").value) === "Not a Number" &&
                        validateInput(document.getElementById("fuelLevel").value) === "Is a Number" &&
                        validateInput(document.getElementById("cargoMass").value) === "Is a Number";
    return allInputsValid;
}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json");
    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * Object.keys(planets).length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
