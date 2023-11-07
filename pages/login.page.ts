import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  private userName = this.page.getByTestId("login-input");
  private password = this.page.getByTestId("password-input");
  private loginBtn = this.page.getByTestId("login-button");

  async login(userName: string, password: string) {
    await this.page.goto("/");
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}
