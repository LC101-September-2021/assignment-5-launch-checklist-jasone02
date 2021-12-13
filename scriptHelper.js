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

function formSubmission(document, list = document.getElementById("faultyItems"),
                         pilot = document.getElementById("pilotName").value,
                         copilot = document.getElementById("copilotName").value,
                         fuelLevel = document.getElementById("fuelLevel").value,
                         cargoLevel = document.getElementById("cargoMass").value) {

    let allInputsValid = validateInput(pilot) === "Not a Number" &&
                        validateInput(copilot) === "Not a Number" &&
                        validateInput(fuelLevel) === "Is a Number" &&
                        validateInput(cargoLevel) === "Is a Number";
    let buttonValues = [pilot, copilot, fuelLevel, cargoLevel];
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
    } else if (!allInputsValid) {
        alert("Invalid input.")
    } else {
        document.getElementById("pilotStatus").textContent = `Pilot ${buttonValues[0]} is ready for launch`;
        document.getElementById("copilotStatus").textContent = `Co-pilot ${buttonValues[1]} is ready for launch`;

        if (buttonValues[2] < 10000) {
            list.style.visibility = "visible";
            document.getElementById("fuelStatus").textContent = `Fuel level too low for launch`;
            document.getElementById("launchStatus").textContent = "Shuttle Not Ready for Launch";
            document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)"; //red
            launchReady = false;
        } else {
            document.getElementById("fuelStatus").textContent = `Fuel level high enough for launch`;
        }

        if (buttonValues[3] > 10000) {
            list.style.visibility = "visible";
            document.getElementById("cargoStatus").textContent = `Cargo mass too heavy for launch`;
            document.getElementById("launchStatus").textContent = "Shuttle Not Ready for Launch";
            document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)"; //red
            launchReady = false;
        } else {
            document.getElementById("cargoStatus").textContent = `Cargo mass low enough for launch`;
        }
        if (launchReady) {
            list.style.visibility = "visible";
            document.getElementById("launchStatus").textContent = "Shuttle is Ready for Launch";
            document.getElementById("launchStatus").style.color = "rgb(65, 159, 106)"; //green
        }
    }
}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json");
    planetsReturned = await planetsReturned.json();
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
