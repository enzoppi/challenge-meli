import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import SearchResults from "./SearchResults";

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

describe("when the api responds with multiple items", () => {
  beforeEach(() => {
    const fakeResults = {
      author: {
        name: 'Enzo',
        lastName: 'Zoppi'
      },
      categories: [
        'Computación'
      ],
      items: [
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
        },
        {
          id: 'MLA855510916',
          title: 'Resma Papel Prensa Blanco X 10kg, 40x50 O 50x70 ',
          price: {
            currency: 'ARS',
            amount: 1400,
            decimals: 2
          },
          picture: 'http://http2.mlstatic.com/D_631601-MLA41815435825_052020-O.jpg',
          condition: 'new',
          free_shipping: false
        }
      ]
    };
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeResults) }));
  });

  it("should render a list item per item fetched", async () => {
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <MemoryRouter>
          <SearchResults />
        </MemoryRouter>,
        container);
    });

    expect(container.querySelectorAll("li.SearchResults-list-item").length).toBe(2);

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });
});

describe("when the api responds with no items", () => {
  beforeEach(() => {
    const fakeResults = {
      author: {
        name: 'Enzo',
        lastName: 'Zoppi'
      },
      categories: [
        'Computación'
      ],
      items: []
    };
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeResults) }));
  });

  it("should render a no results found message", async () => {
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <MemoryRouter>
          <SearchResults />
        </MemoryRouter>,
        container);
    });

    expect(container.querySelector("p.SearchResults-noresults")).toBeTruthy();
    expect(container.querySelector("p.SearchResults-noresults").textContent).toBe("No se encontraron resultados");

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });
});
