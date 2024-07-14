// === Variables ===
let rowData = document.querySelector("#rowData");
let searchContainer = document.querySelector("#searchContainer");
let contacts = document.querySelector(".contacts");
let detailsContainer = document.querySelector("#detailsContainer");

// === Loading Events ===
$(window).on("load", function () {
  setTimeout(function () {
    $("#loading").fadeOut();
    searchByName("");
  }, 500);
});

$(window).on("load", function () {
  setTimeout(function () {
    $("#welcomeSection").fadeOut(500, function () {
      fetchAndDisplayMeals();
    });
  }, 2000);
});

// === Nav Collapse & Arrow Change ===
$(() => {
  const nav = $("nav");
  const arrow = $(".arrow img");
  const navItems = $("nav .nav-content li");

  if (nav.hasClass("collapsed")) {
    arrow.attr("src", "src/images/icons/Arrow-Nav-Right.svg");
    $("nav .arrow").addClass("right-[-40px]");
    nav.css({ left: "-250px" }); // Ensure the nav is positioned correctly
    navItems.hide();
  } else {
    arrow.attr("src", "src/images/icons/Arrow-Nav-Left.svg");
    $("nav .arrow").addClass("right-[-20px]");
  }

  $(".arrow img").on("click", function () {
    const isCollapsed = nav.hasClass("collapsed");

    if (isCollapsed) {
      navItems.slideDown(700);
      nav.animate({ left: "0" }, 500, function () {
        arrow.attr("src", "src/images/icons/Arrow-Nav-Left.svg");
        $("nav .arrow").removeClass("right-[-40px]").addClass("right-[-20px]");
      });
    } else {
      navItems.slideUp(500);
      nav.animate({ left: "-250px" }, 500, function () {
        arrow.attr("src", "src/images/icons/Arrow-Nav-Right.svg");
        $("nav .arrow").removeClass("right-[-20px]").addClass("right-[-40px]");
      });
    }

    nav.toggleClass("collapsed");
  });
});

// === Search Functionality ===
document.getElementById("nav-search").addEventListener("click", () => {
  searchContainer.innerHTML = `
    <div class="fixed top-0 left-0 right-0 bg-white z-10 flex justify-center items-center gap-4 p-4 shadow-md">
      <input id="searchByName" type="text" placeholder="Search by meal name" class="input input-bordered w-full max-w-xs" />
      <input id="searchByFirstLetter" type="text" placeholder="Search by first letter" maxlength="1" class="input input-bordered w-full max-w-xs" />
    </div>
  `;

  document.getElementById("searchByName").addEventListener("input", (e) => {
    showLoading();
    searchByName(e.target.value).then(() => {
      hideLoading();
    });
  });

  document
    .getElementById("searchByFirstLetter")
    .addEventListener("input", (e) => {
      showLoading();
      searchByFirstLetter(e.target.value).then(() => {
        hideLoading();
      });
    });
});

// === Navigation Click Events ===
// === Nav Categories ===
document.getElementById("nav-categories").addEventListener("click", () => {
  showLoading();
  getCategories().then(() => {
    hideLoading();
    showRowData();
  });
});

// === Nav Area ===
document.getElementById("nav-area").addEventListener("click", () => {
  showLoading();
  getArea().then(() => {
    hideLoading();
    showRowData();
  });
});

// === Nav Ingredients ===
document.getElementById("nav-ingredients").addEventListener("click", () => {
  showLoading();
  getIngredients().then(() => {
    hideLoading();
    showRowData();
  });
});

// === Nav Contact ===
document.getElementById("nav-contact").addEventListener("click", () => {
  showLoading();
  showContactUs();
  hideLoading();
  showRowData();
});

function showLoading() {
  $(".inner-loading").fadeIn(300);
}

function hideLoading() {
  $(".inner-loading").fadeOut(300);
}

function showRowData() {
  rowData.classList.remove("hidden");
  detailsContainer.innerHTML = "";
}

// Fetching and Displaying Meals
async function fetchAndDisplayMeals() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let data = await response.json();
  displayMeals(data.meals);
}

