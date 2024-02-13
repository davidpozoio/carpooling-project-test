import { render, screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import Login from "../../../pages/auth/Login";
import { GlobalProviders } from "../../App.test";
import userEvent from "@testing-library/user-event";
import ROUTES from "../../../consts/routes";

describe("Login component", () => {
  const mocks = vi.hoisted(() => ({
    login: vi.fn(),
  }));

  vi.mock("/src/services/authService", () => ({
    login: mocks.login,
  }));

  test("should render", () => {
    render(<Login />, { wrapper: GlobalProviders });
    expect(true).toBeTruthy();
  });

  test("should login", async () => {
    render(<Login />, { wrapper: GlobalProviders });
    const username = screen.getByLabelText("Username:");
    const password = screen.getByLabelText("Password:");
    const submit = screen.getByText("Log in!");

    await userEvent.click(username);
    await userEvent.keyboard("juan");
    await userEvent.click(password);
    await userEvent.keyboard("123");
    await userEvent.click(submit);

    expect(mocks.login).toHaveBeenCalled();
  });

  test("should redirect when login", async () => {
    render(
      <>
        <Login />
        <Routes>
          <Route path="" element={<span>main page</span>} />
          <Route path={ROUTES.NOTES.ME} element={<span>NOTES PAGE</span>} />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );
    const username = screen.getByLabelText("Username:");
    const password = screen.getByLabelText("Password:");
    const submit = screen.getByText("Log in!");

    await userEvent.click(username);
    await userEvent.keyboard("juan");
    await userEvent.click(password);
    await userEvent.keyboard("123");
    await userEvent.click(submit);

    expect(mocks.login).toHaveBeenCalled();
    screen.debug();
    screen.getByText("NOTES PAGE");
  });

  test("should show message username is incorrect", async () => {
    mocks.login.mockImplementation(() =>
      Promise.reject({
        response: {
          data: {
            message: "the username is incorrect",
            code: "E2000",
          },
        },
      })
    );

    render(<Login />, { wrapper: GlobalProviders });
    const username = screen.getByLabelText("Username:");
    const password = screen.getByLabelText("Password:");
    const submit = screen.getByText("Log in!");

    await userEvent.click(username);
    await userEvent.keyboard("123");
    await userEvent.click(password);
    await userEvent.keyboard("123");
    await userEvent.click(submit);

    expect(mocks.login).toHaveBeenCalled();
    screen.getByText("username is incorrect");

    await userEvent.click(username);
    await userEvent.keyboard("123");

    expect(screen.queryByText("username is incorrect")).not.toBeInTheDocument();
  });

  test("should show message password is incorrect", async () => {
    mocks.login.mockImplementation(() =>
      Promise.reject({
        response: {
          data: {
            message: "the password is incorrect",
            code: "E2001",
          },
        },
      })
    );

    render(<Login />, { wrapper: GlobalProviders });
    const username = screen.getByLabelText("Username:");
    const password = screen.getByLabelText("Password:");
    const submit = screen.getByText("Log in!");

    await userEvent.click(username);
    await userEvent.keyboard("123");
    await userEvent.click(password);
    await userEvent.keyboard("123");
    await userEvent.click(submit);

    expect(mocks.login).toHaveBeenCalled();
    screen.getByText("password is incorrect");

    await userEvent.click(password);
    await userEvent.keyboard("123");

    expect(screen.queryByText("password is incorrect")).not.toBeInTheDocument();
  });
});
