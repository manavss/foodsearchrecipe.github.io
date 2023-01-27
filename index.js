"use strict";
const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "8a510714";
const APP_KEY = "d652b0ebc7e78ec2b4dc5b3d640d7306";
// const baseURL = `https://api.edamam.com/search?q=pizza&app_id=${APP_ID}&app_key=${APP_KEY}`;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=12`;
  const res = await fetch(baseURL);
  const data = await res.json();
  generateHTML(data.hits);
  console.log(data);
}
function generateHTML(results) {
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `<div class="item">
    <img src="${result.recipe.image}" alt="" />
    <div class="flex-container">
      <h1 class="title">${result.recipe.label}</h1>
      <a class="view-button" href="${result.recipe.url}">View Recipe</a>
    </div>
    <p class="item-data">Calories:${Math.round(result.recipe.calories)}</p>
    <p class="item-data">Protein:${Math.round(
      result.recipe.digest[2].total
    )}g</p>

  </div>`;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
