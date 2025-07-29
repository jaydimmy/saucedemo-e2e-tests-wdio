import {$, expect} from '@wdio/globals'
import Page from '../page.js';

class CheckoutCompletePage extends Page {
    get completeHeader() {
        return $('h2[data-test="complete-header"]');
    }

    get completeText() {
        return $('div[data-test="complete-text"]');
    }

    get backHomeButton() {
        return $('button[data-test="back-to-products"]');
    }

    async isLoaded() {
        await this.verifyPageLogo();
        await this.verifyPageTitle('Checkout: Complete!');
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
        await expect(this.completeText).toHaveText(
            'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await expect(this.backHomeButton).toBeDisplayed();
    }
}

export default new CheckoutCompletePage();