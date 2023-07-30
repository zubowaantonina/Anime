const modal = () => {
    const modal = document.querySelector(".search-model");
    const modalBtn = document.querySelector(".icon_search");
    const modalClose = modal.querySelector(".search-close-switch");
    const seachInput = modal.querySelector("#search-input");
    const wrapper = document.querySelector('.search-model-result')
    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '500px';

    const renderFunc = (items) => {
        wrapper.innerHTML='';

     items.forEach(item => {
        wrapper.insertAdjacentHTML('afterbegin', `
        <a href="/anime-details.html" target="_blank" class="pt-2">${item.title}</a>
        `)
     })
    }
    const searchFunc = (searchStr) => {
        fetch("https://anime-in-javascript-default-rtdb.firebaseio.com/db.json").then((response) => {
            // fetch('./db.json').then((response) => {
            return response.json();
        })
            .then((data) => {
                const filteredData = data.anime.filter(dataItem => {
                    return dataItem.title.toLowerCase().includes(searchStr.toLowerCase()) || dataItem.description.toLowerCase().includes(searchStr.toLowerCase())
                })
                renderFunc(filteredData.slice(0, 5))

            });
    };


    modalBtn.addEventListener("click", () => {
        //display:'block','none' -не анимируется
        // modal.style.display = "block"
        modal.classList.add("active");
        seachInput.focus();
    });

    modalClose.addEventListener("click", () => {
        // modal.style.display = "none"
        modal.classList.remove("active");
        seachInput.value = '';
    });
    seachInput.addEventListener("input", (event) => {
        searchFunc(event.target.value);
    });
};
modal();
