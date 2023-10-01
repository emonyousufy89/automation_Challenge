import { test, expect } from "@playwright/test";
import { validateHeaderValue } from "http";

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

  const drawResponse1 = await request.get(
    `https://deckofcardsapi.com/api/deck/${deckId2}/draw/?count=6`
  );
  let player1Cards = await drawResponse1.json();
  // let cardValueOfPlayerOne: string = player1Cards.cards[0].value;
  let cardValueOfPlayerOne: string[] = player1Cards.cards.map(
    (card) => card.value
  );

  console.log("after draw the player 1 has :   ", player1Cards);
  console.log("after draw the player 1 has VALUE :  ", cardValueOfPlayerOne);

  const drawResponse2 = await request.get(
    `https://deckofcardsapi.com/api/deck/${deckId2}/draw/?count=3`
  );
  let player2Cards = await drawResponse2.json();

  let cardValueOfPlayerTwo: string[] = player2Cards.cards.map(
    (card) => card.value
  );

  console.log("after draw the player 2 has :  ", player2Cards);
  console.log("after draw the player 2 has VALUE : ", cardValueOfPlayerTwo);

  if (
    cardValueOfPlayerOne.includes("ACE") &&
    cardValueOfPlayerOne.some((value) =>
      ["10", "JACK", "QUEEN", "KING"].includes(value)
    )
  ) {
    console.log("Player one has a blackjack!");
  } else {
    console.log("Player one does not have a blackjack.");
  }

  if (
    cardValueOfPlayerTwo.includes("ACE") &&
    cardValueOfPlayerTwo.some((value) =>
      ["10", "JACK", "QUEEN", "KING"].includes(value)
    )
  ) {
    console.log("Player Two has a blackjack!");
  } else {
    console.log("Player Two does not have a blackjack.");
  }
});
