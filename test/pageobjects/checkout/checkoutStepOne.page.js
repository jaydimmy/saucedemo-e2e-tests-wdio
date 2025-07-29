import {$, expect} from '@wdio/globals'
import Page from '../page.js';

class CheckoutStepOnePage extends Page {
    get firstNameInput() {
        return $('input[data-test="firstName"]');
    }

    get lastNameInput() {
        return $('input[data-test="lastName"]');
    }

    get postalCodeInput() {
        return $('input[data-test="postalCode"]');
    }

    get continueButton() {
        return $('input[data-test="continue"]');
    }

    get cancelButton() {
        return $('button[data-test="cancel"]');
    }

    async isLoaded() {
        await this.verifyPageLogo();
        await this.verifyPageTitle('Checkout: Your Information');
        await expect(this.firstNameInput).toBeDisplayed();
        await expect(this.lastNameInput).toBeDisplayed();
        await expect(this.postalCodeInput).toBeDisplayed();
        await expect(this.continueButton).toBeDisplayed();
    }

    async fillInCheckoutInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.setValue(firstName);
        await expect(this.firstNameInput).toHaveValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await expect(this.lastNameInput).toHaveValue(lastName);
        await this.postalCodeInput.setValue(postalCode);
        await expect(this.postalCodeInput).toHaveValue(postalCode);
        await this.continueButton.click();
    }
}

export default new CheckoutStepOnePage();