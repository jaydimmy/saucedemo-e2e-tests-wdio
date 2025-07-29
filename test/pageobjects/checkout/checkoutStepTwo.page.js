import {$, $$, expect} from '@wdio/globals'
import Page from '../page.js';

class CheckoutStepTwoPage extends Page {
    get checkoutSummaryContainer() {
        return $('div[data-test="checkout-summary-container"]');
    }

    get finishButton() {
        return $('button[data-test="finish"]');
    }

    get subtotalPrice() {
        return $('div[data-test="subtotal-label"]');
    }

    get taxPrice() {
        return $('div[data-test="tax-label"]');
    }

    get totalPrice() {
        return $('div[data-test="total-label"]');
    }

    async isLoaded() {
        await this.verifyPageLogo();
        await this.verifyPageTitle('Checkout: Overview');
        await expect(this.checkoutSummaryContainer).toBeDisplayed();
        await expect(this.finishButton).toBeDisplayed();
    }

    async verifyProductPriceOnOverview(expectedPrice) {
        const items = await $$('div[data-test="inventory-item-price"]');
        await expect(items.length).toBeGreaterThan(0);

        const subtotalText = await this.subtotalPrice.getText();
        const actualSubtotal = parseFloat(subtotalText.replace('Item total: $', ''));
        await expect(actualSubtotal).toEqual(expectedPrice);
  }
}

export default new CheckoutStepTwoPage();