// Load Meals

const loadMeals = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s')
        .then(Response => Response.json())
        .then(data => displayProducts(data.meals))
}
loadMeals()

const displayProducts = meals => {
    document.getElementById('spinner').style.display = 'none'
    const container = document.getElementById('row')
    meals.forEach(meal => {
        //  console.log(meal)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div onclick=faceDatas(${meal.idMeal}) class="card h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0,100)}</p>
        </div>
      </div>
        `
        container.appendChild(div)

    })
}

// Search System
document.getElementById('search-btn').addEventListener('click', function (event) {
    event.preventDefault()
})
document.getElementById('search-erro-msg').style.display = 'none'
const loadSearch = () => {
    document.getElementById('spinner').style.display = 'block'
    // get search Field Data
    const searchFiels = document.querySelector('input')
    const inputValue = searchFiels.value
    if (inputValue.length == 0) {
        document.getElementById('spinner').style.display = 'none'
        loadMeals()
        return document.getElementById('search-erro-msg').style.display = 'block'
    } else {
        document.getElementById('row').textContent = ''
        document.getElementById('search-erro-msg').style.display = 'none'
    }
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
    // Fetch API data
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
}

document.getElementById('not-found').style.display= 'none'
const displaySearchResult = meals => {
    if (meals == null) {
        document.getElementById('not-found').style.display= 'block'
    } else {
        document.getElementById('not-found').style.display= 'none'
    }
    document.getElementById('spinner').style.display = 'none'
    const container = document.getElementById('row')
    meals.forEach(meal => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div onclick=faceDatas(${meal.idMeal}) class="card h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0,100)}</p>
        </div>
      </div>`
        container.appendChild(div)

    })
}
const faceDatas = async mealId => {
    document.getElementById('modal-body').innerText = ''
    document.getElementById('modal-header').innerText = ''
    showLoading()
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.meals[0])
}

const displayDetails = productDetails => {
    //Dynamic Modal Header
    const modalHeader = document.getElementById('modal-header')
    modalHeader.innerText = productDetails.strMeal
    //Dynamic Modal Body
    const modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `
        <img class="img-fluid" src=${productDetails.strMealThumb}>
        <h3>${productDetails.strMeal}</h3>
        <p>${productDetails.strInstructions}</p>
    `
}

function showLoading() {
    document.getElementById('modal-body').innerHTML = `
    <div id="spin">
    <div class="spinner-grow text-primary mx-auto d-block" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    `
}


// Return Back when Search input is empty
document.querySelector('input').addEventListener('keyup', function () {
    const element = document.querySelector('input')
    const value = element.value
    if (value.length == 0) {
        loadMeals()
        document.getElementById('not-found').style.display= 'none'
    }
})