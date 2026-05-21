const POLSER_PER_PAKKE = 10;
const BROD_PER_PAKKE = 8;

let arrivedGuests = 0;
let weatherState = 'neutral'; 


document.getElementById('polseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const guests = Int(document.getElementById('guests').value);
    const polsePerPerson = Int(document.getElementById('polsePerPerson').value);
    
    const totalPolser = guests * polsePerPerson;
    const totalBrod = guests * polsePerPerson;    
    const polsePakker = Math.ceil(totalPolser / POLSER_PER_PAKKE);
    const brodPakker = Math.ceil(totalBrod / BROD_PER_PAKKE);
    
    let polseOvers = (polsePakker * POLSER_PER_PAKKE) - totalPolser;
    let brodOvers = (brodPakker * BROD_PER_PAKKE) - totalBrod;
    
    document.getElementById('polsePakker').textContent = polsePakker;
    document.getElementById('brodPakker').textContent = brodPakker;
    document.getElementById('polseOvers').textContent = polseOvers;
    document.getElementById('brodOvers').textContent = brodOvers;
    document.getElementById('result').classList.add('show');
});


document.getElementById('registerBtn').addEventListener('click', function() {
    arrivedGuests++;
    document.getElementById('guestCount').textContent = arrivedGuests;
    
    let text;
    if (arrivedGuests === 1) {
        text = 'Den første gjesten har ankommet';
    } else if (arrivedGuests < 5) {
        text = `${arrivedGuests} gjester har ankommet festen!`;
    } else if (arrivedGuests < 10) {
        text = `Flott! ${arrivedGuests} gjester er her allerede! `;
    } else {
        text = `Wow! Hele ${arrivedGuests} gjester har kommet! Festen er i gang!`;
    }
    
    document.getElementById('guestText').textContent = text;
});


document.getElementById('weatherBtn').addEventListener('click', function() {
    const body = document.body;
    const statusText = document.getElementById('weatherStatus');
    
    if (weatherState === 'neutral') {
        weatherState = 'sunny';
        body.className = 'sunny';
        statusText.textContent = 'Fint vær';
    } else if (weatherState === 'sunny') {
        weatherState = 'rainy';
        body.className = 'rainy';
        statusText.textContent = 'Det regner!';
    } else {
        weatherState = 'neutral';
        body.className = '';
        statusText.textContent = 'Nøytralt vær';
    }
});