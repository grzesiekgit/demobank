import { Page, expect } from "@playwright/test";

export class PulpitPage {
  constructor(private page: Page) {}

  private userName = this.page.getByTestId("user-name");

  async verifyTitle() {
    expect(await this.page.title()).toEqual(
      "Demobank - Bankowość Internetowa - Pulpit"
    );
  }

  async getUserName(): Promise<string> {
    return await this.userName.innerText();
  }
}
