import test, { expect } from "@playwright/test";
import { PulpitPage } from "../pages/pulpit.page";

test("is working", async ({ page }) => {
  await page.goto("/pulpit.html");
  const pulpitPage = new PulpitPage(page);
  expect(await pulpitPage.getUserName()).toEqual("Jan Demobankowy");
});
