const addNameProfile = () => {
    const name = document.querySelector(".profile__name");
    name.innerText = `${localStorage.getItem("name")}`;
};

addNameProfile();