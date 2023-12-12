import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders home and contact links", () => {
  render(<App />);
  expect(screen.getByText("Personal Budget")).toBeInTheDocument();
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Contact")).toBeInTheDocument();
});
