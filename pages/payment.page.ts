import { Page, expect } from "@playwright/test";
import { Date, DateHelper } from "../helpers/date.helper";

export class PaymentPage {
  constructor(private page: Page) {}

  private receiver = this.page.getByTestId("transfer_receiver");
  private accountNumber = this.page.getByTestId("form_account_to");
  private showAdditionalDAta = this.page.locator(".i-show").first();
  private street = this.page.getByPlaceholder(
    "ulica i numer domu / mieszkania"
  );
  private city = this.page.getByPlaceholder("kod pocztowy, miejscowość");
  private addressThirdLine = this.page.getByPlaceholder(
    "adres - trzecia linia"
  );
  private amount = this.page.getByTestId("form_amount");
  private title = this.page.getByTestId("form_title");
  private date = this.page.locator(".datepicker");
  private nextMonth = this.page.getByTitle("Next");
  private datePickerMonth = this.page
    .locator(".ui-datepicker-title span")
    .first();
  private datePicketrYear = this.page
    .locator(".ui-datepicker-title span")
    .last();
  private normalTransferFlag = this.page.getByLabel("zwykły");
  private expressTransferFlag = this.page.getByLabel("ekspresowy");
  private emailConfirmationFlag = this.page.getByLabel("potwierdzenie e-mail");
  private emailConfirmationInput = this.page.locator("#form_email");

  executeBtn = this.page.getByRole("button", { name: "wykonaj przelew" });

  messageContent = this.page.locator(".ui-dialog-content");
  closeBtn = this.page.getByTestId("close-button");

  async fillReceiver(receiver: string) {
    await this.receiver.fill(receiver);
    return this;
  }

  async fillAccountNumber(accountNumber: string) {
    await this.accountNumber.fill(accountNumber);
    return this;
  }

  async fillAdditionalAddress(
    street: string,
    city: string,
    addressThirdLine: string
  ) {
    await this.showAdditionalDAta.click();
    await this.street.fill(street);
    await this.city.fill(city);
    await this.addressThirdLine.fill(addressThirdLine);
  }

  async fillAmount(amount: number) {
    await this.amount.fill(amount.toString());
  }

  async fillTitle(title: string) {
    await this.title.fill(title);
  }

  async fillDate(date: string): Promise<void> {
    await this.date.click();

    while (
      !(
        DateHelper.getMonth(date) == (await this.datePickerMonth.innerText()) &&
        DateHelper.getYear(date).toString() ==
          (await this.datePicketrYear.innerText())
      )
    ) {
      await this.nextMonth.click();
    }
    await this.page
      .getByRole("link", { name: `${DateHelper.getDay(date)}`, exact: true })
      .click();
  }

  async checkExpressTransfer() {
    await this.expressTransferFlag.check();
  }

  async makeTransfer() {
    await this.executeBtn.click();
  }

  async verifyMessage(receiver: string, amount: number) {
    await expect.soft(this.messageContent).toContainText(receiver);
    await expect.soft(this.messageContent).toContainText(amount.toString());
  }

  async closeMessage() {
    await this.closeBtn.click();
  }

  async addConfirmationEmail(email: string) {
    await this.emailConfirmationFlag.check();
    await this.emailConfirmationInput.fill(email);
  }
}
