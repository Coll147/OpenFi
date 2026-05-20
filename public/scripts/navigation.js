document.addEventListener("DOMContentLoaded", (event) => {

    const items = document.querySelectorAll('nav ul li');

    items.forEach((item) => {

        item.addEventListener('click', () => {
            redirect(item.dataset.page);
        });
    
    });

});


function redirect(page){
    location.href = page;
}