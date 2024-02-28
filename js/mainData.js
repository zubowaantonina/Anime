const mainData = () => {
    const preloder = document.querySelector('.preloder');
    const renderAnimeList = (array,ganres) => {
        //выбор категории
        // const dropDownBlock = document.querySelector('.header__menu .dropdown')
console.log(array);
console.log(ganres);
        // ganres.forEach(ganre => {
        //     dropDownBlock.insertAdjacentHTML('beforeend', `
        //     <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>

        //     `)
        // })
        // console.log(dropDownBlock);
    }
    const renderTopAnime = (array) => {
        const wrapper = document.querySelector('.filter__gallery')

        wrapper.innerHTML = ''

        array.forEach((item) => {
            console.log(item);
            wrapper.insertAdjacentHTML("afterbegin", `
                <div class="product__sidebar__view__item set-bg mix"
                    data-setbg="${item.image}">
                    <div class="ep">${item.rating} / 10</div>
                    <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
                    <h5><a href="#">${item.title}</a></h5>
                </div>

            `)
        })
       wrapper.querySelectorAll('.set-bg').forEach((elem) => {
        console.log(elem);
            elem.style.backgroundImage = `url(${elem.dataset.setbg})`
        })
    }
    // console.log('mainadata');
    fetch("https://anime-in-js-default-rtdb.firebaseio.com/anime.json")
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            const ganres = new Set()
            data.forEach((item) => {
                ganres.add(item.ganre)
            })
console.log(ganres);
            renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5));
            renderAnimeList(data,ganres);
        });
};
mainData();
