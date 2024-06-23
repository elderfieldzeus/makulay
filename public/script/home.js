const add_color = document.getElementById("add-color");
const color_value = document.getElementById("color-wheel-value");
const color_wheel = document.getElementById("color-wheel");
const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const dialog = document.getElementById("add-color--dialog");
const signout = document.getElementById("signout")

class Color {
    constructor(color_id, color_code, color_container) {
        this.color_id = color_id; //to store color_id
        this.color_code = color_code;
        this.color_container = color_container;

        this.details = this.createDetails();
        this.remove = this.createDelete();
        this.color_card = this.createCard(this.details, this.remove);
        this.addDelete(this.color_card, this.details, this.remove, this.color_id);
    }

    createDetails() {
        const details = document.createElement("h1");

        details.textContent = this.color_code;
        details.classList.add("details");

        return details
    }

    createDelete() {
        const remove = document.createElement("span");

        remove.classList.add("delete-svg");
        remove.classList.add("remove");
        remove.style['background-color'] = 'white';
        remove.style.opacity = 0;

        return remove;
    }

    createCard(details, remove) {
        const card = document.createElement("div");

        card.appendChild(details);
        card.appendChild(remove);

        card.classList.add("card");
        card.style['background-color'] = this.color_code;

        return card;
    }

    addDelete(color_card, details, remove, color_id) {
        function disappear() {
            color_card.classList.remove("color_clicked");
            remove.style.opacity = 0;
        }

        color_card.addEventListener("click", () => {
            if(color_card.classList.contains("color_clicked")) {
                disappear();
                
                this.deleteCard(color_id);
            }
            else {
                details.style.opacity = 0;
                remove.style.opacity = 1;
                color_card.classList.add("color_clicked");
            }
        });

        color_card.addEventListener("mouseover", () => {
            details.style.opacity = 1;
        });

        color_card.addEventListener("mouseout", () => {
            disappear();
            details.style.opacity = 0;
        });
    }

    deleteCard(color_id) {
        const deleteData = {
            color_id
        }

        fetch("/color/deleteColor", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(deleteData)
        })
        .then((response) => response.json())
        .then((data) => {
            if(!data.success) {
                alert("ERROR IN DELETING");
            }
            else {
                // alert("DELETED SUCCESSFULLY");
                window.location.href = '/home';
            }
        })
    }

    display() {
        this.color_container.appendChild(this.color_card);
    }

}

const colors = [];

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
                color_class = new Color(color.color_id, color.color_code, color_container);
                colors.push(color_class);
            });

            colors.forEach((color) => {
                color.display();
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

});

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
        color: document.getElementById("color-wheel-value").value.toUpperCase()
    }

    if(colorData.color[0] != '#') {
        dialog.close();
        return alert("Must start with a '#'!");
    }

    let i;

    for(i = 1; i < 7 && hex.includes(colorData.color[i]); i++) {}

    if(i < 7) {
        dialog.close();
        return alert("Must be Hexadecimal!");
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