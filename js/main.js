// Retrieve Html element
const wrapperDiv = document.getElementById('wrapper');
const loader = document.querySelector('.loader');
const msgElement = document.querySelector('.message');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Call All Countries onload
window.onload = () => {
    loadAPI('all');
};

// Preloader
const preLoader = (isShow) => {
    if (isShow) {
        loader.style.display = 'block';
    } else {
        loader.style.display = 'none';
    }
}

// Alert Message
const msg = (msg) => {
    msgElement.innerHTML = `${msg}!`;
    msgElement.style.display = 'block';
}

// Fetch API
const loadAPI = async (text) => {
    preLoader(true);
    // Check Internet Connection
    if (navigator.onLine) {
        const url = `https://restcountries.com/v2/${text}`;
        const res = await fetch(url);
        const data = await res.json();

        if (res.status === 200 && Array.isArray(data)) {
            msgElement.style.display = 'none';
            preLoader(false);
            displayCountry(data);

        } else {
            preLoader(false);
            msg(data.message);
        }
    } else {
        preLoader(false);
        msg('Please, check your Internet connection and try again');
    }
}

// Mapping All Countries and Display Results
const displayCountry = (countries) => {
    countries.map(country => {
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
            <img src="${country.flags.svg}" />
            <h3 class="country">${country.name} - ${country.alpha2Code}</h3>
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
}

// Search Country By Name
// Changing Html Layout without changing Html codes
searchBtn.style.display = 'none';
searchInput.style.border = '2px solid #707070';

searchInput.addEventListener('keyup', () => {
    const titles = document.querySelectorAll('.country');
    msg('No Result Found!');// Show By Default

    // Search By Country Name
    for (const title of titles) {
        if (title.innerText.toLowerCase().includes(searchInput.value.toLowerCase())) {
            title.parentNode.style.display = 'block';
            msgElement.style.display = 'none';
        } else {
            title.parentNode.style.display = 'none';
        }
    }
});