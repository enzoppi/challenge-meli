import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Breadcrumbs from "./Breadcrumbs";

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

it("renders the breadcrumbs from the passed array", () => {
  act(() => {    render(<Breadcrumbs />, container);  });  expect(container.textContent).toBe("");
  act(() => {
    render(<Breadcrumbs breadcrumbs={['Cat1', 'Cat2']} />, container);
  });
  expect(container.textContent).toBe("Cat1>Cat2");
});