// === Display Meals ===
function displayMeals(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="card bg-base-100 shadow-xl w-full sm:w-80 md:w-60 lg:w-80 min-[1520px]:w-[100%] rounded-lg">
    <figure class="relative overflow-hidden rounded-lg h-64">
      <img
        src="${arr[i].strMealThumb}"
        alt=""
        class="w-full h-full object-cover rounded-lg"
      />
      <div
        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-lg"
      >
        <div
          class="text-center text-white flex flex-col gap-2 justify-center items-center p-5"
        >
          <h2 class="card-title">${arr[i].strMeal}</h2>
          <div class="card-actions justify-center">
            <button onclick="getMealDetails(${arr[i].idMeal})" class="btn btn-primary text-white">
              Show Details
            </button>
          </div>
        </div>
      </div>
    </figure>
  </div>
    `;
  }

  rowData.innerHTML = cartona;
}

async function getCategories() {
  rowData.innerHTML = "";
  searchContainer.innerHTML = "";
  $(".inner-loading").fadeIn(300);

  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let data = await response.json();
  displayCategories(data.categories);
  $(".inner-loading").fadeOut(300);
}

function displayCategories(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="card bg-base-100 shadow-xl w-full sm:w-80 md:w-60 lg:w-80 min-[1520px]:w-[100%] rounded-lg">
    <figure class="relative overflow-hidden rounded-lg h-64">
      <img
        src="${arr[i].strCategoryThumb}"
        alt=""
        class="w-full h-full object-cover rounded-lg"
      />
      <div
        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-lg"
      >
        <div
          class="text-center text-white flex flex-col gap-2 justify-center items-center p-5"
        >
          <h2 class="card-title">${arr[i].strCategory}</h2>
          <p class="card-sub-title">${
            arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ") +
            "..."
          }</p>
          <div class="card-actions justify-center">
            <button onclick="getCategoryMeals('${
              arr[i].strCategory
            }')" class="btn btn-primary text-white">
              Show Details
            </button>
          </div>
        </div>
      </div>
    </figure>
  </div>
    `;
  }
  rowData.innerHTML = cartona;
}

async function getArea() {
  rowData.innerHTML = "";
  $(".inner-loading").fadeIn(300);

  searchContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();

  displayArea(respone.meals);
  $(".inner-loading").fadeOut(300);
}

function displayArea(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    const country = arr[i].strArea;
    const flagEmoji = getFlagEmoji(country);

    cartoona += `
      <div class="card bg-base-100 shadow-xl w-full sm:w-80 md:w-60 lg:w-80 min-[1520px]:w-[100%] rounded-lg" onclick="getAreaMeals('${country}')">
      <figure class="overflow-hidden rounded-lg h-64 cursor-pointer">
        <div class="w-full h-full flex items-center justify-center bg-gray-200">
          <h2 class="text-3xl font-bold text-gray-700">${flagEmoji} ${country}</h2>
        </div>
      </figure>
      </div>
      `;
  }

  rowData.innerHTML = cartoona;
}

// === Flag Emojis ===
function getFlagEmoji(country) {
  const countryCodes = {
    American: "🇺🇸",
    British: "🇬🇧",
    Canadian: "🇨🇦",
    Chinese: "🇨🇳",
    Dutch: "🇳🇱",
    Egyptian: "🇪🇬",
    French: "🇫🇷",
    Greek: "🇬🇷",
    Indian: "🇮🇳",
    Irish: "🇮🇪",
    Italian: "🇮🇹",
    Jamaican: "🇯🇲",
    Japanese: "🇯🇵",
    Kenyan: "🇰🇪",
    Malaysian: "🇲🇾",
    Mexican: "🇲🇽",
    Moroccan: "🇲🇦",
    Polish: "🇵🇱",
    Portuguese: "🇵🇹",
    Russian: "🇷🇺",
    Spanish: "🇪🇸",
    Thai: "🇹🇭",
    Tunisian: "🇹🇳",
    Turkish: "🇹🇷",
    Vietnamese: "🇻🇳",
    Croatian: "🇭🇷",
    Filipino: "🇵🇭",
    Ukrainian: "🇺🇦",
  };

  return countryCodes[country] || "";
}

async function getIngredients() {
  rowData.innerHTML = "";
  $(".inner-loading").fadeIn(300);

  searchContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();

  displayIngredients(respone.meals.slice(0, 20));
  $(".inner-loading").fadeOut(300);
}

