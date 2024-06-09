const form = document.getElementById('signup_form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); //preventDefault to avoid sending form right away

    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        cpassword: document.getElementById('cpassword').value
    }; //gather data to send to backend

    fetch("/user/signup", { //send data through method POST
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json()) //response is turned into a json file
    .then(data => { //json file is read
        alert(data.message);
        if (!data.success) {
            window.location.href = "/register";
        } else {
            window.location.href = "/";
        }
    })
    .catch(err => {
        console.log(err);
        alert("An error occurred. Please try again.");
    });
});