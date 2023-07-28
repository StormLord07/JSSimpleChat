/*
 * Created by Ilya 'StormLord07' Repnev
 * Created on Sat Jul 29 2023
 */


import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
