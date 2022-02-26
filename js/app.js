// Retrieve Html element
const wrapperDiv = document.getElementById('wrapper');
const loader = document.querySelector('.loader');
const msgElement = document.querySelector('.message');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const headerHeight = document.getElementById('header').offsetHeight;

// Call All Countries onload
window.onload = () => {
    loadAPI('all');
};

// Preloader and Alert Message
const msg = (msg) => {
    msgElement.innerHTML = `${msg}!`;
    msgElement.style.display = 'block';
}

// Fetch API
const loadAPI = async (text) => {
    removeCurrent();
    loader.style.display = 'block';
    const url = `https://restcountries.com/v2/${text}`;
    const res = await fetch(url);
    const data = await res.json();

    if (res.status === 200 && Array.isArray(data)) {
        msgElement.style.display = 'none';
        loader.style.display = 'none';
        displayCountry(data);

    } else {
        loader.style.display = 'none';
        msg(data.message);
    }
}

// Mapping All Countries and Display
const displayCountry = (countries) => {
    removeCurrent();
    countries.map(country => {
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
            <img src="${country.flags.svg}" />
            <h3>${country.name} - ${country.alpha2Code}</h3>
            <ul>
                <li><span class="label">Capital:</span> <span>${country.capital !== undefined ? country.capital : 'N/A'}</span></li>
                <li><span class="label">Region:</span> <span>${country.region}</span></li>
                <li><span class="label">Currency:</span> <span>${country.currencies !== undefined ? `${country.currencies[0].code} (${country.currencies[0].symbol})` : 'N/A'
            }</span ></li >
    <li><span class="label">Calling Codes:</span> <span>+${country.callingCodes}</span></li>
            </ul >
    `;

        wrapperDiv.appendChild(div);
    });

    // Scroll Down to Result IF Searching
    if (searching) {
        scrollToResult();
    }
}

// Search Country
let searching = false;
function searchNow(e) {
    e.preventDefault();
    const inputText = searchInput.value.toLowerCase();

    if (inputText) {
        const addPrefix = `name/${inputText}`;
        loadAPI(addPrefix);
        msgElement.style.display = 'none';
        searchInput.value = '';
    }
    searching = true;
}
searchBtn.addEventListener('click', searchNow);

// Remove Current Element
const removeCurrent = () => {
    wrapperDiv.innerHTML = ``;
}

// Scroll to result
const scrollToResult = () => {
    window.scroll({
        top: headerHeight,
        left: 0,
        behavior: 'smooth'
    });
}