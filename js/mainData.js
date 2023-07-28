const mainData = () => {
    fetch('https://anime-in-javascript-default-rtdb.firebaseio.com/db.json').then((response) => {
        return response.json()
    })
    .then((data)=>{
console.log(data);
    })



}
mainData()