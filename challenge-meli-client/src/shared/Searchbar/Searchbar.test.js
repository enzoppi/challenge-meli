import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Searchbar from "./Searchbar";

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

it("calls the parent function on submit", () => {
  const onSubmit = jest.fn();
  act(() => { render(<Searchbar onSearchItems={onSubmit} />, container); });

  const btn = document.querySelector("button[type=submit]");

  act(() => {
    btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onSubmit).toHaveBeenCalledTimes(1);

  act(() => {
    for (let i = 0; i < 5; i++) {
      btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  expect(onSubmit).toHaveBeenCalledTimes(6);
});

it("renders with the correct placeholder", () => {
  act(() => { render(<Searchbar placeholderText="Test de placeholder" />, container); });

  const input = document.querySelector("input[type=text]");

  expect(input.placeholder).toBe("Test de placeholder");
});
