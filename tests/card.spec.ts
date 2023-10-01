import { test, expect } from "@playwright/test";

let deckId: string;

test(" visit and check the site is up", async ({ page }) => {
  await page.goto("https://deckofcardsapi.com/");

  await expect(page).toHaveTitle("Deck of Cards API");

  const pageTitle = await page.title();
  console.log(`Page Title: ${pageTitle}`);
});

test("get new deck", async ({ request }) => {
  const deckResponse = await request.get(
    "https://deckofcardsapi.com/api/deck/new/"
  );
  let ID = await deckResponse.json();

  deckId = await ID.deck_id;

  console.log("the deckid is: ", deckId);
});

test("shuffle the deck", async ({ request }) => {
  const deckResponse = await request.get(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  let ID = await deckResponse.json();

  let deckId2 = await ID.deck_id;

  console.log("after shuffle the deckid is: ", deckId2);

  const drawResponse = await request.get(
    `https://deckofcardsapi.com/api/deck/${deckId2}/draw/?count=3`
  );
  let massa = await drawResponse.json();

  let msg = await massa.success;

  console.log("after shuffle the deckid is: ", msg);
});

// test("who has the back jack", async ({ page }) => {});
