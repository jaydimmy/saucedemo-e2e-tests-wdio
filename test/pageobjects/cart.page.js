import page from './page.js';

const  CART_EMPTY_ERROR_MESSAGE = 'Cart is empty';

class cartPage extends page {

    get cartItems () {
        return $$('div[data-test="inventory-item"]');
    }

    get checkoutButton() {
        return $('button[data-test="checkout"]');
    }

    get removeButton() {
        return $('button[data-test^="remove-"]');
    }

    async isLoaded() {
        await this.verifyPageLogo();
        await this.verifyPageTitle('Your Cart');
    }

    async verifyProductInCart(productName) {
        const itemsInCart = await this.cartItems;
        await expect(itemsInCart.length).toBeGreaterThan(0);

        let foundProduct = false;
        for (const item of itemsInCart) {
            const itemName = await item.$('div[data-test="inventory-item-name"]').getText();
            if (itemName === productName) {
                foundProduct = true;
                break;
            }
        }
        await expect(foundProduct).toBe(true, `Product "${productName}" was not found in the cart.`);
    }

    async verifyCartIsEmpty() {
        await expect(this.cartItems)
            .toBeElementsArrayOfSize(0, 'Expected cart to be empty, but items were found.');
    }

    async verifyCartEmptyErrorMessage() {
        await this.verifyErrorMessageText(CART_EMPTY_ERROR_MESSAGE);
    }

    async checkoutButtonClick() {
        await this.checkoutButton.click();
    }

    async removeButtonClick() {
        await this.removeButton.click();
    }

    open() {
        return super.open('cart.html');
    }
}

export default new cartPage();
