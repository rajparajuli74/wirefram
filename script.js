const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd';

async function fetchPrices() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        updatePrice('bitcoin', data.bitcoin.usd);
        updatePrice('ethereum', data.ethereum.usd);
        updatePrice('litecoin', data.litecoin.usd);
    } catch (error) {
        console.error('Error fetching cryptocurrency prices:', error);
    }
}

function updatePrice(crypto, price) {
    const card = document.getElementById(crypto);
    if (card) {
        const priceElement = card.querySelector('.price');
        priceElement.textContent = `$${price.toFixed(2)}`;
        // Here you can add logic to determine if the price went up or down
        // and add or remove the 'down' class accordingly.
    }
}

const loginModal = document.getElementById('login-modal');
const loginBtn = document.getElementById('login-btn');
const closeBtn = document.getElementsByClassName('close')[0];

loginBtn.onclick = function() {
    loginModal.style.display = "block";
}

closeBtn.onclick = function() {
    loginModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
}

document.getElementById('login-form').onsubmit = function(event) {
    event.preventDefault();
    alert('Login functionality is not implemented.');
    loginModal.style.display = "none";
}

const searchBar = document.getElementById('search-bar');
searchBar.onkeyup = function() {
    const filter = searchBar.value.toUpperCase();
    const cards = document.getElementsByClassName('crypto-card');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const title = card.getElementsByTagName('h2')[0];
        if (title.innerHTML.toUpperCase().indexOf(filter) > -1) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    }
}

// Initial fetch
fetchPrices();

// Update prices every minute
setInterval(fetchPrices, 60000);
