function toggleMenu(id){
    const element = document.getElementById(id)
    const actualState = element.style.display
    switch (actualState){
        case "none":
            element.style.display = "block"
            break;

        case "block":
            element.style.display = "none"
            break;

        default:
            console.log('actions.js > toogleMenu > Error al cambiar, valor inesperado')
            console.log(actualState)
    }
}