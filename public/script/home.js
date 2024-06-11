const add_color = document.getElementById("add-color");
const color_value = document.getElementById("color-wheel-value");
const color_wheel = document.getElementById("color-wheel");
const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const dialog = document.getElementById("add-color--dialog");
const signout = document.getElementById("signout")

document.addEventListener("DOMContentLoaded", async () => {
    const color_container = document.getElementById("color-container");
    let session_id, session_name;

    //get session id to check
    const session = await fetchSession(session_id, session_name);

    //displayname
    if(session) {
        displayName(session.session_name);
    }

    //displayColors
    if(session) {
        displayColors(color_container);
    }

});

async function fetchSession(session_id) {
    return fetch("/session/getSession", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(data => {
        if(!data.success) {
            window.location.href = "/login";
        }
        else {
            session_name = data.name;
            session_id = data.account_id;

            return {session_name, session_id};
        }
    });
}

function displayName(session_name) {
    document.getElementById("username").textContent = `${session_name}'s Kulay de Paleta`;
}

function displayColors(color_container) {
    fetch("/color/getColors", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(data => {
        if(!data.success) {
            alert("Error with colors");
        }
        else {
            data.colors.forEach((color) => {
                const card = document.createElement("div");
                const details = document.createElement("h1");

                details.textContent = color.color_code;
                details.classList.add("details");

                card.appendChild(details);

                card.classList.add("card");
                card.style['background-color'] = color.color_code;

                color_container.appendChild(card);
            });
        }
    });
}

signout.addEventListener("click", (e) => {
    fetch("user/signout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if(!data.success) {
            alert("Unable to signout!");
        }
        else {
            window.location.href = "/login"   
        }
    });

})

add_color.addEventListener("click", () => {
    let randomColor = '#';

    for(let i = 0; i < 6; i++) {
        randomColor += hex[Math.floor(Math.random() * 16)];
    }

    color_wheel.value = randomColor;
    color_value.value = randomColor;

    dialog.show();
});

document.addEventListener("keydown", (e) => {
    if(e.key === 'Escape') {
        dialog.close();
    }
})

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
        if(!data.success) {
            alert("Failed to add Color to DB");
        }
    });

    dialog.close();
    window.location.href = "/home";
})