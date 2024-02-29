const categoriesData = () => {
    const preloder = document.querySelector(".preloder");
    const renderGanreList = (ganres) => {

        //выбор категории
        const dropDownBlock = document.querySelector('.header__menu .dropdown')


        ganres.forEach(ganre => {
            dropDownBlock.insertAdjacentHTML('beforeend', `
            <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>

            `)
        })
        // console.log(dropDownBlock);
    }
    const renderAnimeList = (array, ganres) => {
        //выбор категории
        const wrapper = document.querySelector(".product-page .col-lg-8");


        //создание каталога жанров
        ganres.forEach((ganre) => {
            const productBlock = document.createElement('div');
            const listBlock = document.createElement('div');

            const list = array.filter(item => item.tags.includes(ganre));//фильтрация карточек из базы данных по жанрам

            listBlock.classList.add('row')
            productBlock.classList.add('mb-5')
            productBlock.insertAdjacentHTML('beforeend', `
            <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-8">
                    <div class="section-title">
                    <h4>${ganre}</h4>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                    <div class="btn__all">
                         <a href="/categories.html?ganre=${ganre}" class="primary-btn">View All <span class="arrow_right"></span></a>
                    </div>
                </div>
            </div>
        `)
            list.forEach(item => {
                const tagsBlock = document.createElement('ul')

                item.tags.forEach(tag => {
                    tagsBlock.insertAdjacentHTML('beforeend', `
                <li>${tag}</li>
                `)
                })

                listBlock.insertAdjacentHTML('beforeend', `
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                        <div class="product__item__pic set-bg" data-setbg="${item.image}">
                            <div class="ep">${item.rating} / 10</div>
                            <div class="view"><i class="fa fa-eye"></i>${item.views}</div>
                        </div>
                        <div class="product__item__text">
                           ${tagsBlock.outerHTML}
                            <h5><a href="/anime-details.html?item.id=${item.id}">${item.title}</a></h5>
                        </div>
                    </div>
                </div>
            `)
            })
            productBlock.append(listBlock)
            wrapper.append(productBlock);

            wrapper.querySelectorAll(".set-bg").forEach((elem) => {
                elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
            });
        })
    };
    //создание topAnime из базы данных
    const renderTopAnime = (array) => {
        const wrapper = document.querySelector(".filter__gallery");

        array.forEach((item) => {
            // console.log(item);
            wrapper.insertAdjacentHTML(
                "beforeend",
                `
                <div class="product__sidebar__view__item set-bg mix"
                    data-setbg="${item.image}">
                    <div class="ep">${item.rating} / 10</div>
                    <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
                    <h5><a href="#">${item.title}</a></h5>
                </div>

            `
            );
        });
        wrapper.querySelectorAll(".set-bg").forEach((elem) => {
            // console.log(elem);
            elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
        });
        setTimeout(() => {
            preloder.classList.remove('active')
        }, 500)
    };
    // console.log('mainadata');
    fetch("https://anime-in-js-default-rtdb.firebaseio.com/anime.json")
        .then((response) => response.json())
        .then((data) => {
            const ganres = new Set();
            const ganreParams = new URLSearchParams(window.location.search).get('ganre')

            // console.log(ganreParams);
            data.forEach((item) => {
                ganres.add(item.ganre);
            });
            // console.log(ganres);
            renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5));
            if (ganreParams) {
                renderAnimeList(data, [ganreParams]);
            } else {
                renderAnimeList(data, ganres);
            }

            // renderAnimeList(data, ganres);
            renderGanreList(ganres)
        });
}
categoriesData()