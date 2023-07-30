const detailData = () => {
    const preloder = document.querySelector(".preloder");
    const renderGanreList = (ganres) => {
        //выбор категории
        const dropDownBlock = document.querySelector(".header__menu .dropdown");

        ganres.forEach((ganre) => {
            dropDownBlock.insertAdjacentHTML(
                "beforeend",
                `
                    <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
        
                    `
            );
        });
        // console.log(dropDownBlock);
    };

    const renderAnimeDetails = (array, itemId) => {
        const animeObj = array.find((item) => item.id == itemId);
        const imageBlock = document.querySelector(".anime__details__pic");
        const viewsBlock = imageBlock.querySelector(".view");
        const titlesBlock = document.querySelector(".anime__details__title h3");
        const subTitlesBlock = document.querySelector(
            ".anime__details__title span"
        );
        const descriptionBlock = document.querySelector(".anime__details__text p");
        const widgetList = document.querySelectorAll(
            ".anime__details__widget ul li"
        );
        const breadcrumb = document.querySelector(".breadcrumb__links span");
        // const breadcrumbHome=document.querySelector('.breadcrumb__links a')
        console.log(animeObj);
        if (animeObj) {
            console.log(animeObj);
            imageBlock.dataset.setbg = animeObj.image;
            // viewsBlock.innerHTML = ''
            viewsBlock.insertAdjacentHTML(
                "beforeend",
                `

            <div class="view"><i class="fa fa-eye"></i> ${animeObj.views}</div>
            `
            );

            titlesBlock.textContent = animeObj.title;
            subTitlesBlock.textContent = animeObj["original-title"];
            descriptionBlock.textContent = animeObj.description;
            widgetList[0].insertAdjacentHTML(
                "beforeend",
                `
                  <span>Date aired:</span> ${animeObj.date}
                  `
            );
            widgetList[1].insertAdjacentHTML(
                "beforeend",
                `
                  <span>Status:</span> ${animeObj.rating}
                  `
            );
            widgetList[2].insertAdjacentHTML(
                "beforeend",
                `
                  <span>Genre:</span> ${animeObj.tags.join(", ")}
                  `
            );
            breadcrumb.textContent = animeObj.ganre;
            document.querySelectorAll(".set-bg").forEach((elem) => {
                elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
            });

            setTimeout(() => {
                preloder.classList.remove("active");
            }, 500);
            // breadcrumbHome.textContent=animeObj.categories
        } else {
            console.log("Аниме отсутствует");
        }
        //    console.log(animeObj);
        //    console.log(itemId);
    };
    // preloder.classList.add("active");

    fetch("https://anime-in-javascript-default-rtdb.firebaseio.com/db.json")
        .then((response) => response.json())
        .then((data) => {
            //коллекция жанров аниме - ganres
            const ganres = new Set();
            const ganresParams = new URLSearchParams(window.location.search).get(
                "item.id"
            );
            //    console.log(ganresParams);
            data.anime.forEach((item) => {
                ganres.add(item.ganre);
            });

            if (ganresParams) {
                renderAnimeDetails(data.anime, ganresParams);
            } else {
                console.log("Аниме отсутствует");
            }

            renderGanreList(ganres);
        });
};
detailData();
