export class Card {
    constructor(name, price, link, category) {
        this.name = name;
        this.price = Number(price);
        this.link = link;
        this.category = category;
    }

    displayCard() {
        return `
            <div class="product-item">
                <img src="${this.link}" alt="${this.name}">
                <h3>${this.name}</h3>
                <p class="price">₦${this.price.toLocaleString()}</p>
            </div>
        `
    }
}

export const allProducts = [
    new Card("Mixt Wooden Table", "150000.00", "images/ani-coffee-tables-39870684627166-Photoroom.webp", "table"),
    new Card("Nordic Chair", "150000.00", "images/Image-2.png", "chair"),
    new Card("Office Chair", "185000.00", "images/istockphoto-1490325659-612x612.jpg", "chair"),
    new Card("Nordic Chair", "100000.00", "images/istockphoto-1353198901-612x612.jpg", "chair"),
    new Card("County Sofa", "450000.00", "images/istockphoto-670435526-612x612.jpg", "sofa"),
    new Card("Brexts wooden chair", "150000.00", "images/istockphoto-2210323669-612x612.jpg", "chair"),
    new Card("Nordic table", "185000.00", "images/raji-table-coffee-tables-39872517570782-Photoroom.webp", "table"),
    new Card("Vantix chair", "100000.00", "images/Image-3.png", "chair"),
    new Card("Vax and Tai Sofa", "100000.00", "images/istockphoto-671631434-612x612.jpg", "sofa"),
    new Card("Nordic table", "120000.00", "images/obi-39950930903262-Photoroom-2.webp", "table"),
    new Card("Arventis Sofa", "150000.00", "images/11288297.png", "sofa"),
    new Card("Visache Sofa", "250000.00", "images/istockphoto-869080516-612x612.jpg", "sofa"),
];