function displayIngredients(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="card bg-base-100 shadow-xl w-full sm:w-80 md:w-60 lg:w-80 min-[1520px]:w-[100%] rounded-lg cursor-pointer" onclick="getIngredientsMeals('${
        arr[i].strIngredient
      }')">
      <figure class="relative overflow-hidden rounded-lg h-64">
        <img
          src="https://www.themealdb.com/images/ingredients/${
            arr[i].strIngredient
          }-Small.png"
          alt="Ingredient"
          class="w-full h-full object-cover rounded-lg"
        />
        <div
          class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-lg"
        >
          <div
            class="text-center text-white flex flex-col gap-2 justify-center items-center p-5"
          >
            <h2 class="card-title">${arr[i].strIngredient}</h2>
            <p class="card-sub-title">${
              arr[i].strDescription
                ? arr[i].strDescription.split(" ").slice(0, 20).join(" ") +
                  "..."
                : "No description available"
            }</p>
          </div>
        </div>
      </figure>
      </div>
      `;
  }

  rowData.innerHTML = cartoona;
}

async function getCategoryMeals(category) {
  rowData.innerHTML = "";
  $(".inner-loading").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading").fadeOut(300);
}

async function getAreaMeals(area) {
  rowData.innerHTML = "";
  $(".inner-loading").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading").fadeOut(300);
}

async function getIngredientsMeals(ingredient) {
  rowData.innerHTML = "";
  $(".inner-loading").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading").fadeOut(300);
}

async function getMealDetails(mealID) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  let data = await response.json();
  displayMealDetails(data.meals[0]);
}

function displayMealDetails(meal) {
  rowData.classList.add("hidden");

  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="badge badge-accent badge-outline py-3">${
        meal[`strIngredient${i}`]
      } - ${meal[`strMeasure${i}`]}</li>`;
    }
  }

  let tags = meal.strTags ? meal.strTags.split(",") : [];
  let tagsStr = tags
    .map(
      (tag) => `<li class="badge badge-accent badge-outline py-3">${tag}</li>`
    )
    .join("");

  let detailsHTML = `
    <div class="card card-side flex-col sm:flex-row shadow-xl w-full max-w-4xl mx-auto my-5">
      <figure class="relative overflow-hidden rounded-lg w-full h-64 md:h-80 lg:h-96">
        <img class="w-full h-full object-cover" src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      </figure>
      <div class="card-body">
        <h2 class="text-2xl font-semibold">${meal.strMeal}</h2>
        <h3 class="text-xl font-semibold mt-2">Instructions</h3>
        <p class="mt-2">${meal.strInstructions}</p>
        <h3 class="mt-4"><span class="font-bold">Area : </span>${meal.strArea}</h3>
        <h3><span class="font-bold">Category : </span>${meal.strCategory}</h3>
        <h3 class="mt-4">Recipes :</h3>
        <ul class="list-none flex flex-wrap gap-3 mt-2">${ingredients}</ul>
        <h3 class="mt-4">Tags :</h3>
        <ul class="list-none flex flex-wrap gap-3 mt-2">${tagsStr}</ul>
        <div class="mt-4 flex gap-2">
          <a target="_blank" href="${meal.strSource}" class="btn btn-success text-white">Source</a>
          <a target="_blank" href="${meal.strYoutube}" class="btn btn-error text-white">Youtube</a>
        </div>
      </div>
    </div>
  `;

  // Display the details
  detailsContainer.innerHTML = detailsHTML;
  detailsContainer.classList.remove("hidden");
  detailsContainer.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "min-h-screen"
  );
}

async function searchByName(term) {
  rowData.innerHTML = "";
  $(".inner-loading").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading").fadeOut(300);
}

