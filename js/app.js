const loadAPI = async () => {
    const url = `https://restcountries.com/v2/all`;

    const res = await fetch(url);
    const data = await res.json();

    if (data) {
        displayCountry(data);
    }
}

const displayCountry = (countries) => {
    const wrapperDiv = document.getElementById('wrapper');

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
}

loadAPI();