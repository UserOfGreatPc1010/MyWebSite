window.onload = buttonClick;

function buttonClick() {
    document.querySelector("#button").onclick = regne;
}

function regne() {
    let tem = Number(document.getElementById("inputFeringheit").value);
    let celsium = ((tem - 32) / 1.8).toFixed(2);

    const resultDiv = document.getElementById("result");
    const imageHolder = document.getElementById("imageHolder");

    // Clear old image
    imageHolder.innerHTML = "";

    let message = "";
    let imageSrc = "";

    
    if (tem <= 32) {
        message = "Brr kald: " + celsium + "°C";
        imageSrc = "bilder/cold.png";
    } else if (tem >= 33 && tem <= 98) {
        message = celsium + "°C";
        imageSrc = "bilder/warm.png";
    } else if (tem >= 99 && tem <= 500) {
        message = "Det er kokvarmt: " + celsium + "°C";
        imageSrc = "bilder/hot.png";
    } else {
        resultDiv.textContent = "Feil – skriv inn en gyldig temperatur!";
        return;
    }

    resultDiv.textContent = message;

    // Create and show image
    const image = document.createElement("img");
    image.src = imageSrc;
    image.style.width = "120px";
    imageHolder.appendChild(image);
}