async function searchByFirstLetter(term) {
  rowData.innerHTML = "";
  $(".inner-loading").fadeIn(300);

  term == "" ? (term = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading").fadeOut(300);
}

function showContactUs() {
  rowData.innerHTML = `
  <div class="contacts flex flex-col gap-5 justify-center items-center h-screen grid-column: span 4;">
    <h1 class="text-4xl font-bold mb-4">Contact Us</h1>
    <div class="inputs grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
      <div class="flex flex-col gap-2">
        <div role="alert" id="nameAlert" class="alert alert-warning hidden items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Warning: Special characters and numbers not allowed</span>
        </div>
        <label class="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" class="grow" id="nameInput" placeholder="Name" />
        </label>
      </div>
      <div class="flex flex-col gap-2">
        <div role="alert" id="emailAlert" class="alert alert-warning hidden items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Warning: Invalid email address!</span>
        </div>
        <label class="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" class="grow" id="emailInput" placeholder="Email" />
        </label>
      </div>
      <div class="flex flex-col gap-2">
        <div role="alert" id="phoneAlert" class="alert alert-warning hidden items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Warning: Invalid Phone Number!</span>
        </div>
        <label class="input input-bordered flex items-center gap-2">
          <i class="fa-solid fa-phone"></i>
          <input type="text" class="grow" id="phoneInput" placeholder="Phone" />
        </label>
      </div>
      <div class="flex flex-col gap-2">
        <div role="alert" id="ageAlert" class="alert alert-warning hidden items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Warning: Invalid Age!</span>
        </div>
        <label class="input input-bordered flex items-center gap-2">
          <i class="fa-solid fa-hashtag"></i>
          <input type="text" class="grow" id="ageInput" placeholder="Age" />
        </label>
      </div>
      <div class="flex flex-col gap-2">
        <div role="alert" id="passwordAlert" class="alert alert-warning hidden items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Warning: Invalid Password!</span>
        </div>
        <label class="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
            <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" />
          </svg>
          <input type="password" class="grow" id="passwordInput" placeholder="Password" />
        </label>
      </div>
      <div class="flex flex-col gap-2">
        <div role="alert" id="repasswordAlert" class="alert alert-warning hidden items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Warning: Doesn't Match Password !</span>
        </div>
        <label class="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
            <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" />
          </svg>
          <input type="password" class="grow" id="confirmPasswordInput" placeholder="Confirm Password" />
        </label>
      </div>
    </div>
    <button id="submitBtn" class="btn btn-outline btn-error mt-4" disabled>Submit</button>
  </div>
  `;

  // Add event listeners for validation
  document.getElementById("nameInput").addEventListener("blur", () => {
    if (nameValidation()) {
      document.getElementById("nameAlert").classList.replace("flex", "hidden");
    } else {
      document.getElementById("nameAlert").classList.replace("hidden", "flex");
    }
    inputsValidation();
  });

  document.getElementById("emailInput").addEventListener("blur", () => {
    if (emailValidation()) {
      document.getElementById("emailAlert").classList.replace("flex", "hidden");
    } else {
      document.getElementById("emailAlert").classList.replace("hidden", "flex");
    }
    inputsValidation();
  });

  document.getElementById("phoneInput").addEventListener("blur", () => {
    if (phoneValidation()) {
      document.getElementById("phoneAlert").classList.replace("flex", "hidden");
    } else {
      document.getElementById("phoneAlert").classList.replace("hidden", "flex");
    }
    inputsValidation();
  });

  document.getElementById("ageInput").addEventListener("blur", () => {
    if (ageValidation()) {
      document.getElementById("ageAlert").classList.replace("flex", "hidden");
    } else {
      document.getElementById("ageAlert").classList.replace("hidden", "flex");
    }
    inputsValidation();
  });

  document.getElementById("passwordInput").addEventListener("blur", () => {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("flex", "hidden");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("hidden", "flex");
    }
    inputsValidation();
  });

  document
    .getElementById("confirmPasswordInput")
    .addEventListener("blur", () => {
      if (confirmPasswordValidation()) {
        document
          .getElementById("repasswordAlert")
          .classList.replace("flex", "hidden");
      } else {
        document
          .getElementById("repasswordAlert")
          .classList.replace("hidden", "flex");
      }
      inputsValidation();
    });

  document.getElementById("submitBtn").addEventListener("click", () => {
    saveDataToLocalStorage();
  });
}

// === Input Validation ===
function inputsValidation() {
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    confirmPasswordValidation()
  ) {
    document.getElementById("submitBtn").removeAttribute("disabled");
  } else {
    document.getElementById("submitBtn").setAttribute("disabled", true);
  }
}

// === Save Data to Local Storage ===
function saveDataToLocalStorage() {
  const userData = {
    name: document.getElementById("nameInput").value,
    email: document.getElementById("emailInput").value,
    phone: document.getElementById("phoneInput").value,
    age: document.getElementById("ageInput").value,
    password: document.getElementById("passwordInput").value,
  };
  localStorage.setItem("userData", JSON.stringify(userData));
  alert("Data saved successfully!");
}

// === Validation Functions ===
function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function confirmPasswordValidation() {
  return (
    document.getElementById("confirmPasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
