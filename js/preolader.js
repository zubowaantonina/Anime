const preloder=()=>{
    const preloder = document.querySelector('.preloder');

    preloder.classList.add('active')
    console.log(preloder);
    setTimeout(() => {
        preloder.classList.remove('active')
    }, 500)
}

preloder()
