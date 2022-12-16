//После перезагрузки страницы, кнопка профиля остаётся
const addProfileBtn = () => {
	const profile = document.querySelector(".nav-panel__profile");
	//Убираем кнопку login
	profile.previousElementSibling.style.display = "none";
	//Добавляем кнопку профиля
	profile.style.display = "flex";
	profile.innerText = `${localStorage.getItem('name')}`;
};
if (localStorage.getItem('name')) addProfileBtn();
