function showText(text) {
    console.log("text function")
    const box = document.getElementById('alertBox')
    box.style.display = 'flex'

    const textCont = document.getElementById('cardText')
    textCont.textContent = text
    textCont.style.color = "#ff9898"
}


function login(id) {
    console.log("login function")
    const password = document.getElementById(id).value
    console.log(password)
    if (password == "coll147") {
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