const modal = () => {
    const modal = document.querySelector('.search-model')
    const modalBtn = document.querySelector('.icon_search')
    const modalClose = modal.querySelector('.search-close-switch')
    const seachInput = modal.querySelector("#search-input");

    modalBtn.addEventListener('click', () => {
        console.log('click');
        modal.classList.add('active');
    })
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    })
    seachInput.addEventListener("input", (event) => {
        console.log(event.target.value);
    });
}

modal()
