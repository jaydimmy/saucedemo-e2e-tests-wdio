import InventoryPage from "../pageobjects/inventory.page.js";
import LoginPage from "../pageobjects/login.page.js";
import CartPage from "../pageobjects/cart.page.js";
import CheckoutStepOnePage from "../pageobjects/checkout/checkoutStepOne.page.js";
import CheckoutStepTwoPage from "../pageobjects/checkout/checkoutStepTwo.page.js";
import CheckoutCompletePage from "../pageobjects/checkout/checkoutComplete.page.js";

const {
    VALID_USERNAME,
    VALID_PASSWORD
} = process.env;

describe('Inventory functionality', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.isLoaded();
        await LoginPage.login(VALID_USERNAME, VALID_PASSWORD);

        await InventoryPage.isLoaded();
    });

    it('TC-4: Logout', async () => {
        await InventoryPage.openSidebarMenuAndVerify();
        await InventoryPage.sidebarLogoutLink.click();

        await LoginPage.isLoaded();
        await LoginPage.verifyLoginInputsAreEmpty()
    })

    it('TC-5: Saving the card after logout ', async () => {

        const {
            productName
        } = await InventoryPage.addRandomProductToCartAndVerifyBadge()
        await InventoryPage.openSidebarMenuAndVerify();
        await InventoryPage.sidebarLogoutLink.click();

        await LoginPage.isLoaded();
        await LoginPage.verifyLoginInputsAreEmpty()
        await LoginPage.login(VALID_USERNAME, VALID_PASSWORD);

        await InventoryPage.isLoaded();
        await InventoryPage.shoppingCartLink.click();

        await CartPage.isLoaded();
        await CartPage.verifyProductInCart(productName);
        await CartPage.removeButton.click();
    });

    it('TC-6: Sorting', async () => {
        await InventoryPage.selectSortOption('az');
        await InventoryPage.verifySortingByNameAsc();

        await InventoryPage.selectSortOption('za');
        await InventoryPage.verifySortingByNameDesc();

        await InventoryPage.selectSortOption('lohi');
        await InventoryPage.verifySortingByPriceAsc();

        await InventoryPage.selectSortOption('hilo');
        await InventoryPage.verifySortingByPriceDesc();
    });

    it('TC-7: Footer Links', async () => {
        await InventoryPage.verifyFooterSocialLinks();
    });

    it('TC-8: Valid Checkout', async () => {
        const {
            productName,
            productPrice
        } = await InventoryPage.addRandomProductToCartAndVerifyBadge();
        await InventoryPage.shoppingCartLink.click();

        await CartPage.isLoaded();
        await CartPage.verifyProductInCart(productName);
        await CartPage.checkoutButton.click();

        await CheckoutStepOnePage.isLoaded();
        await CheckoutStepOnePage.fillInCheckoutInfo('Test', 'User', '12345');

        await CheckoutStepTwoPage.isLoaded();
        await CheckoutStepTwoPage.verifyProductPriceOnOverview(productPrice);
        await CheckoutStepTwoPage.finishButton.click();

        await CheckoutCompletePage.isLoaded();
        await CheckoutCompletePage.backHomeButton.click();

        await InventoryPage.isLoaded();
        await expect(InventoryPage.shoppingCartBadge).not.toBeExisting();
    });

    // it('TC-9: Checkout without products', async () => {
    //     Click on the "Cart" button at the top right corner
    //     Cart page is displayed, products are not displayed
    //     Click on the "Checkout" button
    //     User are located on the "Cart" Page, error message "Cart is empty" are displayed
    //
    //     "Clicking the 'Checkout' button successfully redirects to the 'Checkout: Your Information' page  without errors.."
    // });

})