const mainData=()=>{
// console.log('mainadata');
fetch('https://anime-in-js-default-rtdb.firebaseio.com/anime.json').then((response)=>{
console.log(response);
return response.json();
})
.then((data)=>{
console.log(data);
})


}
mainData();