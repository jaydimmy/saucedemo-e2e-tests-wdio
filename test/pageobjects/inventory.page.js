import page from './page.js';

class inventoryPage extends page {

    get sidebarMenuButton() {
        return $('button[id="react-burger-menu-btn"]');
    }

    get shoppingCartLink() {
        return $('a[data-test="shopping-cart-link"]');
    }

    get shoppingCartBadge() {
        return $('span[data-test="shopping-cart-badge"]');
    }

    get sidebarMenu() {
        return $('nav.bm-item-list');
    }

    get sidebarMenuLinks() {
        return this.sidebarMenu.$$('a.bm-item');
    }

    get sidebarLogoutLink() {
        return $('a[data-test="logout-sidebar-link"]');
    }

    get inventoryItems() {
        return $$('div[data-test="inventory-item"]');
    }

    get productSortContainer() {
        return $('select[data-test="product-sort-container"]');
    }

    get inventoryItemNames() {
        return $$('div[data-test="inventory-item-name"]');
    }

    get inventoryItemPrices() {
        return $$('div[data-test="inventory-item-price"]');
    }

    get twitterLink() {
        return $('a[data-test="social-twitter"]');
    }

    get facebookLink() {
        return $('a[data-test="social-facebook"]');
    }

    get linkedinLink() {
        return $('a[data-test="social-linkedin"]');
    }

    async getItemByIndex(index) {
        return (await this.inventoryItems)[index];
    }

    async getAddToCartButtonFromItem(itemElement) {
        return itemElement.$('button.btn_inventory');
    }

    async getProductNameFromItem(itemElement) {
        const nameElement = await itemElement.$('div[data-test="inventory-item-name"]');
        return nameElement.getText();
    }

    async getProductPriceFromItem(itemElement) {
        const priceElement = await itemElement.$('div[data-test="inventory-item-price"]');
        const priceText = await priceElement.getText();
        return parseFloat(priceText.replace('$', ''));
    }

    async getRandomItemIndex() {
        const allInventoryItems = await this.inventoryItems;
        const numberOfItems = allInventoryItems.length;
        if (numberOfItems === 0) {
            throw new Error('No inventory items found to select a random index.');
        }
        return Math.floor(Math.random() * numberOfItems);
    }

    async isLoaded() {
        await this.verifyPageLogo();
        await this.verifyPageTitle('Products');
        await expect(this.shoppingCartLink).toBeDisplayed();
        await expect((await this.inventoryItems).length).toBeGreaterThan(1);
    }

    async addRandomProductToCartAndVerifyBadge() {
        const randomIndex = await this.getRandomItemIndex();
        const selectedItem = await this.getItemByIndex(randomIndex);
        const productName = await this.getProductNameFromItem(selectedItem);
        const productPrice = await this.getProductPriceFromItem(selectedItem);
        const addToCartButton = await this.getAddToCartButtonFromItem(selectedItem);

        await expect(addToCartButton).toHaveText('Add to cart');
        await addToCartButton.click();
        await expect(addToCartButton).toHaveText('Remove');
        await expect(this.shoppingCartBadge).toHaveText(String(1));

        return {
            productName,
            productPrice
        };
    }

    async openSidebarMenuAndVerify() {
        await this.sidebarMenuButton.click();
        await this.sidebarMenu.waitForDisplayed();
        await expect(this.sidebarMenu).toBeDisplayed();
        await expect(this.sidebarMenuLinks).toBeElementsArrayOfSize(4);
    }

    async selectSortOption(optionValue) {
        await this.productSortContainer.selectByAttribute('value', optionValue);
        await expect(this.productSortContainer).toHaveValue(optionValue);
    }

    async getProductNames() {
        const names = [];
        for (const item of await this.inventoryItemNames) {
            names.push(await item.getText());
        }
        return names;
    }

    async getProductPrices() {
        const prices = [];
        for (const item of await this.inventoryItemPrices) {
            const priceText = await item.getText();
            prices.push(parseFloat(priceText.replace('$', '')));
        }
        return prices;
    }

    async verifySortingByNameAsc() {
        const names = await this.getProductNames();
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    }

    async verifySortingByNameDesc() {
        const names = await this.getProductNames();
        const sortedNames = [...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    }

    async verifySortingByPriceAsc() {
        const prices = await this.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    }

    async verifySortingByPriceDesc() {
        const prices = await this.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    }

    async verifyFooterSocialLinks() {
        const socialLinks = [{
            element: this.twitterLink,
            expectedUrl: 'https://x.com/saucelabs',
        }, {
            element: this.facebookLink,
            expectedUrl: 'https://www.facebook.com/saucelabs',
        }, {
            element: this.linkedinLink,
            expectedUrl: 'https://www.linkedin.com/company/sauce-labs/',
        }, ];

        for (const link of socialLinks) {
            const originalWindowHandle = await browser.getWindowHandle();
            await link.element.click();

            const windowHandles = await browser.getWindowHandles();
            await expect(windowHandles.length).toBeGreaterThan(1);

            const newWindowHandle = windowHandles.find(handle => handle !== originalWindowHandle);
            await browser.switchToWindow(newWindowHandle);

            await expect(browser).toHaveUrl(link.expectedUrl);
            await browser.closeWindow();
            await browser.switchToWindow(originalWindowHandle);
        }
    }

    async sidebarLogoutClick() {
        await this.sidebarLogoutLink.click();
    }

    async shoppingCartButtonClick() {
        await this.shoppingCartLink.click();
    }

    open() {
        return super.open('inventory.html');
    }
}

export default new inventoryPage();
