document.getElementById("signin_form").addEventListener("submit", (e) => {
    e.preventDefault();

    const loginData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    }

    fetch("/user/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.success) {
            window.location.href = "/home";
        }
        else {
            alert("Invalid Login Attempt");
        }
    });
});