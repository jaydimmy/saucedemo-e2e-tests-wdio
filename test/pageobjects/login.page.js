import page from './page.js';

const LOGIN_ERROR_MESSAGE = 'Epic sadface: Username and password do not match any user in this service';
const RED_HEX_COLOR = '#e2231a';

class loginPage extends page {

    get pageLogo() {
        return $('div[class="login_logo"]');
    }

    get usernameInput() {
        return $('input[data-test="username"]');
    }

    get usernameErrorIcon() {
        return $('input[data-test="username"] + svg.error_icon');
    }

    get passwordInput() {
        return $('input[data-test="password"][type="password"]');
    }

    get passwordErrorIcon() {
        return $('input[data-test="password"] + svg.error_icon');
    }

    get loginButton() {
        return $('input[data-test="login-button"]');
    }

    async isLoaded() {
        await this.verifyPageLogo();
        await expect(this.usernameInput).toBeDisplayed();
        await expect(this.passwordInput).toBeDisplayed();
        await expect(this.loginButton).toBeDisplayed();
    }

    async login(username, password) {
        await this.usernameInput.setValue(username);
        await expect(this.usernameInput).toHaveValue(username);
        await this.passwordInput.setValue(password);
        await expect(this.passwordInput).toHaveValue(password);
        await this.loginButton.click();
    }

    async verifyLoginError() {
        await expect(this.usernameErrorIcon).toBeDisplayed();
        await expect(this.passwordErrorIcon).toBeDisplayed();

        const usernameBorderBottomColor = await this.usernameInput.getCSSProperty('border-bottom-color');
        const passwordBorderBottomColor = await this.passwordInput.getCSSProperty('border-bottom-color');

        await expect(usernameBorderBottomColor.parsed.hex).toEqual(RED_HEX_COLOR);
        await expect(passwordBorderBottomColor.parsed.hex).toEqual(RED_HEX_COLOR);
        await this.verifyErrorMessageText(LOGIN_ERROR_MESSAGE);
    }

    async verifyLoginInputsAreEmpty()  {
        await expect(this.usernameInput).toHaveValue('');
        await expect(this.passwordInput).toHaveValue('');
    }

    open() {
        return super.open('');
    }
}

export default new loginPage();
