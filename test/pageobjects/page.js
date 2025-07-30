export default class page {

    get pageLogo() {
        return $('div[class="app_logo"]');
    }

    get pageTitle() {
        return $('span[data-test="title"]');
    }

    get errorMessageElement() {
        return $('h3[data-test="error"]');
    }

    verifyPageLogo() {
        return expect(this.pageLogo).toHaveText('Swag Labs');
    }

    verifyPageTitle(title) {
        return expect(this.pageTitle).toHaveText(title);
    }

    async verifyErrorMessageText(expectedMessage) {
        await expect(this.errorMessageElement).toBeDisplayed();
        await expect(this.errorMessageElement).toHaveText(expectedMessage);
    }

    open (path) {
        return browser.url(`https://saucedemo.com/${path}`)
    }
}
