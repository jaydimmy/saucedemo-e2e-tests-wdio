import {$, browser} from '@wdio/globals'

export default class Page {

    get pageLogo() {
        return $('div[class="app_logo"]');
    }

    get pageTitle() {
        return $('span[data-test="title"]');
    }

    verifyPageLogo() {
        return expect(this.pageLogo).toHaveText('Swag Labs');
    }

    verifyPageTitle(title) {
        return expect(this.pageTitle).toHaveText(title);
    }

    open (path) {
        return browser.url(`https://saucedemo.com/${path}`)
    }

}
