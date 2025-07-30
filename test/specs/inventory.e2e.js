import inventoryPage from "../pageobjects/inventory.page.js";
import loginPage from "../pageobjects/login.page.js";
import cartPage from "../pageobjects/cart.page.js";
import checkoutStepOnePage from "../pageobjects/checkout/checkoutStepOne.page.js";
import checkoutStepTwoPage from "../pageobjects/checkout/checkoutStepTwo.page.js";
import checkoutCompletePage from "../pageobjects/checkout/checkoutComplete.page.js";

const {
    VALID_USERNAME,
    VALID_PASSWORD
} = process.env;

describe('Inventory functionality', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.isLoaded();
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

        await inventoryPage.isLoaded();
    });

    it('TC-4: Logout', async () => {
        await inventoryPage.openSidebarMenuAndVerify();
        await inventoryPage.sidebarLogoutClick();

        await loginPage.isLoaded();
        await loginPage.verifyLoginInputsAreEmpty()
    })

    it('TC-5: Saving the card after logout ', async () => {

        const {
            productName
        } = await inventoryPage.addRandomProductToCartAndVerifyBadge()
        await inventoryPage.openSidebarMenuAndVerify();
        await inventoryPage.sidebarLogoutClick();

        await loginPage.isLoaded();
        await loginPage.verifyLoginInputsAreEmpty()
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

        await inventoryPage.isLoaded();
        await inventoryPage.shoppingCartButtonClick();

        await cartPage.isLoaded();
        await cartPage.verifyProductInCart(productName);
        await cartPage.removeButtonClick();
        await cartPage.verifyCartIsEmpty();
    });

    it('TC-6: Sorting', async () => {
        await inventoryPage.selectSortOption('az');
        await inventoryPage.verifySortingByNameAsc();

        await inventoryPage.selectSortOption('za');
        await inventoryPage.verifySortingByNameDesc();

        await inventoryPage.selectSortOption('lohi');
        await inventoryPage.verifySortingByPriceAsc();

        await inventoryPage.selectSortOption('hilo');
        await inventoryPage.verifySortingByPriceDesc();
    });

    it('TC-7: Footer Links', async () => {
        await inventoryPage.verifyFooterSocialLinks();
    });

    it('TC-8: Valid Checkout', async () => {
        const {
            productName,
            productPrice
        } = await inventoryPage.addRandomProductToCartAndVerifyBadge();
        await inventoryPage.shoppingCartButtonClick();

        await cartPage.isLoaded();
        await cartPage.verifyProductInCart(productName);
        await cartPage.checkoutButtonClick();

        await checkoutStepOnePage.isLoaded();
        await checkoutStepOnePage.fillInCheckoutInfo('Test', 'User', '12345');

        await checkoutStepTwoPage.isLoaded();
        await checkoutStepTwoPage.verifyProductPriceOnOverview(productPrice);
        await checkoutStepTwoPage.clickFinishButton();

        await checkoutCompletePage.isLoaded();
        await checkoutCompletePage.clickBackHomeButton();

        await inventoryPage.isLoaded();
        await expect(inventoryPage.shoppingCartBadge).not.toBeExisting();
    });

    it('TC-9: Checkout without products', async () => {
        await inventoryPage.shoppingCartButtonClick();
        await cartPage.isLoaded();
        await cartPage.verifyCartIsEmpty();
        await cartPage.checkoutButtonClick();
        await cartPage.verifyCartEmptyErrorMessage();
    });
})