import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { Link, MemoryRouter } from "react-router-dom";
import App from "../App";
import { QueryClientProvider } from "react-query";
import { client } from "../environment/config";
import { ReactNode } from "react";

export const GlobalProviders = ({ children }: { children: ReactNode }) => {
  return (
    <MemoryRouter>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
};

describe("App component", () => {
  test("should render", () => {
    render(<App />, { wrapper: GlobalProviders });

    expect(true).toBeTruthy();
  });

  test("should have a title", () => {
    render(<App />, { wrapper: GlobalProviders });
    const title = screen.getAllByText("Blocky")[1];
    expect(title).toHaveTextContent("Blocky");
  });

  test("should go to login page when I click on login button", async () => {
    render(<App />, { wrapper: GlobalProviders });

    const loginLink = screen.getByText("Log in");

    await userEvent.click(loginLink);
    const emailLabel = screen.getByText("Username:");
    const confirmPasswordLabel = screen.queryByText("Confirm password:");
    expect(emailLabel).toBeInTheDocument();
    expect(confirmPasswordLabel).toBeFalsy();
  });

  test("should go to signup page when I click on signup button", async () => {
    render(<App />, { wrapper: GlobalProviders });
    screen.debug();
    const signupButton = screen.getByText("Sign up");
    await userEvent.click(signupButton);

    const emailLabel = await screen.findByText("Username:");
    screen.debug();
    const confirmPasswordLabel = screen.queryByText("Confirm password:");
    expect(emailLabel).toBeInTheDocument();
    expect(confirmPasswordLabel).toBeInTheDocument();
  });

  test("should render page not found when there is no page", async () => {
    render(
      <>
        <App />
        <Link to="this-page-doesn't-exist">Error page</Link>
      </>,
      { wrapper: GlobalProviders }
    );

    const errorLink = screen.getByText("Error page");

    await userEvent.click(errorLink);

    const pageNotFoundTitle = screen.getByText("Error 404: Page not found");
    expect(pageNotFoundTitle).toBeInTheDocument();
  });
});
