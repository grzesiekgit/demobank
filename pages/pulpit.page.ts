import { Page, expect } from "@playwright/test";
import { SideMenu } from "../components/sideMenu.component";

export class PulpitPage {
  constructor(private page: Page) {}

  private userName = this.page.getByTestId("user-name");

  sideMenu = new SideMenu(this.page);

  async verifyTitle() {
    expect(await this.page.title()).toEqual(
      "Demobank - Bankowość Internetowa - Pulpit"
    );
  }

  async getUserName(): Promise<string> {
    return await this.userName.innerText();
  }
}
