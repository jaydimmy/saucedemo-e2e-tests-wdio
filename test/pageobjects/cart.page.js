import {$, expect} from '@wdio/globals'
import Page from './page.js';

class CartPage extends Page {

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

    open() {
        return super.open('cart.html');
    }
}

export default new CartPage();
