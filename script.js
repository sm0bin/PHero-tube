// console.log("hola");

function fetchCategories() {
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
        const btn = `<button class="bg-gray-300 px-8 py-2.5 rounded font-medium text-lg text-gray-700"  onclick="fetchCategoryVideos(${element.category_id})">${element.category}</button>`;
        getById("showCategoryParent").innerHTML += btn;
        // console.log(element.category_id);
    });

}

let categoryId = 1000;
function fetchCategoryVideos(id, isSorted) {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then(res => res.json())
        .then(json => showCategoryVideos(json.data, isSorted))
    categoryId = id;
    // .then(json => console.log(json.data))

}

function getViewCount(element) {
    // data.sort((a.others.views, b.others.views) => b.others.views - a.others.views)
    // data.forEach(element => {

    // });
    const subString = element.others.views.split("K");
    return parseFloat(subString[0]);
}
// getViewCount("100K")

function showCategoryVideos(data, isSorted) {
    if (isSorted) {
        data.sort((a, b) => getViewCount(b) - getViewCount(a));
    }

    getById("videoContainer").innerHTML = "";

    if (!data.length) {
        getById("noContent").innerHTML = `
            <img class="mx-auto mb-10" src="./images/Icon.png" alt="">
            <h1 class="font-bold text-4xl">Oops!! Sorry, There is no <br> content here</h1>
        `;
    } else {
        getById("noContent").innerHTML = "";
    }

    console.log((data));
    data.forEach(element => {
        // console.log(sortVideos(element));
        const video = `
                <div>
                    <div class="relative">
                        <img class="rounded-lg w-full h-60 object-cover" src="${element.thumbnail}" alt="">
                        ${element.others.posted_date ? `<div class="p-2 rounded bg-gray-950 text-white absolute bottom-3 right-3">${timeConverter(element.others.posted_date)}</div>` : ""
            }
                    </div>

                    <div class="flex gap-5 mt-6">
                        <img class="w-12 h-12 rounded-full object-cover" src="${element.authors[0].profile_picture}" alt="">
                        <div>
                            <h2 class="font-bold text-xl">${element.title}</h2>
                            <div class="flex items-center gap-2.5">
                                <h3 class="text-lg">${element.authors[0].profile_name}</h3>
                                ${element.authors[0].verified ? `<img src="./images/badge.svg" alt="">` : ""}
                            </div>
                            <h3 class="text-lg">${element.others.views} views</h3>

                        </div>
                    </div>

                </div>
            `;
        getById("videoContainer").innerHTML += video;
        // console.log(element);
    });
}

function timeConverter(sec) {
    const hour = sec / 3600;
    const minutes = (sec % 3600) / 60;

    return `${Math.round(hour)}hrs ${Math.round(minutes)}min ago`;
}

// console.log(timeConverter(15147));

fetchCategories()
fetchCategoryVideos(1000)


getById("blog").addEventListener("click", () => {
    window.location.assign("./blog.html");
});

getById("sortBtn").addEventListener("click", () => {
    fetchCategoryVideos(categoryId, true);
});