class MenuCard {
    constructor(genre, title, parentSelector, ...classesCard) { 
        this.genre = genre;
        this.title = title;
        this.parent = document.querySelector(parentSelector);
        this.classes = classesCard;  
    }

    render() {
        const element = document.createElement('a');
        this.classes.forEach(className => element.classList.add(className)); 
        element.href = `../genres/${this.genre}.html`;


        element.innerHTML = `
            <h2 class="card__title">${this.title}</h2>
            <div>
                <img src="../../img/genres/${this.genre}.jpg" alt=${this.genre} class="card__img">
            </div>
        `;
        this.parent.append(element);
    }
}

new MenuCard(
    "indie",
    "Indie",
    ".genres__wrapper",
    "card",
    "card_gradient-indie",
    "genres__card"
).render();

new MenuCard(
    "hip-hop",
    "Hip-Hop",
    ".genres__wrapper",
    "card",
    "card_gradient-hip-hop",
    "genres__card"
).render();

new MenuCard(
    "pop",
    "Pop",
    ".genres__wrapper",
    "card",
    "card_gradient-pop",
    "genres__card"
).render();

new MenuCard(
    "rock",
    "Rock",
    ".genres__wrapper",
    "card",
    "card_gradient-rock",
    "genres__card"
).render();

new MenuCard(
    "metal",
    "Metal",
    ".genres__wrapper",
    "card",
    "card_gradient-metal",
    "genres__card"
).render();

new MenuCard(
    "classical",
    "Classical",
    ".genres__wrapper",
    "card",
    "card_gradient-classical",
    "genres__card"
).render();

new MenuCard(
    "jazz",
    "Jazz",
    ".genres__wrapper",
    "card",
    "card_gradient-jazz",
    "genres__card"
).render();

new MenuCard(
    "blues",
    "Blues",
    ".genres__wrapper",
    "card",
    "card_gradient-blues",
    "genres__card"
).render();


