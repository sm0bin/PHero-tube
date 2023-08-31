// console.log("hola");

function fetchCategory() {
    fetch("https://openapi.programming-hero.com/api/videos/categories")
        .then(res => res.json())
        // .then(data => console.log(data.data))
        .then(data => showCategoryBtn(data.data))
}

function getById(id) {
    return document.getElementById(id);
}


function showCategoryBtn(data) {
    data.forEach(element => {
        const btn = `<button class="bg-gray-300 px-8 py-2.5 rounded font-medium text-lg text-gray-700">${element.category}</button>`;
        getById("showCategoryParent").innerHTML += btn;
        // console.log(element.category);
    });

}

fetchCategory()