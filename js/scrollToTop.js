
const scrollToTop=()=>{
    const topBtn=document.querySelector('#scrollToTopButton')
    console.log(topBtn);
    topBtn.addEventListener('click',(event) =>{
        event.preventDefault();
        seamless.scrollIntoView(document.querySelector(".header"), {
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
        console.log('click');
    })
}
scrollToTop();