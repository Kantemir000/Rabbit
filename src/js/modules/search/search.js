const search = document.querySelector(".search"),
    searchInput = search.querySelector(".search__input");

search.addEventListener("touchstart", () => {
    searchInput.style.display="none";
});
