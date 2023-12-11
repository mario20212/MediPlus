class product {

    constructor(name, composition, uses, side_effects, imageurl, manufacturer, excellent_review, average_review, poor_review, quantity = 0) {

        this.name = name;
        this.composition = composition;
        this.uses = uses;
        this.side_effects = side_effects;
        this.imageurl = imageurl;
        this.manufacturer = manufacturer;
        this.excellent_review = excellent_review;
        this.average_review = average_review;
        this.poor_review = poor_review;
        this.quantity = quantity;
    }

    addquantity() {
        this.quantity++;
    }
    removequantity() {
        if (this.quantity > 0)
            this.quantity--;
    }

}