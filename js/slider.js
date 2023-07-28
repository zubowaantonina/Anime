const swiper=()=>{
    const swiper = new Swiper('.swiper',{
        effect: "fade",
        speed: 1000,
        pagination: {
            el: '.swiper-pagination',
          },
        
          // Navigation arrows
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
    })
}
swiper();