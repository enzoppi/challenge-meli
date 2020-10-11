import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import ItemDetails from "./ItemDetails";

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

describe("when the api responds with a result", () => {
  it("should render a a view with the result's data", async () => {
    const fakeResult = {
      author: {
        name: 'Enzo',
        lastName: 'Zoppi'
      },
      item: {
        id: 'MLA861820446',
        title: 'Celular Blackberry Q10 Libre C/funda Cuero Retiro En Persona',
        price: {
          currency: 'ARS',
          amount: 11500,
          decimals: 2
        },
        categories: [
          'Celulares y Teléfonos',
          'Celulares y Smartphones'
        ],
        picture: 'http://http2.mlstatic.com/D_622468-MLA42174869782_062020-O.jpg',
        condition: 'used',
        free_shipping: true,
        sold_quantity: 0,
        description: 'el telefono esta en muy buen estado \nla use 1 año\nesta liberado \n16 gigas.\n\nlo entrego con caja, auriculares y cargador \n\nfunciona perfecto \n\nLo entrego con funda de cuero como se ve en ultimas fotos \n\nUNICAMENTE ENTREGA EN PERSONA , para que puedas probarlo antes de llevarlo \n\nSE RETIRA UNICAMENTE POR CABALLITO EN PERSONA.'
      }
    }
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeResult) }));

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <MemoryRouter>
          <ItemDetails />
        </MemoryRouter>,
        container);
    });

    expect(container.querySelector("div.ItemDetails-summary-image img").src).toBe(fakeResult.item.picture);
    expect(container.querySelector("div.ItemDetails-summary-image img").alt).toBe(fakeResult.item.title);
    expect(container.querySelector("p.ItemDetails-summary-description--text").textContent).toBe(fakeResult.item.description);
    expect(container.querySelector(".ItemDetails-details-misc").textContent).toBe(`Usado - ${fakeResult.item.sold_quantity} vendidos`);
    expect(container.querySelector(".ItemDetails-details-title").textContent).toBe(fakeResult.item.title);
    expect(container.querySelector(".ItemDetails-details-price").textContent).toBe(`$  11.50000`);

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });
});
