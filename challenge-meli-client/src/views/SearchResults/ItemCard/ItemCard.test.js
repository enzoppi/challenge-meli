import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import ItemCard from "./ItemCard";

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render an item card with the correct props", () => {
  const fakeItem =
  {
    id: 'MLA716871550',
    title: 'Disco Solido Externo 256gb Adata Sd700 Ssd 3d Nand Caballito',
    price: {
      currency: 'ARS',
      amount: 8745,
      decimals: 2
    },
    picture: 'http://http2.mlstatic.com/D_611922-MLA31591292315_072019-O.jpg',
    condition: 'new',
    free_shipping: true
  };

  act(() => {
    render(
      <MemoryRouter>
        <ItemCard item={fakeItem} />
      </MemoryRouter>,
      container);
  });

  expect(container.querySelector("div.ItemCard-image img").src).toBe(fakeItem.picture);
  expect(container.querySelector("div.ItemCard-image img").alt).toBe(fakeItem.title);
  expect(container.querySelector("div.ItemCard-content-price").textContent).toBe(`$  8.745`);
  expect(container.querySelector("h2.ItemCard-content-title").textContent).toBe(fakeItem.title);
});
