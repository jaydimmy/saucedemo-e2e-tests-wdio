import loginPage from '../pageobjects/login.page.js'
import inventoryPage from "../pageobjects/inventory.page.js";

const {
    VALID_USERNAME,
    VALID_PASSWORD,
    INVALID_USERNAME,
    INVALID_PASSWORD
} = process.env;

describe('Login functionality - User Authentication Tests', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.isLoaded();
    });

    it('TC-1: Valid Login', async () => {
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD)
        await inventoryPage.isLoaded();
    })

    it('TC-2: Login with invalid password', async () => {
        await loginPage.login(VALID_USERNAME, INVALID_PASSWORD)
        await loginPage.verifyLoginError();
    });


    it('TC-3: Login with invalid login', async () => {
        await loginPage.login(INVALID_USERNAME, VALID_PASSWORD)
        await loginPage.verifyLoginError();
    });
})
