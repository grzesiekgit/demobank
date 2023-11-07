import { test as setup } from "@playwright/test";
import { LoginPage } from "../pages/Login.page";
import { PulpitPage } from "../pages/pulpit.page";

const authFile = "playwright/.auth/user.json";

setup("login steps", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("testuser", "12345678");
  const pulpitPage = new PulpitPage(page);
  await pulpitPage.verifyTitle();

  await page.context().storageState({ path: authFile });
});

export default setup;
