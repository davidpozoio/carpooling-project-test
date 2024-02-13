import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Signup from "../../../pages/auth/Signup";
import { GlobalProviders } from "../../App.test";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import ROUTES from "../../../consts/routes";
import ERROR_CODES from "../../../consts/errorCode";

describe("Signup component", () => {
  const mocks = vi.hoisted(() => ({
    signup: vi.fn(() =>
      Promise.resolve({
        data: {
          user: {
            username: "myusername",
          },
          message: "user created",
        },
      })
    ),
  }));

  vi.mock("/src/services/authService", () => ({
    signup: mocks.signup,
  }));

  test("should render", () => {
    render(<Signup />, { wrapper: GlobalProviders });
    expect(true).toBeTruthy();
  });

  test("should signup", async () => {
    render(<Signup />, { wrapper: GlobalProviders });

    const username = screen.getByLabelText("Username:");
    const password = screen.getByLabelText("Password:");
    const confirmPassword = screen.getByLabelText("Confirm password:");
    const submit = screen.getByText("Sign up!");

    await userEvent.click(username);
    await userEvent.keyboard("myusername");

    await userEvent.click(password);
    await userEvent.keyboard("12345678");

    await userEvent.click(confirmPassword);
    await userEvent.keyboard("12345678");

    await userEvent.click(submit);
    expect(mocks.signup).toBeCalled();
  });

  test("should redirect when I signup", async () => {
    render(
      <>
        <Signup />
        <Routes>
          <Route path="" element={<span>main page</span>} />
          <Route path={ROUTES.NOTES.ME} element={<span>NOTES PAGE</span>} />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );

    const username = screen.getByLabelText("Username:");
    const password = screen.getByLabelText("Password:");
    const confirmPassword = screen.getByLabelText("Confirm password:");
    const submit = screen.getByText("Sign up!");

    await userEvent.click(username);
    await userEvent.keyboard("myusername");

    await userEvent.click(password);
    await userEvent.keyboard("12345678");

    await userEvent.click(confirmPassword);
    await userEvent.keyboard("12345678");

    await userEvent.click(submit);
    expect(mocks.signup).toBeCalled();
    screen.getByText("NOTES PAGE");
  });

  test("show message 'the username has already been taken'", async () => {
    mocks.signup.mockImplementation(() =>
      Promise.reject({
        response: {
          data: {
            code: ERROR_CODES.E2002.CODE,
            message: ERROR_CODES.E2002.MESSAGE,
          },
        },
      })
    );

    render(<Signup />, { wrapper: GlobalProviders });

    const username = screen.getByLabelText("Username:");
    const password = screen.getByLabelText("Password:");
    const confirmPassword = screen.getByLabelText("Confirm password:");
    const submit = screen.getByText("Sign up!");

    await userEvent.click(username);
    await userEvent.keyboard("myusername");

    await userEvent.click(password);
    await userEvent.keyboard("12345678");

    await userEvent.click(confirmPassword);
    await userEvent.keyboard("12345678");

    await userEvent.click(submit);
    expect(mocks.signup).toBeCalled();

    screen.getByText("the username has already been taken");

    await userEvent.click(username);
    await userEvent.keyboard("123");

    expect(
      screen.queryByText("the username has already been taken")
    ).not.toBeInTheDocument();
  });
});
