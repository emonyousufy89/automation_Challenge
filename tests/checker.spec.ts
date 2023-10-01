import { chromium, test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.gamesforthebrain.com/game/checkers/");
  const pageTitle = await expect(page).toHaveTitle(
    "Checkers - Games for the Brain"
  );
  console.log("Page Title:", await page.title());

  await page.screenshot({
    path:
      "./test-results/" + Math.floor(Math.random() * 100000) + "screenshot.png",
  });
  await page.waitForTimeout(1000);
  const buttonSelectors = [
    "//*[@name='space62']",
    "//*[@name='space51']",
    "//*[@name='space22']",
    "//*[@name='space02']",
    "//*[@name='space11']",
  ];
  const destinationSelectors = [
    "//*[@name='space73']",
    "//*[@name='space62']",
    "//*[@name='space33']",
    "//*[@name='space24']",
    "//*[@name='space33']",
  ];

  for (let i = 0; i < buttonSelectors.length; i++) {
    const button = await page.$(buttonSelectors[i]);
    const destination = await page.$(destinationSelectors[i]);

    if (button && destination) {
      await button.click();
      await page.waitForTimeout(1000);
      await destination.click();
      await page.waitForTimeout(1000);
    }
    await page.waitForTimeout(1000);
    await page.screenshot({
      path:
        "./test-results/" +
        Math.floor(Math.random() * 100000) +
        "screenshot.png",
    });
  }
  /*
  const textValueAfterMove = await page.locator("#message");
  await expect(textValueAfterMove).toHaveText("Make a move.");
  await page.waitForTimeout(1000);
  console.log("Element Text:", await textValueAfterMove.innerText());
  */
  const textValueAfterMove = await page.locator("#message").textContent();
  await expect(textValueAfterMove).toBe("Make a move.");
  console.log("Element Text after moves: ", textValueAfterMove);

  await page.locator("//*[contains(text(),'Restart...')]").click();
  const textValueAfterRestart = await page.locator("#message");
  await page.waitForSelector("#message");
  await expect(textValueAfterRestart).toHaveText(
    "Select an orange piece to move."
  );
  console.log(
    "Element Text after restart:",
    await textValueAfterRestart.innerText()
  );
  await page.screenshot({
    path:
      "./test-results/" + Math.floor(Math.random() * 100000) + "screenshot.png",
  });
});
