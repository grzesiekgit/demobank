import test, { expect } from "@playwright/test";
import { PulpitPage } from "../pages/pulpit.page";

test("payment test", async ({ page }) => {
  //Arrange
  const receiver = "Fake receiver";
  const accountNumber = "98765432109876543210123456";
  const street = "Testowa 12";
  const city = "12-345 Testowo";
  const thirdLine = "ble ble ble";
  const amount = 123;
  const title = "fake transfer";
  const date = '2026-03-01';
  const email = 'fakereceiver@gmail.com';

  //Act
  await page.goto("/pulpit.html");
  const pulpitPage = new PulpitPage(page);
  const payment = await pulpitPage.sideMenu.openPayment();
  await payment.fillReceiver(receiver)
  await payment.fillAccountNumber(accountNumber)
  await payment.fillAdditionalAddress(street, city, thirdLine);
  await payment.fillAmount(amount);
  await payment.fillTitle(title);
  await payment.fillDate(date);
  await payment.addConfirmationEmail(email);
  await payment.makeTransfer();

  //Assert
  await payment.verifyMessage(receiver, amount);
});
