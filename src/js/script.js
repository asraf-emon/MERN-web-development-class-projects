const LOOKUP_API_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
const SEARCH_BY_LETTER_URL =
  "https://www.themealdb.com/api/json/v1/1/search.php?f=";
const SEARCH_BY_NAME_URL =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const cardsContainer = document.getElementById("recipe-cards-container");
const loadingMessage = document.getElementById("loading-message");
const modalBodyContent = document.getElementById("modal-body-content");
const modalTitle = document.getElementById("recipeDetailModalLabel");
const recipeDetailModal = new bootstrap.Modal(
  document.getElementById("recipeDetailModal")
);

const mainTitleElement = document.querySelector(".container > h1");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-icon-box");

const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const progressCircle = document.getElementById("progressCircle");
const percentageText = document.getElementById("scrollPercentage");
const circleCircumference = 2 * Math.PI * 28;

if (progressCircle) {
  progressCircle.style.strokeDasharray = `${circleCircumference} ${circleCircumference}`;
  progressCircle.style.strokeDashoffset = circleCircumference;
}

function updateScrollProgress() {
  if (!scrollToTopBtn || !progressCircle || !percentageText) return;

  const totalHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const currentScroll = document.documentElement.scrollTop;

  let scrollPercentage = (currentScroll / totalHeight) * 100;
  if (isNaN(scrollPercentage)) scrollPercentage = 0;
  const roundedPercentage = Math.round(scrollPercentage);

  if (totalHeight <= 0 || currentScroll < 50) {
    scrollToTopBtn.style.display = "none";
    return;
  }

  scrollToTopBtn.style.display = "block";

  const offset =
    circleCircumference - (scrollPercentage / 100) * circleCircumference;

  progressCircle.style.strokeDashoffset = offset;
  percentageText.textContent = `${roundedPercentage}%`;

  const scrollIcon = scrollToTopBtn.querySelector(".scroll-icon");

  if (roundedPercentage >= 99 && scrollIcon) {
    percentageText.style.display = "none";
    scrollIcon.style.display = "block";
  } else {
    percentageText.style.display = "block";
    if (scrollIcon) scrollIcon.style.display = "none";
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

window.addEventListener("scroll", updateScrollProgress);
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener("click", scrollToTop);
}

async function handleSearch(searchTerm) {
  const trimmedSearchTerm = searchTerm.trim();

  if (trimmedSearchTerm === "") {
    fetchAllRecipes();
    return;
  }

  if (mainTitleElement) mainTitleElement.textContent = "";

  if (loadingMessage) loadingMessage.style.display = "block";
  cardsContainer.innerHTML = "";

  try {
    const response = await fetch(SEARCH_BY_NAME_URL + trimmedSearchTerm);
    const data = await response.json();

    if (loadingMessage) loadingMessage.style.display = "none";

    if (data.meals) {
      renderMealCards(data.meals);
    } else {
      cardsContainer.innerHTML = `<div class="col-12 text-center p-5">
                                  <h2 class="text-danger">No data found</h2>
                                  <p class="text-muted">Sorry, we couldn't find any recipes matching "${trimmedSearchTerm}".</p>
                                  </div>`;
    }
  } catch (error) {
    if (loadingMessage) loadingMessage.style.display = "none";
    console.error("Error fetching search results:", error);
    cardsContainer.innerHTML = `<div class="col-12 text-center p-5">
                                <h2 class="text-danger">Search Failed</h2>
                                <p class="text-muted">An error occurred while fetching data.</p>
                                </div>`;
  }
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
      fetchAllRecipes();
    }
  });

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    handleSearch(searchTerm);
  });

  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      handleSearch(searchTerm);
    }
  });
}

async function fetchAllRecipes() {
  if (mainTitleElement) mainTitleElement.textContent = "Latest Recipes";

  if (loadingMessage) loadingMessage.style.display = "block";
  cardsContainer.innerHTML = "";

  let allMeals = [];
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  for (const letter of alphabet) {
    try {
      const response = await fetch(SEARCH_BY_LETTER_URL + letter);
      const data = await response.json();

      if (data.meals) {
        allMeals.push(...data.meals);
      }
    } catch (error) {
      console.error("Error fetching data for letter", letter, ":", error);
    }
  }

  if (loadingMessage) loadingMessage.style.display = "none";

  const uniqueMeals = Array.from(
    new Map(allMeals.map((meal) => [meal.idMeal, meal])).values()
  );

  console.log(`Successfully loaded ${uniqueMeals.length} recipes.`);

  renderMealCards(uniqueMeals);
}

function renderMealCards(meals) {
  let cardHtml = "";
  meals.forEach((meal) => {
    const description = meal.strInstructions
      ? meal.strInstructions.substring(0, 80) + "..."
      : "No description available.";

    cardHtml += `<div class="col-sm-6 col-md-4 col-lg-3">
                  <div class="card recipe-card h-100">
                  <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                  <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text flex-grow-1">${description}</p>
                  <button class="btn view-details-btn mt-3 text-uppercase" onclick="fetchMealDetails('${meal.idMeal}')">
                  View Details
                  </button>
                  </div>
                  </div>
                  </div>
                  `;
  });
  cardsContainer.innerHTML = cardHtml;
}

async function fetchMealDetails(mealId) {
  modalBodyContent.innerHTML =
    '<div class="text-center py-5">Loading details...</div>';
  recipeDetailModal.show();

  try {
    const response = await fetch(LOOKUP_API_URL + mealId);
    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      const meal = data.meals[0];
      displayMealDetails(meal);
    } else {
      modalBodyContent.innerHTML =
        '<div class="text-center py-5 text-danger">Details not found.</div>';
    }
  } catch (error) {
    console.error("Error fetching meal details:", error);
    modalBodyContent.innerHTML =
      '<div class="text-center py-5 text-danger">Failed to load recipe details.</div>';
  }
}

function displayMealDetails(meal) {
  modalTitle.textContent = meal.strMeal;

  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "" && ingredient.trim() !== null) {
      ingredientsList += `<li>${measure} - ${ingredient}</li>`;
    }
  }

  const detailsHtml = `
                      <div class="row">
                      <div class="col-md-5">
                      <img src="${
                        meal.strMealThumb
                      }" class="img-fluid rounded mb-3" alt="${meal.strMeal}">
                      <p><strong>Category:</strong> ${meal.strCategory}</p>
                      <p><strong>Area:</strong> ${meal.strArea}</p>
                      ${
                        meal.strYoutube
                          ? `<p><a href="${meal.strYoutube}" target="_blank" class="text-danger">Watch on YouTube</a></p>`
                          : ""
                      }
                            </div>
                            <div class="col-md-7">
                            <h6>Ingredients:</h6>
                            <ul class="list-unstyled ingredients-list">${ingredientsList}</ul>
                            <h6 class="mt-3">Instructions:</h6>
                            <p>${meal.strInstructions}</p>
                            </div>
                            </div>
                            `;
  modalBodyContent.innerHTML = detailsHtml;
}

window.onload = fetchAllRecipes;
