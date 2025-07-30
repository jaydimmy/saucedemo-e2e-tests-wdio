import page from '../page.js';

class checkoutStepTwoPage extends page {
    get checkoutSummaryContainer() {
        return $('div[data-test="checkout-summary-container"]');
    }

    get finishButton() {
        return $('button[data-test="finish"]');
    }

    get subtotalPrice() {
        return $('div[data-test="subtotal-label"]');
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

    async clickFinishButton() {
            await this.finishButton.click();
        }
}

export default new checkoutStepTwoPage();