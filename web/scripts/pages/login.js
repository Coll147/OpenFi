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