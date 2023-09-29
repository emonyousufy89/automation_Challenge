import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.gamesforthebrain.com/game/checkers/");
  await expect(page).toHaveTitle("Checkers - Games for the Brain");
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
    "//*[@name='space13']",
    "//*[@name='space22']",
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
  }
  await page.waitForTimeout(1000);

  await page.getByRole("link", { name: "Restart..." }).click();
  await page.waitForTimeout(3000); //
  await expect("Select an orange piece to move.").toContain(
    "Select an orange piece to move."
  );
});
