/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");


// create a function that adds all data from the games array to the page

function addGamesToPage(games) {
    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // create a new div element, which will become the game card
        // add the class game-card to the list

        const newDiv = document.createElement("div");
        newDiv.classList.add("game-card");
        //newDiv = document.getElementsByClassName("game-card");
        newDiv.innerHTML = `<div><img class="game-img" src="${games[i].img}"/></div><div> <p>${games[i].name} </p><p>description: ${games[i].description}</p> </div>`;
        gamesContainer.appendChild(newDiv);
        
    }
    
} 

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (acc, games) => {
    return acc + games.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString('en-US')}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const amountRaised = GAMES_JSON.reduce( (acc, games) => {
    return acc + games.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `${amountRaised.toLocaleString('en-US')}`


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = (GAMES_JSON.length).toLocaleString('en-US');


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unFunded = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unFunded);

}
filterUnfundedOnly();


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });
    

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);

}
filterFundedOnly();

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}
showAllGames();

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

let unFundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
});
let numUnFundedGames = unFundedGames.length;

// create a string that explains the number of unfunded games using the ternary operator

let result = `We have raised a total of $${amountRaised.toLocaleString('en-US')} for ${GAMES_JSON.length} games. However, ${numUnFundedGames > 0 ? 
    numUnFundedGames + " games remain unfunded." : "All games have been funded."}`;

// create a new DOM element containing the template string and append it to the description container
const newDescriptionDiv = document.createElement("div");
newDescriptionDiv.classList.add("description-card");
newDescriptionDiv.innerHTML = `<p>${result}</p>`;
descriptionContainer.appendChild(newDescriptionDiv);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first, second, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
let newTopDiv = document.createElement("div");
newTopDiv.classList.add("firstGame-card");
newTopDiv.innerHTML = `<p>The highest funded game is ${first.name}</p>`;
firstGameContainer.appendChild(newTopDiv);

// do the same for the runner up item
let runnerUpDiv = document.createElement("div");
runnerUpDiv.classList.add("runnerUp-card");
runnerUpDiv.innerHTML = `<p>The second highest funded game is ${second.name}</p>`;
secondGameContainer.appendChild(runnerUpDiv);