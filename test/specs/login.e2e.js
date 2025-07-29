import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from "../pageobjects/inventory.page.js";

const {
    VALID_USERNAME,
    VALID_PASSWORD,
    INVALID_USERNAME,
    INVALID_PASSWORD
} = process.env;

describe('Login functionality - User Authentication Tests', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.isLoaded();
    });

    it('TC-1: Valid Login', async () => {
        await LoginPage.login(VALID_USERNAME, VALID_PASSWORD)
        await InventoryPage.isLoaded();
    })

    it('TC-2: Login with invalid password', async () => {
        await LoginPage.login(VALID_USERNAME, INVALID_PASSWORD)
        await LoginPage.verifyLoginError();
    });


    it('TC-3: Login with invalid login', async () => {
        await LoginPage.login(INVALID_USERNAME, VALID_PASSWORD)
        await LoginPage.verifyLoginError();
    });
})
