import { Locator, Page, expect } from "@playwright/test";
import { PulpitPage } from "../pages/pulpit.page";
import { PaymentPage } from "../pages/payment.page";

export class SideMenu {
  constructor(private page: Page) {}

  pulpit = this.page.getByRole("link", { name: "mój pulpit" });
  payment = this.page.getByRole("link", { name: "płatności" });
  header = this.page.locator(".main-content h1");

  async openPulpit() {
    await this.pulpit.click();
    await expect(this.header).toHaveText("konta osobiste");
    return new PulpitPage(this.page);
  }

  async openPayment() {
    await this.payment.click();
    await expect(this.header).toHaveText("przelew dowolny");
    return new PaymentPage(this.page);
  }
}
