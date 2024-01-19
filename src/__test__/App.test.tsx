import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { Link, MemoryRouter } from "react-router-dom";
import App from "../App";

describe("App component", () => {
  test("should render", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(true).toBeTruthy();
  });

  test("should have a title", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const title = screen.getAllByText("Blocky")[1];
    expect(title).toHaveTextContent("Blocky");
  });

  test("should go to login page when I click on login button", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const loginLink = screen.getByText("Log in");

    await userEvent.click(loginLink);
    const emailLabel = screen.getByText("Username:");
    const confirmPasswordLabel = screen.queryByText("Confirm password:");
    expect(emailLabel).toBeInTheDocument();
    expect(confirmPasswordLabel).toBeFalsy();

    screen.debug();
  });

  test("should go to signup page when I click on signup button", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const signupButton = screen.getByText("Sign up");

    await userEvent.click(signupButton);
    const emailLabel = screen.getByText("Username:");
    const confirmPasswordLabel = screen.queryByText("Confirm password:");
    expect(emailLabel).toBeInTheDocument();
    expect(confirmPasswordLabel).toBeInTheDocument();

    screen.debug();
  });

  test("should render page not found when there is no page", async () => {
    render(
      <MemoryRouter>
        <App />
        <Link to="this-page-doesn't-exist">Error page</Link>
      </MemoryRouter>
    );

    const errorLink = screen.getByText("Error page");
    await userEvent.click(errorLink);
    const pageNotFoundTitle = screen.getByText("Error 404: Page not found");
    expect(pageNotFoundTitle).toBeInTheDocument();
    screen.debug();
  });
});
