const color_value = document.getElementById("color-wheel-value");
const color_wheel = document.getElementById("color-wheel");
const hex = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
const dialog = document.getElementById("add-color--dialog");

document.getElementById("add-color").addEventListener("click", () => {
    let randomColor = '#';

    for(let i = 1; i < 7; i++) {
        randomColor += hex[Math.floor(Math.random() * 100) % 16].toUpperCase();
    }

    color_wheel.value = randomColor;
    color_value.value = randomColor;

    dialog.show();
});

color_value.addEventListener("input", (e) => {
    color_wheel.value = e.target.value;
});

color_wheel.addEventListener("input", (e) => {
    color_value.value = e.target.value.toUpperCase();
});

document.getElementById("color-code--form").addEventListener("submit", (e) => {
    e.preventDefault();

    const colorData = {
        color: document.getElementById("color-wheel-value").value
    }

    fetch("/color/addColor", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(colorData)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert("Added Color Successfully");
        }
        else {
            alert("Failed to add Color to DB");
        }
    });

    dialog.close();
})