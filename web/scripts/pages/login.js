function setBg() {
    const account = JSON.parse(localStorage.getItem("account")) // cargar localstorage
    let loginbg

    switch (account[0].background){

        case "bing-images":
            loginbg = "https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=es_ES"
            /* https://github.com/TimothyYe/bing-wallpaper */
        break;

        case "color":
            loginbg = "#444444c2"
        break;
    }

    document.body.style.backgroundImage = `url("${loginbg}")`
}


function initDB() {
    const DBdata = localStorage.getItem("account")

    if (DBdata) {
        console.log("La DB ya está lista")
    } else {
        console.log("La DB no existe, creando...")
        localStorage.setItem("devices", JSON.stringify(devices))
        localStorage.setItem("logs", JSON.stringify(logs))
        localStorage.setItem("account", JSON.stringify(account))
    }
}

function showText(text) {
    console.log("text function")
    const box = document.getElementById('alertBox')
    box.style.display = 'flex'

    const textCont = document.getElementById('cardText')
    textCont.textContent = text
    textCont.style.color = "#ff9898"
}


function login(id) {
    console.log("login function called")
    let account = JSON.parse(localStorage.getItem("account")) // cargar localstorage
    const password = document.getElementById(id).value
    console.log(password)
    if (password == account[0].password) {
        window.location.href='./main.html'
    }
    else {
        showText("Contraseña Incorrecta")
    }
}

// Para activar la función si pulso enter
// https://stackoverflow.com/questions/7060750/detect-the-enter-key-in-a-text-input-field

document.querySelectorAll(".input-group").forEach(input => { 
    // Meto el listener a los dos grupos de input aunque ahora solo se puede escribir en password
    input.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            login(e.target.id); // fix later
        }
    });
});