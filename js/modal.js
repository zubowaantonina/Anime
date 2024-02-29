const modal = () => {
    const modal = document.querySelector(".search-model");
    const modalBtn = document.querySelector(".icon_search");
    const modalClose = modal.querySelector(".search-close-switch");
    const seachInput = modal.querySelector("#search-input");
    const wrapper = document.querySelector('.search-model-result');


    // wrapper.style.width = '100%';
    // wrapper.style.maxWidth = '500px';

    //отложенный запрос



    const debounce = (func, ms = 500) => {
        let timer

        return (...args) => {
            // console.log('abc');
            clearTimeout(timer);
            timer = setTimeout(()=>{func.apply(this, args)}, ms)
        }
    }
    const searchDebounce = debounce((searchString) => {
        searchFunc(searchString);
    }, 500)


    const renderFunc = (items) => {
        wrapper.innerHTML = '';

        items.forEach(item => {
            wrapper.insertAdjacentHTML('afterbegin', `
     
        <a href="/anime-details.html?item.id=${item.id}" >${item.title}</a>
        `)
        })
    }
    const searchFunc = (searchStr) => {
       
            fetch('https://anime-in-js-default-rtdb.firebaseio.com/anime.json').then((response) => {
            return response.json();
        })
            .then((data) => {
                const filteredData = data.filter(dataItem => {
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
        searchDebounce(event.target.value);
    });
}

modal()
